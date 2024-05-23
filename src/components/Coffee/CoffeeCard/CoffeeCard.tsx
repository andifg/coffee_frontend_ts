import "./CoffeeCard.scss";
import React, { useState, createContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Coffee as CoffeeSchema } from "../../../client";

import { CoffeeSkeleton } from "../CoffeeSkeleton/CoffeeSkeleton";
import { CoffeeRating } from "../CoffeeRating/CoffeeRating";
import { CoffeeEditModal } from "../CoffeeEditModal/CoffeeEditModal";
import useLoadImageURL from "./useLoadImage";
import CoffeeHeader from "../CoffeeHeader/CoffeeHeader";

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
                borderColor: "primary.light",
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
                sx={{ objectFit: "contain" }}
              />
              <CardContent className="card-content">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "text.primary" }}
                >
                  {props.coffee?.name}
                </Typography>
                <CoffeeRating
                  coffee_id={props.coffee._id}
                  initialRating={props.coffee.rating_average || 0}
                  initialRatingCount={props.coffee.rating_count || 0}
                />
              </CardContent>
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
