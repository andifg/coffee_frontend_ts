import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { RatingsService } from "../../../client";
import { Rating as RatingSchema } from "../../../client/models/Rating";
import { uuidv7 } from "uuidv7";
interface Props {
  coffee_id: string;
  initialRating: number;
  initialRatingCount: number;
}

const CoffeeRating: React.FunctionComponent<Props> = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [addRating, setAddRating] = useState<boolean>(false);
  const [ratingAverage, setRatingAverage] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState<number>(0);

  useEffect(() => {
    setRatingAverage(props.initialRating);
    setRatingCount(props.initialRatingCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRatingtoCoffee = async () => {
    const uuid = uuidv7();
    const rating: RatingSchema = {
      _id: uuid,
      coffee_id: props.coffee_id,
      rating: currentRating,
    };
    try {
      if (currentRating === 0) {
        return;
      }
      console.log(`Added rating ${currentRating}`);
      await RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost(
        props.coffee_id,
        rating,
      );

      const new_average =
        (ratingAverage * ratingCount + currentRating) / (ratingCount + 1);
      setRatingAverage(new_average);
      setRatingCount(ratingCount + 1);
      setCurrentRating(0);
    } catch (e) {
      console.log(e);
      setError("Not able to add rating");
    }
    setAddRating(false);
  };

  return (
    <>
      <div className="card-content-wrapper">
        <div className="card-content-rating-summary">
          <StarIcon sx={{ color: "#faaf00", marginRight: "2px" }}></StarIcon>
          <Typography variant="h6" component="div">
            {Math.round(ratingAverage * 10) / 10}
          </Typography>
        </div>
        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
          {ratingCount} ratings{" "}
        </div>
      </div>
      {addRating && (
        <div className="card-content-box">
          {" "}
          <Rating
            name="half-rating"
            onChange={(_, newValue) => {
              if (newValue) {
                setCurrentRating(newValue);
              }
            }}
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />{" "}
          <IconButton onClick={addRatingtoCoffee} aria-label="save">
            {" "}
            <SaveAltIcon />{" "}
          </IconButton>{" "}
        </div>
      )}
      {!addRating && (
        <div className="card-content-box">
          {" "}
          <Button
            size="large"
            onClick={() => setAddRating(true)}
            className="add-rating-button"
          >
            Add Rating{" "}
          </Button>{" "}
        </div>
      )}
      {error && (
        <div className="card-content-box">
          {" "}
          <Typography variant="h6" component="div">
            {" "}
            {error}{" "}
          </Typography>{" "}
        </div>
      )}
    </>
  );
};

export default CoffeeRating;
