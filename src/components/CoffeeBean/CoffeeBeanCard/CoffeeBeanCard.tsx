import "./CoffeeBeanCard.scss";
import React, { useState, createContext } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { Coffee as CoffeeSchema } from "../../../client";

import { CardSkeleton } from "../../CardSkeleton/CardSkeleton";
import { CoffeeBeanEditModal } from "../CoffeeBeanEditModal/CoffeeBeanEditModal";
import { useLoadImageUrl } from "../../useLoadImageUrl/useLoadImageUrl";
import { CoffeeBeanHeader } from "../CoffeeBeanHeader/CoffeeBeanHeader";
import { CoffeeBeanCardContent } from "./CoffeeBeanCardContent";

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
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        props.coffee && (
          <div className="coffee-wrapper">
            <Card
              sx={{
                boxShadow: 0,
                borderRadius: 0,
                border: "1px solid",
                borderColor: "secondary.light",
              }}
              className="coffee"
            >
              <CoffeeBeanHeader
                coffee={props.coffee}
                toggleMoreMenuVisibility={toggleMoreMenuVisibility}
                toggleShowEditCoffeeModal={toggleShowEditCoffeeModal}
                showMoreMenu={showMoreMenu}
                coffee_owner_name={props.coffee.owner_name}
              />
              <CardMedia
                component="img"
                alt="Image"
                height="auto"
                key={coffeeImageURL}
                src={
                  coffeeImageURL ||
                  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                }
                sx={{ objectFit: "contain", maxHeight: "600px" }}
              />
              <CoffeeBeanCardContent coffee={props.coffee} />
            </Card>
            <UpdateCoffeeImageContext.Provider value={updateImageUrl}>
              <CoffeeBeanEditModal
                open={showEditCoffeeModal}
                closeModal={toggleShowEditCoffeeModal}
                initalCoffee={props.coffee}
                initalCoffeeImageURL={coffeeImageURL}
              />
            </UpdateCoffeeImageContext.Provider>
          </div>
        )
      )}
    </>
  );
};

export { CoffeeBeanCard, UpdateCoffeeImageContext };
