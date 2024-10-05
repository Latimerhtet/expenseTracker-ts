import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
