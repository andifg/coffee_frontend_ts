import Board from "../components/Board/Board";
import HomeHeaderBar from "./Home/HeaderBar/HeaderBar";
import WelcomeScreen from "./Welcome/Welcome";
import PrivateRoute from "../components/PrivateRoute";
import ButtomNavigator from "../components/BottomNavigator";

export const routerConfig = [
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
];
