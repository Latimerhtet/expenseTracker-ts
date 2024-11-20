import { DatePicker, Form, FormProps, Input } from "antd";
import { addWallet } from "../../API/transaction";
export type WalletFormItem = {
  incomeName: string;
  amount: string;
  date: string;
};

const WalletForm = () => {
  const initvalues: WalletFormItem = {
    incomeName: "",
    amount: "",
    date: "",
  };
  const addExpense: FormProps<WalletFormItem>["onFinish"] = async (values) => {
    try {
      const response = await addWallet(values);
      console.log(response);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <Form
      layout="vertical"
      className="w-full p-3 text-fuchsia-700 border-2 border-fuchsia-500 rounded-md"
      initialValues={initvalues}
      onFinish={addExpense}
    >
      <h3 className="text-2xl">Add an Income!</h3>
      <Form.Item<WalletFormItem>
        label="Income Name"
        name={"incomeName"}
        rules={[{ required: true, message: "Income Name is empty." }]}
      >
        <Input className=" text-fuchsia-500" />
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
        </button>
      </div>
    </Form>
  );
};

export default WalletForm;
