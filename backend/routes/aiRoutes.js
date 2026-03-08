import express from "express";
import { getPersonalizedRecommendations, smartSearch } from "../services/aiService.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/recommendations", protect, async (req, res) => {
  try {
    const recommendations = await getPersonalizedRecommendations(req.user.id);
    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    const results = await smartSearch(query);
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    
    let response = "I'm here to help! How can I assist you today?";
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
      response = "To track your order, please go to 'My Orders' section in your profile.";
    } else if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      response = "You can return items within 30 days of delivery. Visit your order details to initiate a return.";
    } else if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      response = "We offer free shipping on orders over $50. Standard delivery takes 5-7 business days.";
    } else if (lowerMessage.includes("payment")) {
      response = "We accept PayPal, Stripe, and Cash on Delivery. All payments are secure and encrypted.";
    } else if (lowerMessage.includes("size")) {
      response = "Check our size guide on each product page. If you need help, our support team is available 24/7.";
    }

    res.status(200).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
