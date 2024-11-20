import { Form, FormProps, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../API/auth";
import { authContext } from "../Auth-Context/AuthProvider";
import { useContext } from "react";
type FieldType = {
  email: String;
  password: String;
};

type loginResult = {
  isSuccess: boolean;
  message: string;
  token: string;
};
const LoginForm = () => {
  const { setToken, setLoading } = useContext(authContext);
  const navigate = useNavigate();
  const initialValues: FieldType = {
    email: "",
    password: "",
  };

  const register: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setLoading(true);
      const response: loginResult = await login(values);
      if (!response?.isSuccess) {
        const erroMsg = response.message;
        throw new Error(erroMsg);
      } else {
        console.log("User has logged in successfully!");
        const restoken = response.token;
        setToken(restoken);
        localStorage.setItem("token", restoken);
        console.log("This is from loginform" + restoken);
        navigate("/user");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form layout="vertical" initialValues={initialValues} onFinish={register}>
        <Form.Item<FieldType>
          label="Email"
          name={"email"}
          rules={[{ required: true, message: "Email is mandatory" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name={"password"}
          rules={[{ required: true, message: "Email is mandatory" }]}
        >
          <Input.Password visibilityToggle />
        </Form.Item>
        <button className="p-2 w-full bg-fuchsia-500 text-white rounded-md">
          Login
        </button>
        <p>
          Don't you have an account?
          <span className="underline">
            <Link to={"/register"}> Register Here</Link>
          </span>
        </p>
      </Form>
    </>
  );
};

export default LoginForm;
