import "./CoffeeBeanRatingList.scss";
import { CoffeeBeanRatingLine } from "./CoffeeBeanRatingLine";

import { useCoffeeRatingList } from "./useCoffeeBeanRatingList";
import theme from "../../../theme";
import { Coffee as CoffeeSchema } from "../../../client";

interface Props {
  coffee: CoffeeSchema;
}

const CoffeeRatingList = (props: Props) => {
  const [ratings, loadNextPage] = useCoffeeRatingList({
    coffee: props.coffee,
  });

  return (
    <div className="coffee-rating-list-wrapper">
      {ratings.map((rating) => (
        <CoffeeBeanRatingLine key={rating._id} rating={rating} />
      ))}

      {ratings.length < (props.coffee.rating_count || 0) && (
        <div
          onClick={loadNextPage}
          className="coffee-rating-list-load-more"
          style={{ color: theme.palette.secondary.main }}
        >
          Load more ratings
        </div>
      )}
    </div>
  );
};

export { CoffeeRatingList };
