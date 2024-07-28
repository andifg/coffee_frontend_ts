import "./CoffeeBeanBoard.scss";
import React from "react";
import { useEffect, createContext } from "react";

import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";

import { Coffee as CoffeeSchema, CreateRating } from "../../client";
import { CoffeeBeanCard } from "../CoffeeBean/CoffeeBeanCard/CoffeeBeanCard";
import SlideToReload from "../SlideToReload/SlideToReload";
import { useManageCoffeesState } from "./useManageCoffeesState";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { RatingDialog } from "../RatingDialog/RatingDialog";

const UpdateCoffeeContext = createContext<(coffee: CoffeeSchema) => void>(
  () => {},
);

const DeleteCoffeeContext = createContext<(coffee_id: string) => void>(
  () => {},
);

const AddRatingToCoffeeContext = createContext<(rating: CreateRating) => void>(
  () => {},
);

interface Props {
  personalized: boolean;
}

const CoffeeBeanBoard: React.FC<Props> = (props: Props) => {
  const [
    coffees,
    fetchFirstPage,
    fetchCoffeesLoading,
    updateCoffee,
    addRatingToCoffee,
    deleteCoffee,
    showInfitescroll,
  ] = useManageCoffeesState({
    personalized: props.personalized,
  });

  useEffect(() => {
    console.log("DATA NEW was changed " + coffees?.length || 0, Date.now());
  }, [coffees]);

  return (
    <>
      <AddRatingToCoffeeContext.Provider value={addRatingToCoffee}>
        <RatingDialog />
      </AddRatingToCoffeeContext.Provider>
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
              <TransitionGroup className="coffee-bean-transition-group-wrapper">
                {coffees &&
                  coffees.map((coffee) => (
                    <Collapse key={coffee._id + "-collapse"}>
                      <CoffeeBeanCard key={coffee._id} coffee={coffee} />
                    </Collapse>
                  ))}
              </TransitionGroup>
              {showInfitescroll && <LoadingCircle />}
            </DeleteCoffeeContext.Provider>
          </UpdateCoffeeContext.Provider>
        </Container>
      </SlideToReload>
    </>
  );
};

export {
  CoffeeBeanBoard,
  UpdateCoffeeContext,
  DeleteCoffeeContext,
  AddRatingToCoffeeContext,
};
