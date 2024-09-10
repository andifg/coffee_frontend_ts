import { useEffect, useState, useRef, useContext } from "react";
import useClientService from "../../hooks/useClientService";
import { AddDrinkCallbackContext } from "../AddDrinkContext/AddDrinkCallbackContext";

import { Drink, DrinksService } from "../../client";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll/useInfinteScroll";

function useManageCoffeeDrinksState(): [
  Drink[],
  () => Promise<void>,
  (coffeeDrinkId: string) => void,
  boolean,
  boolean,
] {
  const [callClientServiceMethod] = useClientService();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setCallback } = useContext(AddDrinkCallbackContext);

  const page = useRef<number>(0);
  const infiniteScrollFirstCoffeeDrink = useRef<string | undefined>(undefined);

  const addDrink = (drink: Drink) => {
    setDrinks((prevState) => [drink, ...prevState]);
  };

  const deleteCoffeeDrink = (coffeeDrinkId: string) => {
    const newCoffees = drinks.filter((c) => c._id !== coffeeDrinkId);
    setDrinks(newCoffees);
  };

  const loadNextPage = async (pageOverwrite?: number) => {
    const current_page = pageOverwrite ? pageOverwrite : page.current;
    console.log("Load page: ", page.current + 1);

    const newCoffees = await callClientServiceMethod({
      function: DrinksService.listDrinksApiV1DrinksGet,
      args: [
        current_page + 1,
        5,
        infiniteScrollFirstCoffeeDrink.current,
        undefined,
      ],
    });

    if (newCoffees.length === 0) {
      console.log("No more data");
      return Promise.reject("No more data");
    }

    if (current_page === 0) {
      setDrinks(newCoffees);
      infiniteScrollFirstCoffeeDrink.current = newCoffees[0]._id;
    } else {
      setDrinks((prevState) => [...prevState, ...newCoffees]);
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
    setCallback(() => addDrink);
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [drinks, fetchFirstPage, deleteCoffeeDrink, loading, showInfitescroll];
}

export { useManageCoffeeDrinksState };
