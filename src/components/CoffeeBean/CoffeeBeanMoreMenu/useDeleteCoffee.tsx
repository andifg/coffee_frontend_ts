import React from "react";
import useClientService from "../../../hooks/useClientService";
import { DeleteCoffeeContext } from "../../CoffeeBeanBoard/CoffeeBeanBoard";

import { CoffeesService } from "../../../client";

interface useDeleteCoffeeProps {
  coffee_id: string;
}

export default function useDeleteCoffee(
  props: useDeleteCoffeeProps,
): [() => Promise<void>] {
  const deleteCoffeeInState = React.useContext(DeleteCoffeeContext);

  const [callClientServiceMethod] = useClientService();

  const deleteCoffee = async () => {
    console.log("Delete coffee");
    try {
      await callClientServiceMethod({
        function: CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete,
        rethrowError: true,
        args: [props.coffee_id],
      });
      deleteCoffeeInState(props.coffee_id);
      console.log(`Removed coffee with id ${props.coffee_id}`);
    } catch (_) {
      console.log("Error during delete coffee");
    }
  };

  return [deleteCoffee];
}
