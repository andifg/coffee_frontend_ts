import { useState } from "react";
import { useContext } from "react";
import { AddRatingToCoffeeContext } from "../Board/Board";
import { uuidv7 } from "uuidv7";
import useClientService from "../../hooks/useClientService";
import { RatingsService, CreateRating, BrewingMethod } from "../../client";
import { useSearchParams } from "react-router-dom";

interface Props {
  close: () => void;
}

interface Params {
  coffeeId?: string;
  coffeeName?: string;
  roastingCompany?: string;
  brewingMethod?: string;
  brewingRating?: string;
}

const useAddCoffeeBrewRating = (
  props: Props,
): [
  boolean,
  string | null,
  ({ brewingMethod, brewingRating }: Params) => void,
  () => Promise<void>,
  string,
  string,
  string,
  string,
] => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const [callClientServiceMethod] = useClientService();

  const addRatingToCoffee = useContext(AddRatingToCoffeeContext);

  const currentUuid = uuidv7();

  const coffeeId: string = searchParams.get("coffeeId") ?? "";
  const coffeeName: string = searchParams.get("coffeeName") ?? "";
  const roastingCompany: string = searchParams.get("roastingCompany") ?? "";
  const method: string = searchParams.get("brewingMethod") ?? "";
  const rating: string = searchParams.get("brewingRating") ?? "";

  const setParams = ({
    brewingMethod = method,
    brewingRating = rating,
  }: Params) => {
    setError(null);
    const newParams: Params = {
      coffeeId,
      coffeeName,
      roastingCompany,
      brewingMethod,
      brewingRating,
    };
    setSearchParams(newParams as Record<string, string>);
  };

  const submit = async () => {
    setLoading(true);

    if (!rating) {
      setError("Rating is required");
      setLoading(false);
      return;
    }

    if (!method) {
      setError("Brewing method is required");
      setLoading(false);
      return;
    }

    try {
      const currentRating: CreateRating = {
        _id: currentUuid,
        coffee_id: coffeeId,
        brewing_method: method as BrewingMethod,
        rating: parseFloat(rating),
      };
      await callClientServiceMethod({
        function:
          RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
        rethrowError: true,
        args: [currentRating],
      });

      addRatingToCoffee(currentRating);

      setTimeout(() => {
        setLoading(false);
        props.close();
      }, 200);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        setLoading(false);
        setError(e.message);
      }
    }
  };

  return [
    loading,
    error,
    setParams,
    submit,
    coffeeName,
    roastingCompany,
    method,
    rating,
  ];
};

export { useAddCoffeeBrewRating };
