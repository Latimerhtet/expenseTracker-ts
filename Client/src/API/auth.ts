import axioInstance from "./axioInstance";

type registerValues = {
  name: String;
  email: String;
  password: String;
};

type loginValues = {
  email: String;
  password: String;
};

export const register = async (payload: registerValues) => {
  try {
    const response = await axioInstance.post("/register", payload);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (payload: loginValues) => {
  try {
    const response = await axioInstance.post("/login", payload);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const checkStatus = async () => {
  try {
    const response = await axioInstance.get("/status");
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
