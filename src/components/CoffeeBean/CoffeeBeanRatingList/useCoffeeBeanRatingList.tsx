import { useEffect, useRef, useState } from "react";
import { DrinksService, Drink } from "../../../client";
import useClientService from "../../../hooks/useClientService";
import { Coffee as CoffeeSchema } from "../../../client";

const useCoffeeRatingList = ({
  coffee,
}: {
  coffee: CoffeeSchema;
}): [Drink[], () => Promise<void>] => {
  const [ratings, setRatings] = useState<Drink[]>([]);
  const [callClientServiceMethod] = useClientService();
  const page = useRef<number>(0);
  const firstID = useRef<string | null>(null);

  const loadPage = async (pageNumber: number) => {
    console.log("Load page: ", pageNumber);

    try {
      const newRatings = await callClientServiceMethod({
        function: DrinksService.listDrinksApiV1DrinksGet,
        args: [pageNumber, 5, firstID.current, coffee._id],
        rethrowError: true,
      });

      if (!newRatings) {
        return;
      }
      if (pageNumber == 1) {
        setRatings(newRatings);
        firstID.current = newRatings[0]._id;
        return;
      }
      setRatings([...ratings, ...newRatings]);
    } catch (error) {
      console.error("Error loading ratings: ", error);
    }
  };

  const loadfirstPage = async () => {
    console.log("Load first page");
    page.current = 0;
    firstID.current = null;
    setRatings([]);
    await loadPage(page.current + 1);
    page.current = 1;
  };

  const loadNextPage = async () => {
    await loadPage(page.current + 1);
    page.current += 1;
  };

  useEffect(() => {
    loadfirstPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffee]);

  return [ratings, loadNextPage];
};

export { useCoffeeRatingList };
