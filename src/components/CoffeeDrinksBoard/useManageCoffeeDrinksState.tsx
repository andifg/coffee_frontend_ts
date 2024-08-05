import { useEffect, useState, useRef } from "react";
import useClientService from "../../hooks/useClientService";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux";

import {
  Rating as CoffeeDrink,
  RatingsService as CoffeeDrinkService,
} from "../../client";
// import { AddCoffeeCallbackContext } from "../AddCoffeeCallbackContext/AddCoffeeCallbackContext";
import useInfiniteScroll from "../useInfiniteScroll/useInfinteScroll";

function useManageCoffeeDrinksState(): [
  CoffeeDrink[],
  () => Promise<void>,
  (coffeeDrinkId: string) => void,
  boolean,
  boolean,
] {
  const [callClientServiceMethod] = useClientService();
  const [coffeeDrinks, setCoffeeDrinks] = useState<CoffeeDrink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const { setCallback } = useContext(AddCoffeeCallbackContext);

  const page = useRef<number>(0);
  const infiniteScrollFirstCoffeeDrink = useRef<string | undefined>(undefined);

  // const addCoffee = (coffee: CoffeeSchema) => {
  //   setCoffees((prevState) => [coffee, ...prevState]);
  // };

  // const updateCoffee = (coffee: CoffeeSchema) => {
  //   const newCoffees = coffees.map((c) => {
  //     if (c._id === coffee._id) {
  //       return coffee;
  //     }
  //     return c;
  //   });

  //   setCoffees(newCoffees);
  // };

  const deleteCoffeeDrink = (coffeeDrinkId: string) => {
    const newCoffees = coffeeDrinks.filter((c) => c._id !== coffeeDrinkId);
    setCoffeeDrinks(newCoffees);
  };

  const loadNextPage = async () => {
    console.log("Load page: ", page.current + 1);

    const newCoffees = await callClientServiceMethod({
      function: CoffeeDrinkService.listRatingsApiV1RatingsGet,
      args: [
        page.current + 1,
        5,
        undefined,
        infiniteScrollFirstCoffeeDrink.current,
      ],
    });

    if (newCoffees.length === 0) {
      console.log("No more data");
      return Promise.reject("No more data");
    }

    if (page.current === 0) {
      setCoffeeDrinks(newCoffees);
      infiniteScrollFirstCoffeeDrink.current = newCoffees[0]._id;
    } else {
      setCoffeeDrinks((prevState) => [...prevState, ...newCoffees]);
    }

    page.current += 1;
  };

  const [showInfitescroll, resetTriggered] = useInfiniteScroll({
    functionToTrigger: loadNextPage,
  });

  const fetchFirstPage = async () => {
    page.current = 0;
    infiniteScrollFirstCoffeeDrink.current = undefined;
    setLoading(true);
    try {
      await loadNextPage();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    resetTriggered();
  };

  useEffect(() => {
    // setCallback(() => addCoffee);
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    coffeeDrinks,
    fetchFirstPage,
    deleteCoffeeDrink,
    loading,
    showInfitescroll,
  ];
}

export { useManageCoffeeDrinksState };
