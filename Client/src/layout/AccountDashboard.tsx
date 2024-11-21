import Sidebar from "../components/AccountHomePage/Sidebar";

import { Outlet } from "react-router-dom";

export default function AccountDashboard() {
  return (
    <section className="w-full h-full flex ">
      <div className="w-full h-screen basis-1/5 bg-slate-100 ">
        <Sidebar />
      </div>
      <div className="w-full basis-4/5">
        <Outlet />
      </div>
    </section>
  );
}
