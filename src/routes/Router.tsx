import Board from "./Home/Board/Board";
import HomeHeaderBar from "./Home/HeaderBar/HeaderBar";
import WelcomeScreen from "./Welcome/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <>
          <HomeHeaderBar />
          <Board />
        </>
      </PrivateRoute>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
