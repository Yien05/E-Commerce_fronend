import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "sonner";

// (public api)
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get Category (public data)
export const getCategory = async (_id) => {
  try {
    const response = await axios.get(API_URL + "/categories/" + _id);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// add new Category (admin api)
export const addNewCategory = async (name, token) => {
  try {
    const response = await axios.post(
      API_URL + "/categories",
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          // Bearer dmedkefmekfek93kmd3k3od3o...
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// update Category (admin api)
export const editCategory = async (_id, name, token) => {
  try {
    const response = await axios.put(
      API_URL + "/categories/" + _id,
      {
        name: name,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

// delete Category (admin api)
export const deleteCategory = async (_id, token) => {
  try {
    const response = await axios.delete(API_URL + `/categories/${_id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
