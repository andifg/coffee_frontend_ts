import { useEffect, useState, useContext, useRef } from "react";
import useClientService from "../../hooks/useClientService";
import { AddDrinkToCoffeeBeanContext } from "../AddDrinktoCoffeeBeanContext/AddDrinkToCoffeeBeanContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

import {
  CoffeesService,
  Coffee as CoffeeSchema,
  CreateDrink,
} from "../../client";
import { AddCoffeeCallbackContext } from "../AddCoffeeCallbackContext/AddCoffeeCallbackContext";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll/useInfinteScroll";

interface Props {
  personalized: boolean;
}

function useManageCoffeesState(
  props: Props,
): [
  CoffeeSchema[],
  () => Promise<void>,
  boolean,
  (coffee: CoffeeSchema) => void,
  (coffeeId: string) => void,
  boolean,
] {
  const [callClientServiceMethod] = useClientService();
  const [coffees, setCoffees] = useState<CoffeeSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setCallback } = useContext(AddCoffeeCallbackContext);

  const page = useRef<number>(0);
  const infiniteScrollFirstCoffee = useRef<string | undefined>(undefined);

  const { setCallbackForAddDrinkToCoffee } = useContext(
    AddDrinkToCoffeeBeanContext,
  );

  const ownerId = useSelector((state: RootState) => {
    if (props.personalized) {
      return state.user.userId;
    }
    return undefined;
  });

  const addCoffee = (coffee: CoffeeSchema) => {
    setCoffees((prevState) => [coffee, ...prevState]);
  };

  const updateCoffee = (coffee: CoffeeSchema) => {
    const newCoffees = coffees.map((c) => {
      if (c._id === coffee._id) {
        return coffee;
      }
      return c;
    });

    setCoffees(newCoffees);
  };

  const addDrinkForCoffee = (drink: CreateDrink) => {
    console.log("Add drink called");
    console.log(drink);
    console.log("coffees: ", coffees);
    setCoffees((prevState) => {
      return prevState.map((c) => {
        if (c._id === drink.coffee_bean_id) {
          return {
            ...c,
            rating_count: (c.rating_count ?? 0) + 1,
            rating_average:
              ((c.rating_average ?? 0) * (c.rating_count ?? 0) + drink.rating) /
              ((c.rating_count ?? 0) + 1),
          };
        }
        return c;
      });
    });
  };

  const deleteCoffee = (coffee_id: string) => {
    // console.log("Delete coffee: ", coffee_id);
    setCoffees((prevState) => {
      return prevState.filter((c) => c._id !== coffee_id);
    });
  };

  const loadNextPage = async (pageOverwrite?: number) => {
    const current_page = pageOverwrite ? pageOverwrite : page.current;

    console.log("Load page: ", current_page + 1);

    const newCoffees = await callClientServiceMethod({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      args: [page.current + 1, 5, ownerId, infiniteScrollFirstCoffee.current],
    });

    if (newCoffees.length === 0) {
      console.log("No more data");
      return Promise.reject("No more data");
    }

    if (current_page === 0) {
      setCoffees(newCoffees);
      infiniteScrollFirstCoffee.current = newCoffees[0]._id;
      page.current = 1;
      return Promise.resolve();
    } else {
      setCoffees((prevState) => [...prevState, ...newCoffees]);
    }

    page.current += 1;
  };

  const [showInfitescroll, resetTriggered] = useInfiniteScroll({
    functionToTrigger: loadNextPage,
  });

  const fetchFirstPage = async () => {
    console.log("Fetch first page");
    page.current = 0;
    infiniteScrollFirstCoffee.current = undefined;
    setLoading(true);
    try {
      await loadNextPage(0);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    resetTriggered();
  };

  useEffect(() => {
    setCallback(() => addCoffee);
    setCallbackForAddDrinkToCoffee(() => addDrinkForCoffee);
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.personalized]);

  return [
    coffees,
    fetchFirstPage,
    loading,
    updateCoffee,
    deleteCoffee,
    showInfitescroll,
  ];
}

export { useManageCoffeesState };
