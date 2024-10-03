import { CoffeeBeanMoreMenu } from "../CoffeeBeanMoreMenu/CoffeeBeanMoreMenu";
import { Coffee } from "../../../client";

import { UserPostHeader } from "../../UserPostHeader/UserPostHeader";

interface CofeeHeaderProps {
  coffee: Coffee;
  coffee_owner_name: string;
  toggleShowEditCoffeeModal: () => void;
  toggleMoreMenuVisibility: () => void;
  showMoreMenu: boolean;
}

const CoffeeBeanHeader = (props: CofeeHeaderProps) => {
  return (
    <UserPostHeader
      rightSideContent={
        <CoffeeBeanMoreMenu
          coffee={props.coffee}
          toggleShowEditCoffeeModal={props.toggleShowEditCoffeeModal}
          toggleMoreMenuVisibility={props.toggleMoreMenuVisibility}
          showMoreMenu={props.showMoreMenu}
        />
      }
      username={props.coffee_owner_name}
      uuid={props.coffee._id}
    />
  );
};

export { CoffeeBeanHeader };
