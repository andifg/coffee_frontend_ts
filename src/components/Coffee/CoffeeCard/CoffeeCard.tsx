import "./CoffeeCard.scss";
import React, { useState, createContext } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { Coffee as CoffeeSchema } from "../../../client";

import { CoffeeSkeleton } from "../CoffeeSkeleton/CoffeeSkeleton";
import { CoffeeEditModal } from "../CoffeeEditModal/CoffeeEditModal";
import useLoadImageURL from "./useLoadImage";
import CoffeeHeader from "../CoffeeHeader/CoffeeHeader";
import { CoffeeCardContent } from "./CoffeeCardContent";

const UpdateCoffeeImageContext = createContext<(image: File) => void>(() => {});

interface Props {
  coffee: CoffeeSchema;
}

const CoffeeCard: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const [showEditCoffeeModal, setShowEditCoffeeModal] =
    useState<boolean>(false);

  const [coffeeImageURL, updateCoffeeImage] = useLoadImageURL(
    props.coffee._id,
    setLoading,
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
        <CoffeeSkeleton />
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
              <CoffeeHeader
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
              <CoffeeCardContent coffee={props.coffee} />
            </Card>
            <UpdateCoffeeImageContext.Provider value={updateCoffeeImage}>
              <CoffeeEditModal
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

export { CoffeeCard, UpdateCoffeeImageContext };
