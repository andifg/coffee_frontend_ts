import { useEffect, useState } from "react";
import useClientService from "./useClientService";
import useLoadImageURL from "./useLoadImage";
import {
  CoffeesService,
  RatingsService,
  RatingSummary,
  Coffee as CoffeeSchema,
} from "../client";

const emptyRatingSummary: RatingSummary = {
  coffee_id: "",
  rating_average: 0,
  rating_count: 0,
};

interface Props {
  coffee_id: string;
  reload: number;
  childrenLoaded: () => void;
}

export function useCoffeeData(
  props: Props,
): [
  CoffeeSchema | undefined,
  boolean,
  string,
  RatingSummary,
  (newCoffeeName: string) => void,
  (newCoffeeImage: File) => void,
] {
  const [callClientServiceMethod] = useClientService();
  const [coffee, setData] = useState<CoffeeSchema>();
  const [loading, setLoading] = useState<boolean>(true);
  const [coffeeImageURL, fetchImageURL, updateCoffeeImage] = useLoadImageURL(
    props.coffee_id,
  );
  const [initalRatingSummary, setInitialRatingSummary] =
    useState<RatingSummary>(emptyRatingSummary);

  const updateCoffeeName = (newCoffeeName: string) => {
    setData((prevState) => {
      if (prevState) {
        prevState.name = newCoffeeName;

        return prevState;
      }
      return undefined;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchImageURL();

      setData(
        await callClientServiceMethod({
          function: CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
          args: [props.coffee_id],
        }),
      );

      setInitialRatingSummary(
        await callClientServiceMethod({
          function:
            RatingsService.getCoffeesRatingSummaryApiV1CoffeesCoffeeIdRatingSummaryGet,
          args: [props.coffee_id],
        }),
      );

      props.childrenLoaded();

      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reload]);

  return [
    coffee,
    loading,
    coffeeImageURL,
    initalRatingSummary,
    updateCoffeeName,
    updateCoffeeImage,
  ];
}
