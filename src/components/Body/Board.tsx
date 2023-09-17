import React from "react";
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

const Board: React.FC = () => {
  const [editCoffee, seteditCoffee] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const CoffeeIds = useSelector(
    (state: RootState) => state.coffeeIds.coffeeIds,
  );

  useEffect(() => {
    console.log("fetch");
    dispatch(fetchCoffeeIds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Divider className="divider" />
      <SlideToReload>
        <div className="board-wrapper">
          <TransitionGroup>
            {CoffeeIds.map((coffee) => (
              <Collapse key={coffee + "-collapse"}>
                <Coffee
                  key={coffee}
                  coffee_id={coffee}
                  seteditCoffee={seteditCoffee}
                  editCoffee={editCoffee}
                />
              </Collapse>
            ))}
          </TransitionGroup>
        </div>
      </SlideToReload>
    </>
  );
};

export default Board;
