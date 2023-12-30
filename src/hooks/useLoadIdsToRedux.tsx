import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/index";
import useClientService from "./useClientService";

import { CoffeesService } from "../client";
import { setCoffeeIds } from "../redux/CoffeeIdsReducer";

export default function useLoadIdsToRedux() {
  const dispatch = useDispatch<AppDispatch>();
  const [callClientServiceMethod] = useClientService();

  async function fetchCoffeeIdsToRedux() {
    const coffeeIds = await callClientServiceMethod(
      CoffeesService.listCoffeeIdsApiV1CoffeesIdsGet,
    );

    if (coffeeIds) {
      dispatch(setCoffeeIds(coffeeIds));
    }
  }

  return [fetchCoffeeIdsToRedux];
}
