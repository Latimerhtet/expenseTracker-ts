import axioInstance from "./axioInstance";
import { WalletFormItem } from "../components/AccountHomePage/WalletForm";

export const addWallet = async (payload: WalletFormItem) => {
  try {
    const response = await axioInstance.post("/user/addTransaction", payload);
    console.log(response);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};
