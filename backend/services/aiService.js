import Product from "../models/Product.js";
import User from "../models/User.js";

export const getPersonalizedRecommendations = async (userId) => {
  try {
    const user = await User.findById(userId).populate("behavior.viewedProducts.productId");

    if (!user || !user.behavior.viewedProducts.length) {
      return await Product.find({ isFeatured: true, isActive: true }).limit(10);
    }

    const viewedProducts = user.behavior.viewedProducts
      .map((v) => v.productId)
      .filter(Boolean);

    const categories = [...new Set(viewedProducts.map((p) => p.category))];
    const brands = [...new Set(viewedProducts.map((p) => p.brand))];
    const genders = [...new Set(viewedProducts.map((p) => p.gender))];

    const recommendations = await Product.find({
      $or: [
        { category: { $in: categories } },
        { brand: { $in: brands } },
        { gender: { $in: genders } },
      ],
      _id: { $nin: viewedProducts.map((p) => p._id) },
      isActive: true,
    })
      .sort({ rating: -1, salesCount: -1 })
      .limit(10);

    return recommendations;
  } catch (error) {
    console.error("Recommendation error:", error);
    return [];
  }
};

export const smartSearch = async (query) => {
  try {
    const keywords = query.toLowerCase().split(" ");

    const colorKeywords = ["red", "blue", "black", "white", "green", "yellow", "pink", "gray"];
    const priceKeywords = ["cheap", "expensive", "affordable", "budget"];
    const categoryKeywords = ["shirt", "pant", "jeans", "dress", "shoe", "top", "bottom"];

    let searchQuery = { isActive: true };

    const colors = keywords.filter((k) => colorKeywords.includes(k));
    if (colors.length > 0) {
      searchQuery.colors = { $in: colors.map((c) => new RegExp(c, "i")) };
    }

    const hasCheap = keywords.some((k) => priceKeywords.includes(k));
    if (hasCheap) {
      searchQuery.price = { $lte: 50 };
    }

    const categoryMatch = keywords.find((k) => categoryKeywords.includes(k));
    if (categoryMatch) {
      searchQuery.$or = [
        { name: new RegExp(categoryMatch, "i") },
        { category: new RegExp(categoryMatch, "i") },
        { tags: new RegExp(categoryMatch, "i") },
      ];
    } else {
      searchQuery.$text = { $search: query };
    }

    const products = await Product.find(searchQuery).limit(20);

    return products;
  } catch (error) {
    console.error("Smart search error:", error);
    return [];
  }
};

export const detectFraudOrder = (order, user) => {
  let fraudScore = 0;
  const flags = [];

  if (order.totalPrice > 5000) {
    fraudScore += 20;
    flags.push("High order value");
  }

  if (user.behavior.purchases.length === 0) {
    fraudScore += 15;
    flags.push("First time buyer");
  }

  if (order.orderItems.length > 10) {
    fraudScore += 10;
    flags.push("Large quantity");
  }

  const hoursSinceRegistration =
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60);
  if (hoursSinceRegistration < 24) {
    fraudScore += 25;
    flags.push("New account");
  }

  return { fraudScore, fraudFlags: flags };
};

export const analyzeSentiment = (text) => {
  const positiveWords = ["good", "great", "excellent", "amazing", "love", "perfect", "best"];
  const negativeWords = ["bad", "poor", "terrible", "worst", "hate", "awful", "disappointing"];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
};

export const predictDeliveryTime = (shippingAddress) => {
  const baseDeliveryDays = 5;
  const statePriority = {
    CA: 3,
    NY: 3,
    TX: 4,
    FL: 4,
  };

  const deliveryDays = statePriority[shippingAddress.state] || baseDeliveryDays;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + deliveryDays);

  return estimatedDelivery;
};
