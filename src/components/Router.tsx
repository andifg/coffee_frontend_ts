import Board from "./Body/Board";
import HomeHeaderBar from "./HeaderBar/HomeHeaderBar";
import WelcomeScreen from "../routes/WelcomeScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./Common/PrivateRoute";

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
