import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// add new product
export const signup = async (name, email, password, comfirm_password) => {
    try {
      const response = await axios.post(API_URL + "/auth/signup", {
        name: name,
        email: email,
        password: password,
        comfirm_password: comfirm_password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };