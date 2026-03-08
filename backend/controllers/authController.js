import crypto from "crypto";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import { sendTokenResponse } from "../utils/jwt.js";

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  avatar: user.avatar,
  isEmailVerified: user.isEmailVerified,
  isPhoneVerified: user.isPhoneVerified,
  addresses: user.addresses,
  wishlist: user.wishlist,
});

const sendDevEmailLog = (email, subject, value) => {
  // Fallback for local setup without SMTP credentials.
  console.log(`[Email Mock] To: ${email} | Subject: ${subject} | Value: ${value}`);
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const emailVerifyToken = crypto.randomBytes(20).toString("hex");

    const user = await User.create({
      name,
      email,
      password,
      phone,
      emailVerificationToken: hashToken(emailVerifyToken),
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    sendDevEmailLog(email, "Email Verification", emailVerifyToken);
    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.behavior.lastLogin = Date.now();
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, googleId, avatarUrl } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({
        success: false,
        message: "Email and googleId are required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString("hex");
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        password: randomPassword,
        authProvider: "GOOGLE",
        googleId,
        isEmailVerified: true,
        avatar: avatarUrl ? { url: avatarUrl, public_id: "" } : undefined,
      });
    } else {
      user.authProvider = "GOOGLE";
      user.googleId = googleId;
      user.isEmailVerified = true;
      if (avatarUrl) {
        user.avatar = { url: avatarUrl, public_id: "" };
      }
      await user.save();
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist", "name price images rating");

    res.status(200).json({
      success: true,
      data: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      "avatar.url": req.body.avatarUrl,
      "avatar.public_id": req.body.avatarPublicId,
    };

    Object.keys(fieldsToUpdate).forEach((key) => {
      if (fieldsToUpdate[key] === undefined) delete fieldsToUpdate[key];
    });

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).populate("wishlist", "name price images rating");

    res.status(200).json({
      success: true,
      data: sanitizeUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = hashToken(resetToken);
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    sendDevEmailLog(email, "Reset Password", resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: hashToken(token),
      resetPasswordExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendEmailVerification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const verifyToken = crypto.randomBytes(20).toString("hex");

    user.emailVerificationToken = hashToken(verifyToken);
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    sendDevEmailLog(user.email, "Email Verification", verifyToken);

    res.status(200).json({
      success: true,
      message: "Verification token generated",
      verificationToken: verifyToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: hashToken(token),
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendPhoneOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findById(req.user.id);
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    user.phone = phone || user.phone;
    user.phoneOtp = otp;
    user.phoneOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log(`[SMS Mock] To: ${user.phone} | OTP: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPhoneOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.phoneOtp || !user.phoneOtpExpires || user.phoneOtpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Request a new OTP.",
      });
    }

    if (user.phoneOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.isPhoneVerified = true;
    user.phoneOtp = undefined;
    user.phoneOtpExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Phone verified successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { street, city, state, zipCode, country, isDefault } = req.body;
    const user = await User.findById(req.user.id);

    if (isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }

    user.addresses.push({ street, city, state, zipCode, country, isDefault: !!isDefault });
    await user.save();

    res.status(201).json({
      success: true,
      data: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updates = req.body;
    const user = await User.findById(req.user.id);
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (updates.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) address[key] = updates[key];
    });

    await user.save();
    res.status(200).json({ success: true, data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = await User.findById(req.user.id);
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.deleteOne();
    await user.save();

    res.status(200).json({ success: true, data: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist", "name price images rating brand");
    res.status(200).json({ success: true, data: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user.wishlist.some((id) => id.toString() === productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    const populated = await User.findById(req.user.id).populate(
      "wishlist",
      "name price images rating brand"
    );

    res.status(200).json({ success: true, data: populated.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    const populated = await User.findById(req.user.id).populate(
      "wishlist",
      "name price images rating brand"
    );
    res.status(200).json({ success: true, data: populated.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const moveWishlistToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity = 1, size, color } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const user = await User.findById(req.user.id);
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size && item.color === color
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

    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cart.totalAfterDiscount = Math.max(0, cart.totalPrice - (cart.discountAmount || 0));
    await cart.save();

    res.status(200).json({ success: true, message: "Moved to cart successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
