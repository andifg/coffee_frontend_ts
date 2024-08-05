import { CardWithMedia } from "../../CardWithMedia/CardWithMedia";

import { UserPostHeader } from "../../UserPostHeader/UserPostHeader";
import { CoffeeDrinkCardContent } from "../CoffeeDrinkCardContent/CoffeeDrinkCardContent";
import { useLoadImageUrl } from "../../useLoadImageUrl/useLoadImageUrl";
import { useState } from "react";
import { CoffeeDrinkMoreMenu } from "../CoffeeDrinkMoreMenu/CoffeeDrinkMoreMenu";

import { Rating as CoffeeDrink } from "../../../client";

type Props = {
  coffeeDrink: CoffeeDrink;
};

const CoffeeDrinkCard = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  // const [showEditCoffeeModal, setShowEditCoffeeModal] =
  //     useState<boolean>(false);

  const [coffeeDrinkImageUrl, _, _updateImageUrl] = useLoadImageUrl(
    `/api/v1/coffee-drink/${props.coffeeDrink._id}/image`,
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
      cardContent={<CoffeeDrinkCardContent coffeeDrink={props.coffeeDrink} />}
      loading={loading}
      imageURL={coffeeDrinkImageUrl}
      header={
        <UserPostHeader
          username={props.coffeeDrink.user_name}
          uuid={props.coffeeDrink._id}
          rightSideContent={
            <CoffeeDrinkMoreMenu
              coffeeDrink={props.coffeeDrink}
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
