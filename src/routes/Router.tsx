import Board from "./Home/Board/Board";
import HomeHeaderBar from "./Home/HeaderBar/HeaderBar";
import WelcomeScreen from "./Welcome/Welcome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import ButtomNavigator from "../components/BottomNavigator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/feed",
    element: (
      <PrivateRoute>
        <>
          <HomeHeaderBar />
          <Board />
          <ButtomNavigator />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <>
          <HomeHeaderBar />
          <h1>Hello Home</h1>
          <ButtomNavigator />
        </>
      </PrivateRoute>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
