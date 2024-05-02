import React from "react";
import { useState, useEffect } from "react";

import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import SlideToReload from "./SlideToReload";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";

import Coffee from "../Coffee/CoffeeCard/Coffee";
import { RootState } from "../../../redux/index";
import { setRecursiveLoading } from "../../../redux/GeneralConfigReducer";
import useReloadChildren from "../../../hooks/useReloadChildren";
import useLoadIdsToRedux from "../../../hooks/useLoadIdsToRedux";

const Board: React.FC = () => {
  const [reload, setReload] = useState<number>(0);
  const [fetchCoffeeIdsToRedux] = useLoadIdsToRedux();

  const CoffeeIds = useSelector(
    (state: RootState) => state.coffeeIds.coffeeIds,
  );
  const globalReload = useSelector(
    (state: RootState) => state.generalConfig.realoadCount,
  );

  console.log("DATA NEW was changed " + CoffeeIds?.length || 0, Date.now());

  const [childrenLoaded, resetChildrenLoaded] = useReloadChildren(
    CoffeeIds?.length || 0,
    setRecursiveLoading,
  );

  useEffect(() => {
    async function fetch() {
      await fetchCoffeeIdsToRedux();
      resetChildrenLoaded();
      setReload((prev) => prev + 1);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalReload]);

  return (
    <>
      <SlideToReload>
        <Container
          sx={{ bgcolor: "primary.light" }}
          className={CoffeeIds?.length != 0 ? "board-wrapper" : ""}
        >
          <TransitionGroup>
            {CoffeeIds &&
              CoffeeIds.map((coffee) => (
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
