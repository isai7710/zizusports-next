// lib/woocommerce.ts
import axios from "axios";

export const getWooCommerceProducts = async () => {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  const apiUrl = process.env.WC_API_URL;

  if (!consumerKey || !consumerSecret || !apiUrl) {
    throw new Error("WooCommerce API credentials are missing");
  }

  try {
    const response = await axios.get(`${apiUrl}/products`, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    throw error;
  }
};
