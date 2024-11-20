import React from "react";
import userImg from "../../assets/UserImg.jpg";
const Sidebar = () => {
  return (
    <aside className="w-full h-full p-6 flex flex-col">
      <div className="text-center basis-1/6 flex flex-col items-center justify-center gap-4">
        <img
          src={userImg}
          alt="User image"
          className="w-20 h-20 rounded-full"
        />
        <h4>Kaung Htet</h4>
      </div>
      <div className="pt-10 w-full h-full basis-4/6 flex flex-col items-center  gap-5">
        <button className="w-full p-2 bg-fuchsia-500 text-white rounded-md">
          Dashboard
        </button>
        <button>Expenses</button>
        <button>Wallet</button>
        <button>Profile</button>
        <button className="p-2 rounded-md bg-red-500 text-white">
          Log out
        </button>
      </div>
      <div className="w-full basis-1/6 flex justify-center">
        <p>Expense2U</p>
      </div>
    </aside>
  );
};

export default Sidebar;
