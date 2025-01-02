import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// add new product
export const login = async (email, password) => {
    try {
      const response = await axios.post(API_URL + "/auth/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };