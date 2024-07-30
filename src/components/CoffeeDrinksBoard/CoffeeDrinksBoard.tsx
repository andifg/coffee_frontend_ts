import "./CoffeeDrinksBoard.scss";
// import React from "react";
import { useEffect } from "react";

import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";

// import { Coffee as CoffeeSchema, CreateRating } from "../../client";
import SlideToReload from "../SlideToReload/SlideToReload";
import { useManageCoffeeDrinksState } from "./useManageCoffeeDrinksState";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
// import { RatingDialog } from "../RatingDialog/RatingDialog";

import { CoffeeDrinkCard } from "../CoffeeDrink/CoffeeDrinkCard/CoffeeDrinkCard";

// const UpdateCoffeeContext = createContext<(coffee: CoffeeSchema) => void>(
//   () => {},
// );

// const DeleteCoffeeContext = createContext<(coffee_id: string) => void>(
//   () => {},
// );

// const AddRatingToCoffeeContext = createContext<(rating: CreateRating) => void>(
//   () => {},
// );

const CoffeeDrinksBoard = () => {
  const [coffeeDrinks, fetchFirstPage, loading, showInfitescroll] =
    useManageCoffeeDrinksState();

  useEffect(() => {
    console.log(
      "DATA NEW was changed " + coffeeDrinks?.length || 0,
      Date.now(),
    );
  }, [coffeeDrinks]);

  return (
    <>
      {/* <AddRatingToCoffeeContext.Provider value={addRatingToCoffee}>
        <RatingDialog />
      </AddRatingToCoffeeContext.Provider> */}
      <SlideToReload
        functionToTrigger={fetchFirstPage}
        functionToTriggerLoading={loading}
      >
        <Container
          sx={{ bgcolor: "secondary.main" }}
          className={
            coffeeDrinks?.length != 0 ? "coffee-bean-board-wrapper" : ""
          }
        >
          {/* <UpdateCoffeeContext.Provider value={updateCoffee}>
            <DeleteCoffeeContext.Provider value={deleteCoffee}> */}
          <TransitionGroup className="coffee-bean-transition-group-wrapper">
            {coffeeDrinks &&
              coffeeDrinks.map((coffeeDrink) => (
                <Collapse key={coffeeDrink._id + "-collapse"}>
                  {<CoffeeDrinkCard coffeeDrink={coffeeDrink} />}
                </Collapse>
              ))}
          </TransitionGroup>
          {showInfitescroll && <LoadingCircle />}
          {/* </DeleteCoffeeContext.Provider>
          </UpdateCoffeeContext.Provider> */}
        </Container>
      </SlideToReload>
    </>
  );
};

export {
  CoffeeDrinksBoard,
  // UpdateCoffeeContext,
  // DeleteCoffeeContext,
  // AddRatingToCoffeeContext,
};
