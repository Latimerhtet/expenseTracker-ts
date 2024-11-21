import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AccountDashboard from "./layout/AccountDashboard";
import AuthStatusProvider from "./Providers/AuthStatusProvider";
import RightBar from "./Pages/UserAccountPages/RightBar";
import Profile from "./Pages/UserAccountPages/Profile";
import Expenses from "./Pages/UserAccountPages/Expenses";
import Wallets from "./Pages/UserAccountPages/Wallets";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/user",
          element: (
            <AuthStatusProvider>
              <AccountDashboard />
            </AuthStatusProvider>
          ),
          children: [
            { index: true, element: <RightBar /> },
            { path: "/user/profile", element: <Profile /> },
            { path: "/user/expenses", element: <Expenses /> },
            { path: "/user/wallets", element: <Wallets /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
