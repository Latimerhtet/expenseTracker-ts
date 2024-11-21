import { DatePicker, Form, FormProps, Input } from "antd";
import { addWallet } from "../../API/transaction";
import { authContext } from "../../Auth-Context/AuthProvider";
import { useContext, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
export type WalletFormItem = {
  incomeName: string;
  amount: string;
  date: string;
};

type responseData = {
  isSuccess: boolean;
  message: string;
};

const WalletForm = () => {
  const { user } = useContext(authContext);
  const [isLoading, setLoading] = useState(false);
  const initvalues: WalletFormItem = {
    incomeName: "",
    amount: "",
    date: "",
  };
  const addIncome: FormProps<WalletFormItem>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const submitValues = { userId: user.id, data: values };
      const response: responseData = await addWallet(submitValues);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      layout="vertical"
      className="w-full p-3  border-dashed border-[3px]  border-fuchsia-500 rounded-md "
      initialValues={initvalues}
      onFinish={addIncome}
    >
      <h3 className="text-3xl font-semibold text-fuchsia-500">
        Add an Income!
      </h3>
      <Form.Item<WalletFormItem>
        label="Income Name"
        name={"incomeName"}
        rules={[{ required: true, message: "Income Name is empty." }]}
      >
        <Input className="" />
      </Form.Item>
      <Form.Item<WalletFormItem>
        label="Date"
        name={"date"}
        rules={[{ required: true, message: "Date is empty." }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item<WalletFormItem>
        label="Amount of Income"
        name={"amount"}
        rules={[{ required: true, message: "Expense amount is empty." }]}
      >
        <Input />
      </Form.Item>
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="p-2 bg-fuchsia-500 text-white rounded-md self-end"
        >
          Add to your income
          {isLoading && (
            <span className="ml-2">
              <SyncOutlined spin />
            </span>
          )}
        </button>
      </div>
    </Form>
  );
};

export default WalletForm;
