import { useState } from "react";

import { uuidv7 } from "uuidv7";

import { RatingsService } from "../client";
import { Rating as RatingSchema } from "../client/models/Rating";

import useClientService from "./useClientService";

interface Props {
  coffee_id: string;
  initialRating: number;
  initialRatingCount: number;
}

export default function useCoffeeRatingAdd(
  props: Props,
  setShowAddRatingStars: React.Dispatch<React.SetStateAction<boolean>>,
): [
  number,
  number,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  () => void,
  string | null,
] {
  const [error, setError] = useState<string | null>(null);
  const [ratingAverage, setRatingAverage] = useState<number>(
    props.initialRating,
  );
  const [ratingCount, setRatingCount] = useState<number>(
    props.initialRatingCount,
  );
  const [currentRating, setCurrentRating] = useState<number>(0);

  const [callClientServiceMethod] = useClientService();

  const addRatingtoCoffee = async () => {
    setError(null);

    const uuid = uuidv7();
    const rating: RatingSchema = {
      _id: uuid,
      coffee_id: props.coffee_id,
      rating: currentRating,
    };

    try {
      await callClientServiceMethod({
        function:
          RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
        rethrowError: true,
        args: [props.coffee_id, rating],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
        return;
      }
    }

    const new_average =
      (ratingAverage * ratingCount + currentRating) / (ratingCount + 1);
    setRatingAverage(new_average);
    setRatingCount(ratingCount + 1);
    setCurrentRating(0);

    setShowAddRatingStars(false);
  };

  return [
    currentRating,
    ratingAverage,
    ratingCount,
    setCurrentRating,
    addRatingtoCoffee,
    error,
  ];
}
