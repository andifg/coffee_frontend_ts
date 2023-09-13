import React from "react";
import { useState, useEffect } from "react";
import Coffee from "./Coffee/Coffee";
import { Divider } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/index";
import { fetchCoffeeIds } from "../../redux/CoffeeIdsReducer";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

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
      <Divider
        style={{
          marginTop: "2px",
          marginBottom: "3px",
          backgroundColor: "#edd9cc",
        }}
      />
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
    </>
  );
};

export default Board;
