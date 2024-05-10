import { Board } from "../components/Board/Board";
import { HomeHeaderBar } from "./Home/HomeHeaderBar";
import { FeedHeaderBar } from "./Feed/FeedHeaderBar";
import WelcomeScreen from "./Welcome/Welcome";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ButtomNavigator from "../components/BottomNavigator/BottomNavigator";
import { AddCoffeeCallback } from "../components/AddCoffeeCallbackContext/AddCoffeeCallbackContext";

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
          <AddCoffeeCallback>
            <FeedHeaderBar />
            <Board personalized={false} />
            <ButtomNavigator />
          </AddCoffeeCallback>
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <>
          <AddCoffeeCallback>
            <HomeHeaderBar />
            <Board personalized={true} />
            <ButtomNavigator />
          </AddCoffeeCallback>
        </>
      </PrivateRoute>
    ),
  },
];
