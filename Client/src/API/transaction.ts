import axioInstance from "./axioInstance";
import { WalletFormItem } from "../components/AccountHomePage/WalletForm";
import { FormItem } from "../components/AccountHomePage/ExpensesForm";

type AddWalletType = {
  userId: string;
  data: WalletFormItem;
};
type addExpenseType = {
  userId: string;
  data: FormItem;
};

export const addWallet = async (payload: AddWalletType) => {
  try {
    const response = await axioInstance.post("/user/addIncome", payload);
    console.log(response);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};
export const addExpense = async (payload: addExpenseType) => {
  try {
    const response = await axioInstance.post("/user/addExpense", payload);
    console.log(response);
    return response.data;
  } catch (error: any) {
    return error.response.data.message;
  }
};
