import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        quantity: { type: Number, required: true },
        size: String,
        color: String,
        price: { type: Number, required: true },
        image: String,
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["PayPal", "Stripe", "Razorpay", "COD", "UPI", "Net Banking", "Credit Card", "Debit Card"],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    couponCode: {
      type: String,
      default: "",
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    orderStatus: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Out for delivery",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refunded",
      ],
      default: "Pending",
    },
    deliveredAt: Date,
    estimatedDelivery: Date,
    fraudScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    fraudFlags: [String],
    trackingNumber: String,
    deliveryPartner: String,
    notes: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
