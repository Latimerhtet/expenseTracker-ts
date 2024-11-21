import { useContext } from "react";
import userImg from "../../assets/UserImg.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Auth-Context/AuthProvider";
const Sidebar = () => {
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };
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
      <div className="pt-10 w-full h-full basis-4/6 flex flex-col items-center activegp  gap-3">
        <NavLink to={"/user"} end>
          Dashboard
        </NavLink>
        <NavLink to={"/user/expenses"}>Expenses</NavLink>
        <NavLink to={"/user/wallets"}>Wallet</NavLink>
        <NavLink to={"/user/profile"}>Profile</NavLink>
        <button
          className="p-2 rounded-md bg-red-500 text-white mt-3"
          onClick={handleLogout}
        >
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
