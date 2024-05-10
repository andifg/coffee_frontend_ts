import { useEffect, useState, useContext } from "react";
import useClientService from "../../hooks/useClientService";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux";

import { CoffeesService, Coffee as CoffeeSchema } from "../../client";
import { AddCoffeeCallbackContext } from "../AddCoffeeCallbackContext/AddCoffeeCallbackContext";

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
] {
  const [callClientServiceMethod] = useClientService();
  const [coffees, setCoffees] = useState<CoffeeSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setCallback } = useContext(AddCoffeeCallbackContext);

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

  const deleteCoffee = (coffee_id: string) => {
    const newCoffees = coffees.filter((c) => c._id !== coffee_id);
    setCoffees(newCoffees);
  };

  const fetchCoffees = async () => {
    setCallback(() => addCoffee);
    setCoffees(
      await callClientServiceMethod({
        function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
        args: [1, 10, ownerId],
      }),
    );
  };

  useEffect(() => {
    // console.log("Fetching coffees");
    setLoading(true);
    fetchCoffees().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.personalized]);

  return [coffees, fetchCoffees, loading, updateCoffee, deleteCoffee];
}

export { useManageCoffeesState };
