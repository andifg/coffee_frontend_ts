import { useDispatch } from "react-redux";
import useClientService from "./useClientService";

import { CoffeesService } from "../client";
import { deleteCoffeeId } from "../redux/CoffeeIdsReducer";

interface useDeleteCoffeeProps {
  coffee_id: string;
}

export default function useDeleteCoffee(
  props: useDeleteCoffeeProps,
): [() => Promise<void>] {
  const dispatch = useDispatch();

  const [callClientServiceMethod] = useClientService();

  const deleteCoffee = async () => {
    console.log("Delete coffee");
    try {
      await callClientServiceMethod({
        function: CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete,
        rethrowError: true,
        args: [props.coffee_id],
      });
      dispatch(deleteCoffeeId(props.coffee_id));
      console.log(`Removed coffee  ${props.coffee_id}`);
    } catch (e) {
      console.log("ERRRIIRRRRRR");
    }
  };

  return [deleteCoffee];
}
