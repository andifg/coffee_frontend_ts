import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { Coffee as CoffeeSchema } from "../../client";

const AddCoffeeCallbackContext = createContext<{
  addCoffeeCallback: (coffee: CoffeeSchema) => void | undefined;
  setCallback: Dispatch<SetStateAction<() => void>>;
}>({ addCoffeeCallback: () => {}, setCallback: () => undefined });

const AddCoffeeCallback: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [callback, setCallback] = React.useState(() => () => {});

  return (
    <AddCoffeeCallbackContext.Provider
      value={{ addCoffeeCallback: callback, setCallback: setCallback }}
    >
      {children}
    </AddCoffeeCallbackContext.Provider>
  );
};

export { AddCoffeeCallback, AddCoffeeCallbackContext };
