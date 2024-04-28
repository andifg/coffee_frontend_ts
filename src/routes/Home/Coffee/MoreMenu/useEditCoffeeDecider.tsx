import { useEffect, useState } from "react";
import { Coffee } from "../../../../client";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";

interface useEditCoffeeDeciderProps {
  coffee: Coffee;
}

export default function useEditCoffeeDecider(
  props: useEditCoffeeDeciderProps,
): [boolean] {
  const [allowEdit, setAllowEdit] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    console.log("Calulating allowEdit");
    if (user.userRole === "Admin" || props.coffee.owner_id === user.userId) {
      setAllowEdit(true);
    }
  }, [user, props.coffee.owner_id]);

  return [allowEdit];
}
