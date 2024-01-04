import React, { useState } from "react";

import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";

import useCoffeeRatingAdd from "../../../hooks/useCoffeeRatingAdd";

interface Props {
  coffee_id: string;
  initialRating: number;
  initialRatingCount: number;
}

const CoffeeRating: React.FunctionComponent<Props> = (props: Props) => {
  const [showAddRatingStars, setShowAddRatingStars] = useState<boolean>(false);

  const [
    currentRating,
    ratingAverage,
    ratingCount,
    setCurrentRating,
    addRatingtoCoffee,
    error,
  ] = useCoffeeRatingAdd(props, setShowAddRatingStars);

  return (
    <>
      <Container
        sx={{ bgcolor: "primary.light" }}
        className="card-content-wrapper"
      >
        <div className="card-content-rating-summary">
          <StarIcon
            sx={{ color: "primary.main", marginRight: "2px" }}
          ></StarIcon>
          <Typography variant="h6" component="div">
            {Math.round(ratingAverage * 10) / 10}
          </Typography>
        </div>
        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
          {ratingCount} ratings{" "}
        </div>
      </Container>
      {showAddRatingStars && (
        <div className="card-content-box">
          {" "}
          <Rating
            name="half-rating"
            sx={{ color: "primary.main", marginRight: "4px" }}
            value={currentRating}
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
          <IconButton
            color="primary"
            onClick={addRatingtoCoffee}
            aria-label="save"
            sx={{ padding: "3px" }}
          >
            {" "}
            <SaveAltIcon />{" "}
          </IconButton>{" "}
          <IconButton
            color="warning"
            onClick={() => setShowAddRatingStars(false)}
            aria-label="abort"
            sx={{ padding: "3px" }}
          >
            {" "}
            <CloseOutlinedIcon />{" "}
          </IconButton>{" "}
        </div>
      )}
      {!showAddRatingStars && (
        <div className="card-content-box">
          {" "}
          <Button
            size="large"
            color="primary"
            onClick={() => setShowAddRatingStars(true)}
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
