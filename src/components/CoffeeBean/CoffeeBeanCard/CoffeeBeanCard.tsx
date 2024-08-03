import "./CoffeeBeanCard.scss";
import React, { useState, createContext } from "react";

import { Coffee as CoffeeSchema } from "../../../client";

import { CoffeeBeanEditModal } from "../CoffeeBeanEditModal/CoffeeBeanEditModal";
import { useLoadImageUrl } from "../../useLoadImageUrl/useLoadImageUrl";
import { CoffeeBeanHeader } from "../CoffeeBeanHeader/CoffeeBeanHeader";
import { CoffeeBeanCardContent } from "./CoffeeBeanCardContent";
import { CardWithMedia } from "../../CardWithMedia/CardWithMedia";

const UpdateCoffeeImageContext = createContext<(image: File) => void>(() => {});

interface Props {
  coffee: CoffeeSchema;
}

const CoffeeBeanCard: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const [showEditCoffeeModal, setShowEditCoffeeModal] =
    useState<boolean>(false);

  const [coffeeImageURL, _, updateImageUrl] = useLoadImageUrl(
    `/api/v1/coffees/${props.coffee._id}/image`,
    setLoading,
    true,
  );

  const toggleShowEditCoffeeModal = () => {
    console.log("toggleShowEditCoffeeModal");
    if (showMoreMenu) {
      setShowMoreMenu(false);
    }

    setShowEditCoffeeModal(!showEditCoffeeModal);
  };

  const toggleMoreMenuVisibility = () => {
    console.log("toggleMoreMenuVisibility");
    setShowMoreMenu(!showMoreMenu);
  };

  return (
    <CardWithMedia
      loading={loading}
      imageURL={coffeeImageURL}
      header={
        <CoffeeBeanHeader
          coffee={props.coffee}
          toggleMoreMenuVisibility={toggleMoreMenuVisibility}
          toggleShowEditCoffeeModal={toggleShowEditCoffeeModal}
          showMoreMenu={showMoreMenu}
          coffee_owner_name={props.coffee.owner_name}
        />
      }
      cardContent={
        <>
          <CoffeeBeanCardContent coffee={props.coffee} />
          <UpdateCoffeeImageContext.Provider value={updateImageUrl}>
            <CoffeeBeanEditModal
              open={showEditCoffeeModal}
              closeModal={toggleShowEditCoffeeModal}
              initalCoffee={props.coffee}
              initalCoffeeImageURL={coffeeImageURL}
            />
          </UpdateCoffeeImageContext.Provider>
        </>
      }
    />
  );
};

export { CoffeeBeanCard, UpdateCoffeeImageContext };
