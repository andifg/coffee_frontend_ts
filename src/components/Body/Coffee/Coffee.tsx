import React, { useState, useEffect } from "react";
import {
  CoffeesService,
  Coffee as CoffeeSchema,
  RatingSummary,
} from "../../../client";
import { deleteCoffeeId } from "../../../redux/CoffeeIdsReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/index";
import { RatingsService } from "../../../client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import CoffeeSkeleton from "./CoffeeSkeleton";
import CoffeeRating from "./CoffeeRating";

interface Props {
  coffee_id: string;
  editCoffee: boolean;
  seteditCoffee: React.Dispatch<React.SetStateAction<boolean>>;
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

  const userRole = useSelector((state: RootState) => state.userRole.userRole);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Use effect executed");
        console.log(`Try fetching data for ${props.coffee_id}`);
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
  }, []);

  const deleteCoffee = async () => {
    console.log("Delete coffee");
    try {
      await CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete(
        props.coffee_id,
      );
      dispatch(deleteCoffeeId(props.coffee_id));
      console.log(`Removed coffee  ${props.coffee_id}`);
    } catch (e) {
      console.log("ERRRIIRRRRRR");
    }
  };

  return (
    <>
      {loading ? (
        <CoffeeSkeleton />
      ) : (
        <div className="coffee-wrapper">
          <Card sx={{ boxShadow: 0 }} className="coffee">
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
            {userRole === "Admin" && (
              <CardActions>
                <IconButton aria-label="delete" onClick={deleteCoffee}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default Coffee;
