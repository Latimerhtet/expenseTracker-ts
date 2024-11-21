import { DatePicker, Form, FormProps, Input, message } from "antd";
import { useContext, useState } from "react";
import { authContext } from "../../Auth-Context/AuthProvider";
import { addExpense } from "../../API/transaction";
import { SyncOutlined } from "@ant-design/icons";

export type FormItem = {
  expenseName: string;
  amount: string;
  date: string;
};

const ExpensesForm = () => {
  const { user } = useContext(authContext);
  const [isLoading, setLoading] = useState(false);
  const initvalues: FormItem = {
    expenseName: "",
    amount: "",
    date: "",
  };
  const addExpenseOnFinish: FormProps<FormItem>["onFinish"] = async (
    values
  ) => {
    try {
      setLoading(true);
      const submitValues = { userId: user.id, data: values };
      const response = await addExpense(submitValues);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }
      console.log(response);
      message.success(response.message);
    } catch (error: any) {
      console.error(error.message);
      message.success(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        className="w-full p-3  border-[3px] border-dashed border-red-500 rounded-md"
        initialValues={initvalues}
        onFinish={addExpenseOnFinish}
      >
        <h3 className="text-3xl font-semibold text-red-500">Add an expense!</h3>
        <Form.Item<FormItem>
          label="Expense Name"
          name={"expenseName"}
          rules={[{ required: true, message: "Expense Name is empty." }]}
        >
          <Input className=" " />
        </Form.Item>
        <Form.Item<FormItem>
          label="Date "
          name={"date"}
          rules={[{ required: true, message: "Date is empty." }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<FormItem>
          label="Amount of Expense"
          name={"amount"}
          rules={[{ required: true, message: "Expense amount is empty." }]}
        >
          <Input />
        </Form.Item>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="p-2 bg-red-400 text-white rounded-md self-end"
            disabled={isLoading}
          >
            Add to your expenses
            {isLoading && (
              <span className="ml-2">
                <SyncOutlined spin />
              </span>
            )}
          </button>
        </div>
      </Form>
    </>
  );
};

export default ExpensesForm;
