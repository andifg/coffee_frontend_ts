import React, { useState } from "react";

import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CoffeeSkeleton from "./CoffeeSkeleton";
import { CoffeeRating } from "./CoffeeRating";
import MoreMenu from "./MoreButton";
import EditCoffeeModal from "./EditCoffeeModal";
import { useCoffeeData } from "../../../hooks/useCoffeeData";

interface Props {
  coffee_id: string;
  childrenLoaded: () => void;
  reload: number;
}

const Coffee: React.FC<Props> = (props: Props) => {
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const [showEditCoffeeModal, setShowEditCoffeeModal] = useState(false);

  const [
    coffee,
    loading,
    coffeeImageURL,
    initalRatingSummary,
    updateCoffeeName,
    updateCoffeeImage,
  ] = useCoffeeData(props);

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
            <CardHeader
              sx={{ padding: "0px" }}
              action={
                <MoreMenu
                  coffee_id={props.coffee_id}
                  toggleShowEditCoffeeModal={toggleShowEditCoffeeModal}
                  toggleMoreMenuVisibility={toggleMoreMenuVisibility}
                  showMoreMenu={showMoreMenu}
                />
              }
            />
            <CardMedia
              component="img"
              alt="Image"
              height="auto"
              src={
                coffeeImageURL ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
              sx={{ objectFit: "contain" }}
            />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="div">
                {coffee?.name}
              </Typography>
              <CoffeeRating
                coffee_id={props.coffee_id}
                initialRating={initalRatingSummary.rating_average}
                initialRatingCount={initalRatingSummary.rating_count}
              />
            </CardContent>
          </Card>
          <EditCoffeeModal
            open={showEditCoffeeModal}
            closeModal={toggleShowEditCoffeeModal}
            initalCoffeeName={coffee?.name ? coffee.name : ""}
            initalCoffeeImageURL={coffeeImageURL}
            coffee_id={props.coffee_id}
            updateCoffeeName={updateCoffeeName}
            updateCoffeeImage={updateCoffeeImage}
          />
        </div>
      )}
    </>
  );
};

export default Coffee;
