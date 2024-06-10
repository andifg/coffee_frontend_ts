import { useEffect, useState, useContext, useRef } from "react";
import useClientService from "../../hooks/useClientService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

import {
  CoffeesService,
  Coffee as CoffeeSchema,
  CreateRating,
} from "../../client";
import { AddCoffeeCallbackContext } from "../AddCoffeeCallbackContext/AddCoffeeCallbackContext";
import useInfiniteScroll from "./useInfinteScroll";

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
  (rating: CreateRating) => void,
  (coffeeId: string) => void,
  boolean,
] {
  const [callClientServiceMethod] = useClientService();
  const [coffees, setCoffees] = useState<CoffeeSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setCallback } = useContext(AddCoffeeCallbackContext);

  const page = useRef<number>(0);
  const infiniteScrollFirstCoffee = useRef<string | undefined>(undefined);

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

  const addRatingToCoffee = (rating: CreateRating) => {
    const newCoffees = coffees.map((c) => {
      if (c._id === rating.coffee_id) {
        return {
          ...c,
          rating_count: (c.rating_count ?? 0) + 1,
          rating_average:
            ((c.rating_average ?? 0) * (c.rating_count ?? 0) + rating.rating) /
            ((c.rating_count ?? 0) + 1),
        };
      }
      return c;
    });
    setCoffees(newCoffees);
  };

  const deleteCoffee = (coffee_id: string) => {
    const newCoffees = coffees.filter((c) => c._id !== coffee_id);
    setCoffees(newCoffees);
  };

  const loadNextPage = async () => {
    console.log("Load page: ", page.current + 1);

    const newCoffees = await callClientServiceMethod({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      args: [page.current + 1, 5, ownerId, infiniteScrollFirstCoffee.current],
    });

    if (newCoffees.length === 0) {
      console.log("No more data");
      return Promise.reject("No more data");
    }

    if (page.current === 0) {
      setCoffees(newCoffees);
      infiniteScrollFirstCoffee.current = newCoffees[0]._id;
    } else {
      setCoffees((prevState) => [...prevState, ...newCoffees]);
    }

    page.current += 1;
  };

  const [showInfitescroll, resetTriggered] = useInfiniteScroll({
    functionToTrigger: loadNextPage,
  });

  const fetchFirstPage = async () => {
    page.current = 0;
    infiniteScrollFirstCoffee.current = undefined;
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
    setCallback(() => addCoffee);
    fetchFirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.personalized]);

  return [
    coffees,
    fetchFirstPage,
    loading,
    updateCoffee,
    addRatingToCoffee,
    deleteCoffee,
    showInfitescroll,
  ];
}

export { useManageCoffeesState };
