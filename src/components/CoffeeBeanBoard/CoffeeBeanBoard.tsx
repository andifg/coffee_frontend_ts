import "./CoffeeBeanBoard.scss";
import React from "react";
import { useEffect, createContext } from "react";

import Container from "@mui/material/Container";

import { Coffee as CoffeeSchema } from "../../client";
import { CoffeeBeanCard } from "../CoffeeBean/CoffeeBeanCard/CoffeeBeanCard";
import SlideToReload from "../SlideToReload/SlideToReload";
import { useManageCoffeesState } from "./useManageCoffeesState";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";

const UpdateCoffeeContext = createContext<(coffee: CoffeeSchema) => void>(
  () => {},
);

const DeleteCoffeeContext = createContext<(coffee_id: string) => void>(
  () => {},
);

// const AddDrinkToCoffeeContext = createContext<(rating: CreateDrink) => void>(
//   () => {},
// );

interface Props {
  personalized: boolean;
}

const CoffeeBeanBoard: React.FC<Props> = (props: Props) => {
  const [
    coffees,
    fetchFirstPage,
    fetchCoffeesLoading,
    updateCoffee,
    deleteCoffee,
    showInfitescroll,
  ] = useManageCoffeesState({
    personalized: props.personalized,
  });

  useEffect(() => {
    console.log("Current coffee numbers: " + coffees?.length || 0);
  }, [coffees]);

  return (
    <>
      <SlideToReload
        functionToTrigger={fetchFirstPage}
        functionToTriggerLoading={fetchCoffeesLoading}
      >
        <Container
          sx={{ bgcolor: "secondary.main" }}
          className={coffees?.length != 0 ? "coffee-bean-board-wrapper" : ""}
        >
          <UpdateCoffeeContext.Provider value={updateCoffee}>
            <DeleteCoffeeContext.Provider value={deleteCoffee}>
              {/* <TransitionGroup className="coffee-bean-transition-group-wrapper"> */}
              <div className="coffee-bean-board-map-wrapper">
                {coffees &&
                  coffees.map((coffee) => (
                    <CoffeeBeanCard key={coffee._id} coffee={coffee} />
                  ))}
                {/* </TransitionGroup> */}
              </div>
              {showInfitescroll && <LoadingCircle />}
            </DeleteCoffeeContext.Provider>
          </UpdateCoffeeContext.Provider>
        </Container>
      </SlideToReload>
    </>
  );
};

export { CoffeeBeanBoard, UpdateCoffeeContext, DeleteCoffeeContext };
