import { CardWithMedia } from "../../CardWithMedia/CardWithMedia";

import { UserPostHeader } from "../../UserPostHeader/UserPostHeader";
import { CoffeeDrinkCardContent } from "../CoffeeDrinkCardContent/CoffeeDrinkCardContent";
import { useLoadImageUrl } from "../../useLoadImageUrl/useLoadImageUrl";
import { useState } from "react";
import { CoffeeDrinkMoreMenu } from "../CoffeeDrinkMoreMenu/CoffeeDrinkMoreMenu";

import { Drink } from "../../../client";

type Props = {
  drink: Drink;
};

const CoffeeDrinkCard = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  // const [showEditCoffeeModal, setShowEditCoffeeModal] =
  //     useState<boolean>(false);

  const [coffeeDrinkImageUrl, _, _updateImageUrl] = useLoadImageUrl(
    `/api/v1/drinks/${props.drink._id}/image`,
    setLoading,
    true,
  );

  // const toggleShowEditCoffeeModal = () => {
  //     console.log("toggleShowEditCoffeeModal");
  //     if (showMoreMenu) {
  //         setShowMoreMenu(false);
  //     }

  //     setShowEditCoffeeModal(!showEditCoffeeModal);
  //     };

  const toggleMoreMenuVisibility = () => {
    console.log("toggleMoreMenuVisibility");
    setShowMoreMenu(!showMoreMenu);
  };

  return (
    <CardWithMedia
      cardContent={<CoffeeDrinkCardContent drink={props.drink} />}
      loading={loading}
      imageURL={coffeeDrinkImageUrl}
      header={
        <UserPostHeader
          username={props.drink.user_name}
          uuid={props.drink._id}
          rightSideContent={
            <CoffeeDrinkMoreMenu
              coffeeDrink={props.drink}
              toggleMoreMenuVisibility={toggleMoreMenuVisibility}
              showMoreMenu={showMoreMenu}
              toggleShowEditCoffeeModal={() => {}}
            />
          }
        />
      }
    />
  );
};

export { CoffeeDrinkCard };
