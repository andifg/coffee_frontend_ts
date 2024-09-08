import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { CreateDrink } from "../../client";

const AddDrinkToCoffeeBeanContext = createContext<{
  addDrinkToCoffeeCallback: (drink: CreateDrink) => void | undefined;
  setCallbackForAddDrinkToCoffee: Dispatch<SetStateAction<() => void>>;
}>({
  addDrinkToCoffeeCallback: () => {},
  setCallbackForAddDrinkToCoffee: () => undefined,
});

const AddDrinkToCoffeeBeanCallback: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [callback, setCallback] = React.useState(() => () => {});

  return (
    <AddDrinkToCoffeeBeanContext.Provider
      value={{
        addDrinkToCoffeeCallback: callback,
        setCallbackForAddDrinkToCoffee: setCallback,
      }}
    >
      {children}
    </AddDrinkToCoffeeBeanContext.Provider>
  );
};

export { AddDrinkToCoffeeBeanContext, AddDrinkToCoffeeBeanCallback };
