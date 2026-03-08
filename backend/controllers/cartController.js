import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

const recalculateCartTotals = (cart) => {
  cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cart.totalAfterDiscount = Math.max(0, cart.totalPrice - (cart.discountAmount || 0));
};

const computeCouponDiscount = (coupon, amount) => {
  if (coupon.discountType === "FIXED") {
    return Math.min(amount, coupon.discountValue);
  }

  const discount = (amount * coupon.discountValue) / 100;
  if (coupon.maxDiscount > 0) {
    return Math.min(discount, coupon.maxDiscount);
  }
  return discount;
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product")
      .populate("savedForLater.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [], savedForLater: [], totalPrice: 0, totalAfterDiscount: 0 },
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
        savedForLater: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
        size,
        color,
        price: product.discountPrice || product.price,
      });
    }

    recalculateCartTotals(cart);

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = Number(quantity);
    recalculateCartTotals(cart);

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    recalculateCartTotals(cart);

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const moveToSaveForLater = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    cart.savedForLater.push({
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: item.price,
    });

    item.deleteOne();
    recalculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");
    await cart.populate("savedForLater.product");

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const moveSavedItemToCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const savedItem = cart.savedForLater.id(itemId);
    if (!savedItem) {
      return res.status(404).json({ success: false, message: "Saved item not found" });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === savedItem.product.toString() &&
        item.size === savedItem.size &&
        item.color === savedItem.color
    );

    if (existingItem) {
      existingItem.quantity += savedItem.quantity;
    } else {
      cart.items.push({
        product: savedItem.product,
        quantity: savedItem.quantity,
        size: savedItem.size,
        color: savedItem.color,
        price: savedItem.price,
      });
    }

    savedItem.deleteOne();
    recalculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");
    await cart.populate("savedForLater.product");

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyCouponToCart = async (req, res) => {
  try {
    const { code } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const coupon = await Coupon.findOne({ code: code?.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Invalid coupon code" });
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }

    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
    }

    recalculateCartTotals(cart);
    if (cart.totalPrice < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value is ${coupon.minOrderValue}`,
      });
    }

    cart.appliedCoupon = coupon.code;
    cart.discountAmount = computeCouponDiscount(coupon, cart.totalPrice);
    recalculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCouponFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.appliedCoupon = "";
    cart.discountAmount = 0;
    recalculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    cart.appliedCoupon = "";
    cart.discountAmount = 0;
    recalculateCartTotals(cart);

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
