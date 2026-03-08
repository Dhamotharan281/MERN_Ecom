import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Top Wear", "Bottom Wear", "Accessories", "Footwear"],
    },
    brand: String,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sellerApprovalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "APPROVED",
    },
    sizes: [String],
    colors: [String],
    collections: String,
    material: String,
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    images: [
      {
        url: String,
        altText: String,
        public_id: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        rating: { type: Number, required: true },
        comment: String,
        sentiment: String,
        isFake: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    embeddingVector: [Number],
    viewCount: {
      type: Number,
      default: 0,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, brand: 1, rating: -1, price: 1, countInStock: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
