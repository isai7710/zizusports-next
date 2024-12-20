"use server";
import axios, { AxiosError } from "axios";

export async function getAllWooProducts() {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  const apiUrl = process.env.WC_API_URL;

  if (!consumerKey || !consumerSecret || !apiUrl) {
    throw new Error("WooCommerce API credentials are missing");
  }

  try {
    const response = await axios.get(
      `${apiUrl}/products?orderby=menu_order&order=asc&_fields=id,name,price,short_description,images,stock_status,attributes,categories,tags`,
      {
        auth: {
          username: consumerKey,
          password: consumerSecret,
        },
      },
    );

    return response.data;
  } catch (error) {
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

    throw error;
  }
}

export async function getWooProductById(id: string) {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  const apiUrl = process.env.WC_API_URL;

  if (!consumerKey || !consumerSecret || !apiUrl) {
    throw new Error("WooCommerce API credentials are missing");
  }

  try {
    const response = await axios.get(`${apiUrl}/products/${id}`, {
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });

    return response.data;
  } catch (error) {
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
      console.error("Error fetching WooCommerce product:", error);
    }

    throw error;
  }
}
export async function getWooProductsByTagId(tagId: string) {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;
  const apiUrl = process.env.WC_API_URL;

  if (!consumerKey || !consumerSecret || !apiUrl) {
    throw new Error("WooCommerce API credentials are missing");
  }

  try {
    const response = await axios.get(
      `${apiUrl}/products?tag=${tagId}&orderby=menu_order&order=asc&_fields=id,name,price,short_description,images,stock_status,attributes,categories,tags`,
      {
        auth: {
          username: consumerKey,
          password: consumerSecret,
        },
      },
    );

    return response.data;
  } catch (error) {
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
      console.error("Error fetching WooCommerce product:", error);
    }

    throw error;
  }
}
