import "./CoffeeCardContent.scss";
import { Coffee as CoffeeSchema } from "../../../client";
import EspressoCup from "../../../assets/espresso-cup.svg";
import theme from "../../../theme";
import { Rating } from "@mui/material";
import { ButtonBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { CoffeeRatingList } from "../CoffeeRatingList/CoffeeRatingList";
import { useState } from "react";

interface Props {
  coffee: CoffeeSchema;
}

const CoffeeCardContent = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showCoffeeRatingList, setShowCoffeeRatingList] = useState(false);

  const changePathForAddRating = () => {
    console.log("changePathForAddRating");
    setShowCoffeeRatingList(false);
    navigate(
      `${location.pathname}/add-rating?coffeeId=${props.coffee._id}&coffeeName=${props.coffee.name}&roastingCompany=${props.coffee.roasting_company}`,
    );
  };

  const toggleShowCoffeeRatingList = () => {
    setShowCoffeeRatingList(!showCoffeeRatingList);
  };

  return (
    <>
      <div className="coffee-card-content-wrapper">
        <div className="coffee-card-content-names-and-rating-wrapper">
          <div className="coffee-card-content-names-and-rating-child">
            <div className="coffee-card-content-names">
              <div className="coffee-card-content-names-coffee-name">
                {props.coffee.name}
              </div>
              <div
                style={{ color: theme.palette.secondary.main }}
                className="coffee-card-content-names-roasting-company"
              >
                {props.coffee.roasting_company}
              </div>
            </div>
          </div>
          <div className="coffee-card-content-names-and-rating-child">
            <div className="coffee-card-content-rating-wrapper">
              <div className="coffee-card-content-rating">
                <Rating
                  name="simple-controlled"
                  value={props.coffee.rating_average || 0}
                  precision={0.5}
                  sx={{ color: "primary.main", fontSize: "1.5rem" }}
                  disabled={true}
                />
                <div className="coffee-card-content-rating-average-text">
                  {Math.round((props.coffee.rating_average || 0) * 10) / 10}
                </div>
              </div>
              <div className="coffee-card-content-rating-length">
                {props.coffee.rating_count || 0} ratings
              </div>
            </div>
          </div>
        </div>
        <div className="coffee-card-content-footer">
          <ButtonBase onClick={changePathForAddRating}>
            <img
              src={EspressoCup}
              className="coffee-card-content-footer-add-rating"
              alt="star"
              style={{ color: theme.palette.primary.main, height: "32px" }}
            />
          </ButtonBase>
          <IconButton
            onClick={toggleShowCoffeeRatingList}
            aria-label="show-ratings"
            disabled={props.coffee.rating_count === 0}
          >
            {showCoffeeRatingList ? (
              <ExpandLessIcon
                sx={{
                  fontSize: "32px",
                  color:
                    props.coffee.rating_count === 0
                      ? "secondary.main"
                      : "primary.main",
                }}
              />
            ) : (
              <ExpandMoreIcon
                sx={{
                  fontSize: "32px",
                  color:
                    props.coffee.rating_count === 0
                      ? "secondary.main"
                      : "primary.main",
                }}
              />
            )}
          </IconButton>
        </div>
      </div>
      {showCoffeeRatingList && <CoffeeRatingList coffee={props.coffee} />}
    </>
  );
};

export { CoffeeCardContent };
