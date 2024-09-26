import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { Drink as DrinkSchema } from "../../client";

const AddDrinkCallbackContext = createContext<{
  addDrinkCallback: (drink: DrinkSchema) => void | undefined;
  setCallback: Dispatch<SetStateAction<() => void>>;
}>({ addDrinkCallback: () => {}, setCallback: () => undefined });

const AddDrinkCallback: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [callback, setCallback] = React.useState(() => () => {});

  return (
    <AddDrinkCallbackContext.Provider
      value={{ addDrinkCallback: callback, setCallback: setCallback }}
    >
      {children}
    </AddDrinkCallbackContext.Provider>
  );
};

export { AddDrinkCallback, AddDrinkCallbackContext };
