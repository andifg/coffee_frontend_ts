import { useEffect, useState } from "react";
import useClientService from "../../hooks/useClientService";

import { CoffeesService, Coffee as CoffeeSchema } from "../../client";



export function useLoadCoffees(

): [
  CoffeeSchema[], boolean
] {
  const [callClientServiceMethod] = useClientService();
  const [coffees, setCoffees] = useState<CoffeeSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);



  useEffect(() => {
    const fetchCoffees = async () => {

      setCoffees(
        await callClientServiceMethod({
          function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
          args: [],
        }),
      );

      setLoading(false);
    };
    fetchCoffees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    coffees,
    loading,
  ];
}
