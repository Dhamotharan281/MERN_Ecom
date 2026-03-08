import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import { detectFraudOrder, predictDeliveryTime } from "../services/aiService.js";
import { markCouponUsed } from "./couponController.js";
import { createNotification } from "../services/notificationService.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      couponCode,
      discount = 0,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      });
    }

    const user = await User.findById(req.user.id);
    const fraudAnalysis = detectFraudOrder({ totalPrice, orderItems }, user);

    if (fraudAnalysis.fraudScore > 0) {
      user.fraudScore = Math.min(100, user.fraudScore + fraudAnalysis.fraudScore);
      await user.save();
    }

    const estimatedDelivery = predictDeliveryTime(shippingAddress);

    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      discount,
      couponCode: couponCode || "",
      fraudScore: fraudAnalysis.fraudScore,
      fraudFlags: fraudAnalysis.fraudFlags,
      estimatedDelivery,
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.quantity, salesCount: item.quantity },
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        "behavior.purchases": {
          orderId: order._id,
          purchasedAt: Date.now(),
        },
      },
    });

    if (couponCode) {
      await markCouponUsed(couponCode, req.user.id);
    }

    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], totalPrice: 0, totalAfterDiscount: 0, appliedCoupon: "", discountAmount: 0 }
    );

    await createNotification({
      userId: req.user.id,
      title: "Order placed",
      message: `Your order #${order._id} has been placed successfully.`,
      type: "ORDER",
      metadata: { orderId: order._id },
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "ADMIN" &&
      req.user.role !== "SUPER_ADMIN"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingNumber, deliveryPartner } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus || order.orderStatus;
    order.trackingNumber = trackingNumber || order.trackingNumber;
    order.deliveryPartner = deliveryPartner || order.deliveryPartner;

    if (orderStatus === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    await createNotification({
      userId: order.user,
      title: "Order update",
      message: `Your order #${order._id} status is now "${order.orderStatus}".`,
      type: "SHIPPING",
      metadata: { orderId: order._id, status: order.orderStatus },
    });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelMyOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (["Delivered", "Cancelled", "Returned", "Refunded"].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled in "${order.orderStatus}" status`,
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    await createNotification({
      userId: req.user.id,
      title: "Order cancelled",
      message: `Your order #${order._id} has been cancelled.`,
      type: "ORDER",
      metadata: { orderId: order._id },
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const returnMyOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (order.orderStatus !== "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Only delivered orders can be returned",
      });
    }

    order.orderStatus = "Returned";
    await order.save();

    await createNotification({
      userId: req.user.id,
      title: "Return requested",
      message: `Return requested for order #${order._id}.`,
      type: "ORDER",
      metadata: { orderId: order._id },
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const isAdmin = req.user.role === "ADMIN" || req.user.role === "SUPER_ADMIN";
    if (!isAdmin && order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const invoice = {
      invoiceNumber: `INV-${order._id.toString().slice(-8).toUpperCase()}`,
      orderId: order._id,
      orderDate: order.createdAt,
      customer: {
        name: order.user.name,
        email: order.user.email,
      },
      items: order.orderItems,
      pricing: {
        itemsPrice: order.itemsPrice,
        taxPrice: order.taxPrice,
        shippingPrice: order.shippingPrice,
        discount: order.discount,
        totalPrice: order.totalPrice,
      },
      payment: {
        method: order.paymentMethod,
        isPaid: order.isPaid,
        paidAt: order.paidAt,
      },
      shippingAddress: order.shippingAddress,
      status: order.orderStatus,
    };

    res.setHeader("Content-Disposition", `attachment; filename=invoice-${order._id}.json`);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(invoice, null, 2));
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.orderStatus = order.orderStatus === "Pending" ? "Confirmed" : order.orderStatus;
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    await order.save();

    await createNotification({
      userId: order.user,
      title: "Payment successful",
      message: `Payment received for order #${order._id}.`,
      type: "ORDER",
      metadata: { orderId: order._id, paymentId: req.body.id },
    });

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
