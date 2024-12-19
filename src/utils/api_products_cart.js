import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// get products
export const getProductsCart = async (category = "", page = 1) => {
  try {
    const response = await axios.get(
      API_URL + "/productsCart?page=" + page + "&category=" + category
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// get product
export const getProductCart = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/products/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new product
export const addNewProductCart = async (name, description, price, category) => {
  try {
    const response = await axios.post(API_URL + "/products", {
      name: name,
      description: description,
      price: price,
      category: category,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};