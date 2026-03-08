import axios from "axios";
import { generateAccessToken } from "../config/paypal.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const captureOrder = async (req, res) => {
  try {
    const { orderID } = req.params;
    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
