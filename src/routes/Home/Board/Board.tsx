import React from "react";
import { useState, useEffect } from "react";
import Coffee from "../Coffee/Coffee";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/index";
import { fetchCoffeeIds } from "../../../redux/CoffeeIdsReducer";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import SlideToReload from "./SlideToReload";
import Container from "@mui/material/Container";
import { setRecursiveLoading } from "../../../redux/GeneralConfigReducer";
import useReloadChildren from "../../../hooks/useReloadChildren";
import { useAuth } from "react-oidc-context";

const Board: React.FC = () => {
  const [reload, setReload] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();

  const CoffeeIds = useSelector(
    (state: RootState) => state.coffeeIds.coffeeIds,
  );
  const globalReload = useSelector(
    (state: RootState) => state.generalConfig.realoadCount,
  );

  console.log("DATA NEW was changed " + CoffeeIds.length, Date.now());

  const [childrenLoaded, resetChildrenLoaded] = useReloadChildren(
    CoffeeIds.length,
    setRecursiveLoading,
  );

  useEffect(() => {
    async function fetch() {
      try {
        await dispatch(fetchCoffeeIds()).unwrap();
        // console.log("New coffee length " + CoffeeIds.length , Date.now());
        resetChildrenLoaded();
        setReload((prev) => prev + 1);
        console.log("Data inside board " + CoffeeIds + " " + Date.now());
      } catch (e) {
        console.log("Error fetching coffee ids " + e);
        if (e === "Unauthorized") {
          console.log("UnauthorizedApiException");
          auth.removeUser();
        }
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalReload]);

  return (
    <>
      <SlideToReload>
        <Container
          sx={{ bgcolor: "primary.light" }}
          className={CoffeeIds.length != 0 ? "board-wrapper" : ""}
        >
          <TransitionGroup>
            {CoffeeIds.map((coffee) => (
              <Collapse key={coffee + "-collapse"}>
                <Coffee
                  key={coffee}
                  coffee_id={coffee}
                  childrenLoaded={childrenLoaded}
                  reload={reload}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </Container>
      </SlideToReload>
    </>
  );
};

export default Board;
