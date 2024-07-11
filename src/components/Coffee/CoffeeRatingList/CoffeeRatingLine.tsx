import "./CoffeeRatingLine.scss";
import theme from "../../../theme";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "../../../client";

interface Props {
  rating: Rating;
}

const CoffeeRatingLine = (props: Props) => {
  return (
    <div
      className="coffee-rating-line-wrapper"
      style={{ color: theme.palette.secondary.main }}
    >
      <div className="coffee-rating-line-username">
        {props.rating.user_name}
      </div>
      <div className="coffee-rating-line-brewing-method">
        {props.rating.brewing_method}
      </div>
      <div className="coffee-rating-line-rating">
        <StarIcon />
        {props.rating.rating}
      </div>
      <img
        src="./rating-image.jpg"
        alt="avatar"
        className="coffee-rating-line-image"
      />
    </div>
  );
};

export { CoffeeRatingLine };
