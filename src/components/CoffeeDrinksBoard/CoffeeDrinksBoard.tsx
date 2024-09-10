import "./CoffeeDrinksBoard.scss";

import { useEffect, createContext } from "react";
import Container from "@mui/material/Container";

import SlideToReload from "../SlideToReload/SlideToReload";
import { useManageCoffeeDrinksState } from "./useManageCoffeeDrinksState";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { CoffeeDrinkCard } from "../CoffeeDrink/CoffeeDrinkCard/CoffeeDrinkCard";

const DeleteCoffeeDrinkContext = createContext<(coffee_id: string) => void>(
  () => {},
);

const CoffeeDrinksBoard = () => {
  const [drinks, fetchFirstPage, deleteCoffeeDrink, loading, showInfitescroll] =
    useManageCoffeeDrinksState();

  useEffect(() => {
    console.log("Current drink length: " + drinks?.length || 0);
  }, [drinks]);

  return (
    <>
      <SlideToReload
        functionToTrigger={fetchFirstPage}
        functionToTriggerLoading={loading}
      >
        <Container
          sx={{ bgcolor: "secondary.main" }}
          className={drinks?.length != 0 ? "coffee-drinks-board-wrapper" : ""}
        >
          <DeleteCoffeeDrinkContext.Provider value={deleteCoffeeDrink}>
            <div className="coffee-drinks-board-map-wrapper">
              {drinks &&
                drinks.map((drink) => (
                  <CoffeeDrinkCard drink={drink} key={drink._id} />
                ))}
            </div>
            {showInfitescroll && <LoadingCircle />}
          </DeleteCoffeeDrinkContext.Provider>
        </Container>
      </SlideToReload>
    </>
  );
};

export { CoffeeDrinksBoard, DeleteCoffeeDrinkContext };
