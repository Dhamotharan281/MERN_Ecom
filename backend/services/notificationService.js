import Notification from "../models/Notification.js";

export const createNotification = async ({ userId, title, message, type = "SYSTEM", metadata = {} }) => {
  try {
    if (!userId) return null;
    return await Notification.create({
      user: userId,
      title,
      message,
      type,
      metadata,
    });
  } catch (error) {
    console.error("Notification create error:", error.message);
    return null;
  }
};
