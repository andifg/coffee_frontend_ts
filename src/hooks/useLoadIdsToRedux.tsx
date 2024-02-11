import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/index";
import useClientService from "./useClientService";

import { CoffeesService } from "../client";
import { setCoffeeIds } from "../redux/CoffeeIdsReducer";

export default function useLoadIdsToRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const [callClientServiceMethod] = useClientService();

  async function fetchCoffeeIdsToRedux() {
    try {
      const coffeeIds = await callClientServiceMethod({
        function: CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet,
        rethrowError: true,
        args: [],
      });

      dispatch(setCoffeeIds(coffeeIds));
    } catch (e) {
      console.log("Error during fetch coffee ids");
    }
  }

  return [fetchCoffeeIdsToRedux];
}
