import React, { useState, useEffect } from "react";
import {
  CoffeesService,
  Coffee as CoffeeSchema,
  RatingSummary,
} from "../../../client";
import { RatingsService } from "../../../client";
import CardHeader from "@mui/material/CardHeader";
import { useAuth } from "react-oidc-context";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import CoffeeSkeleton from "./CoffeeSkeleton";
import CoffeeRating from "./CoffeeRating";

import MoreMenu from "./MoreButton";
import EditCoffeeModal from "./EditCoffeeModal";

import useLoadImageURL from "../../../hooks/useLoadImage";

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

  const auth = useAuth();

  const loadCoffee = async () => {
    const coffee = await CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet(
      props.coffee_id,
    );

    setData(coffee);
  };

  const loadRatingSummary = async () => {
    const ratingSummary =
      await RatingsService.getCoffeesRatingSummaryApiV1CoffeesCoffeeIdRatingSummaryGet(
        props.coffee_id,
      );

    setInitialRatingSummary(ratingSummary);
  };

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
      try {
        await fetchImageURL();

        console.log("Reload number: " + props.reload);

        await loadCoffee();

        await loadRatingSummary();

        props.childrenLoaded(props.coffee_id);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log("Error during fetch of coffee");
          console.log(e.message);

          if (e.message === "Unauthorized") {
            console.log("UnauthorizedApiException");
            auth.removeUser();
          }
        }
        if (e === "Unauthorized") {
          console.log("UnauthorizedApiException");
          auth.removeUser();
        }
      } finally {
        setLoading(false);
      }
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
