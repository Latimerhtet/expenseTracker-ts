import { Form, FormProps, Input } from "antd";
import { register } from "../API/auth";
import { Link, useNavigate } from "react-router-dom";
type FieldType = {
  name: String;
  email: String;
  password: String;
};
type registerResult = {
  isSuccess: Boolean;
  message: String;
};

function RegisterForm() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response: registerResult = await register(values);
      if (!response?.isSuccess) {
        console.log(response.message);
        throw new Error("Registration is not successful!");
      } else {
        console.log("Account has been successfully register!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      className="bg-slate-100 p-5 text-md"
    >
      <Form.Item<FieldType>
        label="Username"
        name={"name"}
        rules={[{ required: true, message: "PLease input your username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name={"email"}
        rules={[{ required: true, message: "PLease input your username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="password"
        name={"password"}
        rules={[
          { required: true, min: 4, message: "PLease input your username" },
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <button
        type="submit"
        className="w-full p-2 bg-fuchsia-500  text-white rounded-md"
      >
        Register
      </button>
      <p>
        Have you already registered?
        <span>
          <Link to="/login"> Login here!</Link>
        </span>
      </p>
    </Form>
  );
}

export default RegisterForm;
