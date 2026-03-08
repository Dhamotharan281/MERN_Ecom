import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      gender,
      brand,
      color,
      size,
      material,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      search,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (gender) query.gender = gender;
    if (brand) {
      const brands = String(brand)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      if (brands.length > 0) query.brand = { $in: brands };
    }
    if (color) {
      const colors = String(color)
        .split(",")
        .map((item) => new RegExp(`^${item.trim()}$`, "i"));
      query.colors = { $in: colors };
    }
    if (size) {
      const sizes = String(size)
        .split(",")
        .map((item) => new RegExp(`^${item.trim()}$`, "i"));
      query.sizes = { $in: sizes };
    }
    if (material) {
      const materials = String(material)
        .split(",")
        .map((item) => new RegExp(`^${item.trim()}$`, "i"));
      query.material = { $in: materials };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (inStock === "true") query.countInStock = { $gt: 0 };
    if (search) {
      query.$text = { $search: search };
    }

    const sortOption = {};
    if (sort === "price-asc") sortOption.price = 1;
    else if (sort === "price-desc") sortOption.price = -1;
    else if (sort === "rating") sortOption.rating = -1;
    else if (sort === "popular") sortOption.salesCount = -1;
    else if (sort === "newest") sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.user", "name avatar");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.viewCount += 1;
    await product.save();

    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          "behavior.viewedProducts": {
            productId: product._id,
            viewedAt: Date.now(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      isActive: true,
      $or: [{ category: product.category }, { brand: product.brand }],
    })
      .sort({ rating: -1, salesCount: -1 })
      .limit(10);

    res.status(200).json({ success: true, data: relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecentlyViewedProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("behavior.viewedProducts.productId");
    const productIds = [];

    user.behavior.viewedProducts
      .slice(-30)
      .reverse()
      .forEach((entry) => {
        const id = entry.productId?._id?.toString();
        if (id && !productIds.includes(id)) productIds.push(id);
      });

    const products = await Product.find({
      _id: { $in: productIds },
      isActive: true,
    }).limit(20);

    const ordered = productIds
      .map((id) => products.find((product) => product._id.toString() === id))
      .filter(Boolean);

    res.status(200).json({ success: true, data: ordered });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.user.role === "SELLER") {
      payload.seller = req.user.id;
      payload.sellerApprovalStatus = "PENDING";
      payload.isActive = false;
    }

    const product = await Product.create(payload);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveSellerProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.sellerApprovalStatus = "APPROVED";
    product.isActive = true;
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectSellerProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.sellerApprovalStatus = "REJECTED";
    product.isActive = false;
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "Product already reviewed",
      });
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const review = product.reviews.find((item) => item.user.toString() === req.user.id.toString());
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (rating !== undefined) review.rating = Number(rating);
    if (comment !== undefined) review.comment = comment;

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({ success: true, message: "Review updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const isAdmin = req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN";
    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (!isAdmin && review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    review.deleteOne();

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        : 0;

    await product.save();
    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true }).limit(8);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("behavior.viewedProducts.productId");

    const viewedCategories = user.behavior.viewedProducts
      .map((item) => item.productId?.category)
      .filter(Boolean);

    const recommendedProducts = await Product.find({
      category: { $in: viewedCategories },
      isActive: true,
    }).limit(10);

    res.status(200).json({
      success: true,
      data: recommendedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
