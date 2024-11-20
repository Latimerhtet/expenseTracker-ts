import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-1/5 flex flex-col gap-2">
        <p className="text-2xl font-semibold text-fuchsia-500">
          Login to your account!
        </p>
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
