import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Coffee from "./Coffee/Coffee";
// import { Divider } from "antd";
import Divider from "@mui/material/Divider";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/index";
import { fetchCoffeeIds } from "../../redux/CoffeeIdsReducer";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import SlideToReload from "./SlideToReload";
import Container from "@mui/material/Container";
import { setRecursiveLoading } from "../../redux/GeneralConfigReducer";

const Board: React.FC = () => {
  const [editCoffee, seteditCoffee] = useState(false);
  const [reload, setReload] = useState<number>(0);

  const childrenLoadedCount = useRef(0);

  const dispatch = useDispatch<AppDispatch>();
  const CoffeeIds = useSelector(
    (state: RootState) => state.coffeeIds.coffeeIds,
  );
  const globalReload = useSelector(
    (state: RootState) => state.generalConfig.realoadCount,
  );

  const childrenLoaded = (id: string) => {
    childrenLoadedCount.current += 1;
    console.log(
      "children loaded " +
        id +
        " " +
        childrenLoadedCount.current +
        " " +
        CoffeeIds.length,
    );

    if (childrenLoadedCount.current === CoffeeIds.length) {
      console.log("all children loaded");
      childrenLoadedCount.current = 0;

      // setRecursiveLoading(false);
      dispatch(setRecursiveLoading(false));
      console.log("Self already loaded and all children loaded");
    }
  };

  useEffect(() => {
    async function fetch() {
      console.log("Load coffee ids");
      await dispatch(fetchCoffeeIds());
      console.log("New coffee length " + CoffeeIds.length);
      setReload((prev) => prev + 1);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalReload]);

  return (
    <>
      <Divider className="divider" sx={{ bgcolor: "primary.main" }} />
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
                  seteditCoffee={seteditCoffee}
                  editCoffee={editCoffee}
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
