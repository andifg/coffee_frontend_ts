import { CardWithMedia } from "../../CardWithMedia/CardWithMedia";
// import { useState } from "react";

import { UserPostHeader } from "../../UserPostHeader/UserPostHeader";
import { CoffeeDrinkCardContent } from "../CoffeeDrinkCardContent/CoffeeDrinkCardContent";

import { Rating as CoffeeDrink } from "../../../client";

type Props = {
  coffeeDrink: CoffeeDrink;
};

const CoffeeDrinkCard = (props: Props) => {
  // const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  // const [showEditCoffeeModal, setShowEditCoffeeModal] =
  //     useState<boolean>(false);

  // const toggleShowEditCoffeeModal = () => {
  //     console.log("toggleShowEditCoffeeModal");
  //     if (showMoreMenu) {
  //         setShowMoreMenu(false);
  //     }

  //     setShowEditCoffeeModal(!showEditCoffeeModal);
  //     };

  //     const toggleMoreMenuVisibility = () => {
  //     console.log("toggleMoreMenuVisibility");
  //     setShowMoreMenu(!showMoreMenu);
  //     };

  return (
    <CardWithMedia
      cardContent={<CoffeeDrinkCardContent coffeeDrink={props.coffeeDrink} />}
      header={
        <UserPostHeader
          username={props.coffeeDrink.user_name}
          uuid={props.coffeeDrink._id}
          rightSideContent={<></>}
        />
      }
      imageFetchUrl={`/api/v1/coffee-drink/${props.coffeeDrink._id}/image`}
    />
  );
};

export { CoffeeDrinkCard };
