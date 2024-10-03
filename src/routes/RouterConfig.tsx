import { CoffeeBeanBoard } from "../components/CoffeeBeanBoard/CoffeeBeanBoard";
import { HomeHeaderBar } from "./Home/HomeHeaderBar";
import { FeedHeaderBar } from "./Feed/FeedHeaderBar";
import { CoffeeDrinksHeaderBar } from "./coffeeDrinks/CoffeeDrinksHeaderBar";
import WelcomeScreen from "./Welcome/Welcome";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ButtomNavigator from "../components/BottomNavigator/BottomNavigator";
import { AddCoffeeCallback } from "../components/AddCoffeeCallbackContext/AddCoffeeCallbackContext";
import { AddDrinkToCoffeeBeanCallback } from "../components/AddDrinktoCoffeeBeanContext/AddDrinkToCoffeeBeanContext";
import { AddDrinkCallback } from "../components/AddDrinkContext/AddDrinkCallbackContext";
import { CoffeeDrinksBoard } from "../components/CoffeeDrinksBoard/CoffeeDrinksBoard";

export const routerConfig = [
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/beans/*",
    element: (
      <PrivateRoute>
        <>
          <AddDrinkToCoffeeBeanCallback>
            <AddCoffeeCallback>
              <FeedHeaderBar />
              <CoffeeBeanBoard personalized={false} />
              <ButtomNavigator />
            </AddCoffeeCallback>
          </AddDrinkToCoffeeBeanCallback>
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/home/*",
    element: (
      <PrivateRoute>
        <>
          <AddDrinkToCoffeeBeanCallback>
            <AddCoffeeCallback>
              <HomeHeaderBar />
              <CoffeeBeanBoard personalized={true} />
              <ButtomNavigator />
            </AddCoffeeCallback>
          </AddDrinkToCoffeeBeanCallback>
        </>
      </PrivateRoute>
    ),
  },
  {
    path: "/drinks/*",
    element: (
      <PrivateRoute>
        <>
          <AddDrinkToCoffeeBeanCallback>
            <AddDrinkCallback>
              <CoffeeDrinksHeaderBar />
              <CoffeeDrinksBoard />
              <ButtomNavigator />
            </AddDrinkCallback>
          </AddDrinkToCoffeeBeanCallback>
        </>
      </PrivateRoute>
    ),
  },
];
