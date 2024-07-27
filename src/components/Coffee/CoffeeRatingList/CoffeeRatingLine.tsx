import "./CoffeeRatingLine.scss";
import theme from "../../../theme";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "../../../client";
import { Story } from "../../Story/Story";
import { useState } from "react";

interface Props {
  rating: Rating;
}

const CoffeeRatingLine = (props: Props) => {
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
      <div className="coffee-rating-image-wrapper">
        {props.rating.image_exists && (
          <img
            src="./rating-image.jpg"
            alt="avatar"
            className="coffee-rating-line-image"
            onClick={() => setTriggerStory(!triggerStory)}
          />
        )}
      </div>

      {triggerStory && <Story close={close} rating={props.rating} />}
    </div>
  );
};

export { CoffeeRatingLine };
