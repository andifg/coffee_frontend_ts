import React from "react";
import useClientService from "../../../hooks/useClientService";
// import { DeleteCoffeeContext } from "../../CoffeeBeanBoard/CoffeeBeanBoard";
import { DeleteCoffeeDrinkContext } from "../../CoffeeDrinksBoard/CoffeeDrinksBoard";

import { CoffeeDrinksService } from "../../../client";

interface useDeleteCoffeeProps {
  coffeeDrinkId: string;
}

export default function useDeleteCoffeeDrink(
  props: useDeleteCoffeeProps,
): [() => Promise<void>] {
  const deleteCoffeeInState = React.useContext(DeleteCoffeeDrinkContext);

  const [callClientServiceMethod] = useClientService();

  const deleteCoffeeDrink = async () => {
    console.log("Delete coffee drink");
    try {
      await callClientServiceMethod({
        function:
          CoffeeDrinksService.deleteCoffeeDrinkByIdApiV1CoffeeDrinksCoffeeDrinkIdDelete,
        rethrowError: true,
        args: [props.coffeeDrinkId],
      });
      deleteCoffeeInState(props.coffeeDrinkId);
      console.log(`Removed coffee with id ${props.coffeeDrinkId}`);
    } catch (_) {
      console.log("Error during delete coffee");
    }
  };

  return [deleteCoffeeDrink];
}
