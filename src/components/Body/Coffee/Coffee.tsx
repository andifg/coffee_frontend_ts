import React, { useState, useEffect } from "react";
import {
  CoffeesService,
  Coffee as CoffeeSchema,
  RatingSummary,
} from "../../../client";
import { RatingsService } from "../../../client";
import CardHeader from "@mui/material/CardHeader";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import CoffeeSkeleton from "./CoffeeSkeleton";
import CoffeeRating from "./CoffeeRating";

import MoreMenu from "./MoreButton";

interface Props {
  coffee_id: string;
  editCoffee: boolean;
  seteditCoffee: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [error, setError] = useState<string | null>(null);
  const [initalRatingSummary, setInitialRatingSummary] =
    useState<RatingSummary>(emptyRatingSummary);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Reload number: " + props.reload);
        const coffee =
          await CoffeesService.getCoffeeByIdApiV1CoffeesCoffeeIdGet(
            props.coffee_id,
          );

        const ratingSummary =
          await RatingsService.getCoffeesRatingSummaryApiV1CoffeesCoffeeIdRatingSummaryGet(
            props.coffee_id,
          );
        setInitialRatingSummary(ratingSummary);

        setData(coffee);
        props.childrenLoaded(coffee._id);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
          console.log(error);
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
              action={<MoreMenu coffee_id={props.coffee_id} />}
            />
            <CardMedia
              component="img"
              alt="green iguana"
              height="300"
              image="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
        </div>
      )}
    </>
  );
};

export default Coffee;
