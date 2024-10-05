import { Outlet } from "react-router-dom";

function Main() {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <Outlet />
    </section>
  );
}

export default Main;
