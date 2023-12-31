import React, { useState, useEffect } from "react";

import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import {
  CoffeesService,
  Coffee as CoffeeSchema,
  RatingSummary,
} from "../../../client";
import { RatingsService } from "../../../client";

import CoffeeSkeleton from "./CoffeeSkeleton";
import CoffeeRating from "./CoffeeRating";
import MoreMenu from "./MoreButton";
import EditCoffeeModal from "./EditCoffeeModal";
import useLoadImageURL from "../../../hooks/useloadImage";
import useClientService from "../../../hooks/useClientService";

interface Props {
  coffee_id: string;
  childrenLoaded: (id: string) => void;
  reload: number;
}

const emptyRatingSummary: RatingSummary = {
  coffee_id: "",
  rating_average: 0,
  rating_count: 0,
};

const Coffee: React.FC<Props> = (props: Props) => {
  const [coffee, setData] = useState<CoffeeSchema>();
  const [loading, setLoading] = useState<boolean>(true);
  const [initalRatingSummary, setInitialRatingSummary] =
    useState<RatingSummary>(emptyRatingSummary);
  const [showMoreMenu, setShowMoreMenu] = React.useState<boolean>(false);
  const [showEditCoffeeModal, setShowEditCoffeeModal] = React.useState(false);
  const [coffeeImageURL, fetchImageURL, updateCoffeeImage] = useLoadImageURL(
    props.coffee_id,
  );

  const [callClientServiceMethod] = useClientService();

  const toggleShowEditCoffeeModal = () => {
    if (showMoreMenu) {
      setShowMoreMenu(false);
    }

    setShowEditCoffeeModal(!showEditCoffeeModal);
  };

  const toggleMoreMenuVisibility = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const updateCoffeeName = (newCoffeeName: string) => {
    setData((prevState) => {
      if (prevState) {
        prevState.name = newCoffeeName;

        return prevState;
      }
      return undefined;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchImageURL();

      setData(
        await callClientServiceMethod(
          CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet,
          props.coffee_id,
        ),
      );

      setInitialRatingSummary(
        await callClientServiceMethod(
          RatingsService.getCoffeesRatingSummaryApiV1CoffeesCoffeeIdRatingSummaryGet,
          props.coffee_id,
        ),
      );

      props.childrenLoaded(props.coffee_id);

      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reload]);

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
