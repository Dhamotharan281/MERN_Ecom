import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "SELLER", "ADMIN", "SUPER_ADMIN"],
      default: "USER",
    },
    phone: String,
    avatar: {
      url: String,
      public_id: String,
    },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        isDefault: { type: Boolean, default: false },
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    savedPaymentMethods: [
      {
        methodType: {
          type: String,
          enum: ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash on Delivery"],
        },
        label: String,
        last4: String,
      },
    ],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    phoneOtp: String,
    phoneOtpExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    authProvider: {
      type: String,
      enum: ["LOCAL", "GOOGLE"],
      default: "LOCAL",
    },
    googleId: {
      type: String,
      sparse: true,
    },
    behavior: {
      viewedProducts: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          viewedAt: { type: Date, default: Date.now },
        },
      ],
      purchases: [
        {
          orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
          purchasedAt: { type: Date, default: Date.now },
        },
      ],
      searchHistory: [
        {
          query: String,
          searchedAt: { type: Date, default: Date.now },
        },
      ],
      cartAbandonment: [
        {
          products: Array,
          abandonedAt: { type: Date, default: Date.now },
        },
      ],
      lastLogin: Date,
    },
    fraudScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
