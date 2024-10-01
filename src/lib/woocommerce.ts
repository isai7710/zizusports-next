// lib/woocommerce.ts
import axios, { AxiosError } from "axios";

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

    return response.data; // Returns the products
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

// Helper function to handle Axios errors
const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        "API responded with error:",
        axiosError.response.status,
        axiosError.response.data,
      );
    } else if (axiosError.request) {
      console.error("No response received:", axiosError.request);
    } else {
      console.error("Error setting up request:", axiosError.message);
    }
  } else {
    console.error("Error fetching WooCommerce products:", error);
  }
};
