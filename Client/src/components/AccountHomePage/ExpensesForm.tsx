import { DatePicker, Form, Input } from "antd";

type FormItem = {
  expenseName: string;
  amount: string;
  date: string;
};

const ExpensesForm = () => {
  const initvalues: FormItem = {
    expenseName: "",
    amount: "",
    date: "",
  };
  return (
    <Form
      layout="vertical"
      className="w-full p-3 text-red-500 border-2 border-red-500 rounded-md"
      initialValues={initvalues}
    >
      <h3 className="text-2xl">Add an expense!</h3>
      <Form.Item<FormItem>
        label="Expense Name"
        name={"expenseName"}
        rules={[{ required: true, message: "Expense Name is empty." }]}
      >
        <Input className=" text-red-500" />
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
        >
          Add to your expenses
        </button>
      </div>
    </Form>
  );
};

export default ExpensesForm;
