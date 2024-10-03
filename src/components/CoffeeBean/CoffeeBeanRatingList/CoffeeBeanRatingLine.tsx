import "./CoffeeBeanRatingLine.scss";
import theme from "../../../theme";
import StarIcon from "@mui/icons-material/Star";
import { Drink } from "../../../client";
import { Story } from "../../Story/Story";
import { useState } from "react";

interface Props {
  drink: Drink;
}

const CoffeeBeanRatingLine = (props: Props) => {
  const [triggerStory, setTriggerStory] = useState<boolean>(false);

  const close = () => {
    setTimeout(() => {
      setTriggerStory(false);
    }, 10);

    // setTriggerStory(false)
  };

  return (
    <div
      className="coffee-rating-line-wrapper"
      style={{ color: theme.palette.secondary.main }}
    >
      <div className="coffee-rating-line-username">{props.drink.user_name}</div>
      <div className="coffee-rating-line-brewing-method">
        {props.drink.brewing_method}
      </div>
      <div className="coffee-rating-line-rating">
        <StarIcon />
        {props.drink.rating}
      </div>
      <div className="coffee-rating-image-wrapper">
        {props.drink.image_exists && (
          <img
            src="./rating-image.jpg"
            alt="avatar"
            className="coffee-rating-line-image"
            onClick={() => setTriggerStory(!triggerStory)}
          />
        )}
      </div>

      {triggerStory && <Story close={close} drink={props.drink} />}
    </div>
  );
};

export { CoffeeBeanRatingLine };
