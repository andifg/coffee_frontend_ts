import "./CoffeeBeanCardContent.scss";
import { Coffee as CoffeeSchema } from "../../../client";
import { EspressoCupIcon } from "../../../icons/EspressoCupIcon";
import theme from "../../../theme";
import { ButtonBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { CoffeeRatingList } from "../CoffeeBeanRatingList/CoffeeBeanRatingList";
import { useState } from "react";
import { RatingDisplay } from "../../RatingDisplay/RatingDisplay";
import { CoffeeBeanDisplay } from "../../CoffeeBeanDisplay/CoffeeBeanDisplay";

interface Props {
  coffee: CoffeeSchema;
}

const CoffeeBeanCardContent = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showCoffeeRatingList, setShowCoffeeRatingList] = useState(false);

  const changePathForAddRating = () => {
    console.log("changePathForAddRating");
    setShowCoffeeRatingList(false);
    navigate(
      `${location.pathname}/add-rating?coffeeId=${props.coffee._id}&coffeeName=${props.coffee.name}&coffeeBeanOwner=${props.coffee.owner_name}&coffeeBeanOwnerId=${props.coffee.owner_id}&roastingCompany=${props.coffee.roasting_company}`,
    );
  };

  const toggleShowCoffeeRatingList = () => {
    setShowCoffeeRatingList(!showCoffeeRatingList);
  };

  return (
    <>
      <div className="coffee-bean-card-content">
        <CoffeeBeanDisplay
          coffeeBeanName={props.coffee.name}
          roastingCompany={props.coffee.roasting_company}
        />
        <div>
          <RatingDisplay
            rating={props.coffee.rating_average || 0}
            ratingCount={props.coffee.rating_count || 0}
          />
        </div>
      </div>
      <div className="coffee-card-content-footer">
        <ButtonBase onClick={changePathForAddRating}>
          <div className="coffee-card-content-footer-add-rating">
            <EspressoCupIcon stroke={theme.palette.primary.main} />
          </div>
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
      {showCoffeeRatingList && <CoffeeRatingList coffee={props.coffee} />}
    </>
  );
};

export { CoffeeBeanCardContent };
