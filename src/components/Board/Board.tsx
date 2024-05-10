import React from "react";
import { useEffect, createContext } from "react";

import { Coffee as CoffeeSchema } from "../../client";

import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import SlideToReload from "../SlideToReload/SlideToReload";
import Container from "@mui/material/Container";

import { CoffeeCard } from "../Coffee/CoffeeCard/CoffeeCard";

import { useManageCoffeesState } from "./useManageCoffeesState";

const UpdateCoffeeContext = createContext<(coffee: CoffeeSchema) => void>(
  () => {},
);

const DeleteCoffeeContext = createContext<(coffee_id: string) => void>(
  () => {},
);

interface Props {
  personalized: boolean;
}

const Board: React.FC<Props> = (props: Props) => {
  const [
    coffees,
    fetchCoffees,
    fetchCoffeesLoading,
    updateCoffee,
    deleteCoffee,
  ] = useManageCoffeesState({
    personalized: props.personalized,
  });

  useEffect(() => {
    console.log("DATA NEW was changed " + coffees?.length || 0, Date.now());
  }, [coffees]);

  return (
    <>
      <SlideToReload
        functionToTrigger={fetchCoffees}
        functionToTriggerLoading={fetchCoffeesLoading}
      >
        <Container
          sx={{ bgcolor: "primary.light" }}
          className={coffees?.length != 0 ? "board-wrapper" : ""}
        >
          <UpdateCoffeeContext.Provider value={updateCoffee}>
            <DeleteCoffeeContext.Provider value={deleteCoffee}>
              <TransitionGroup>
                {coffees.map((coffee) => (
                  <Collapse key={coffee._id + "-collapse"}>
                    <CoffeeCard key={coffee._id} coffee={coffee} />
                  </Collapse>
                ))}
              </TransitionGroup>
            </DeleteCoffeeContext.Provider>
          </UpdateCoffeeContext.Provider>
        </Container>
      </SlideToReload>
    </>
  );
};

export { Board, UpdateCoffeeContext, DeleteCoffeeContext };
