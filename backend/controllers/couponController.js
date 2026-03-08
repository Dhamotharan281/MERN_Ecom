import Coupon from "../models/Coupon.js";

const calculateDiscount = (coupon, amount) => {
  if (coupon.discountType === "FIXED") {
    return Math.min(amount, coupon.discountValue);
  }

  const discount = (amount * coupon.discountValue) / 100;
  if (coupon.maxDiscount > 0) {
    return Math.min(discount, coupon.maxDiscount);
  }
  return discount;
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: coupons.length, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }
    res.status(200).json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code, amount = 0 } = req.body;
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

    if (amount < coupon.minOrderValue) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value is ${coupon.minOrderValue}`,
      });
    }

    const discount = calculateDiscount(coupon, Number(amount));
    res.status(200).json({
      success: true,
      data: {
        code: coupon.code,
        discount,
        finalAmount: Math.max(0, Number(amount) - discount),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markCouponUsed = async (code, userId) => {
  const coupon = await Coupon.findOne({ code: code?.toUpperCase(), isActive: true });
  if (!coupon) return null;

  coupon.usedCount += 1;
  if (userId && !coupon.usedBy.some((id) => id.toString() === userId.toString())) {
    coupon.usedBy.push(userId);
  }
  await coupon.save();
  return coupon;
};
