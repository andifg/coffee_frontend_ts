import React from "react";
import { useState, useEffect } from "react";
import Coffee from "./Coffee/Coffee";
import { Divider } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/index";
import { fetchCoffeeIds } from "../../redux/CoffeeIdsReducer";

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
    <div className="board-wrapper">
      <div className="board-add-icon">
        {/* <AddModal addCoffee={addCoffee} editCoffee={editCoffee} /> */}
      </div>
      <Divider
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          backgroundColor: "#edd9cc",
        }}
      />
      {CoffeeIds.map((coffee) => (
        <Coffee
          key={coffee}
          coffee_id={coffee}
          seteditCoffee={seteditCoffee}
          editCoffee={editCoffee}
        />
      ))}
    </div>
  );
};

export default Board;
