import "./CoffeeCardContent.scss";
import { Coffee as CoffeeSchema } from "../../../client";
import EspressoCup from "../../../assets/espresso-cup.svg";
import theme from "../../../theme";
import { Rating } from "@mui/material";
import { ButtonBase } from "@mui/material";

interface Props {
  coffee: CoffeeSchema;
}

const CoffeeCardContent = (props: Props) => {
  return (
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
                {props.coffee.rating_average || 0}
              </div>
            </div>
            <div className="coffee-card-content-rating-length">
              {props.coffee.rating_count || 0} ratings
            </div>
          </div>
        </div>
      </div>
      <div className="coffee-card-content-footer">
        <ButtonBase>
          <img
            src={EspressoCup}
            className="coffee-card-content-footer-add-rating"
            alt="star"
            style={{ color: theme.palette.primary.main, height: "32px" }}
          />
        </ButtonBase>
      </div>
    </div>
  );
};

export { CoffeeCardContent };
