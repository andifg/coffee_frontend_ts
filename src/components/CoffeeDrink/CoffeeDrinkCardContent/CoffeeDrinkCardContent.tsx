import "./CoffeeDrinkCardContent.scss";
import { Drink } from "../../../client";
import { RatingDisplay } from "../../RatingDisplay/RatingDisplay";
import { CoffeeBeanDisplay } from "../../CoffeeBeanDisplay/CoffeeBeanDisplay";
import { BrewingMethodDisplay } from "../../BrewingMethodDisplay/BrewingMethodDisplay";

interface Props {
  drink: Drink;
}

const CoffeeDrinkCardContent = (props: Props) => {
  return (
    <>
      <div className="coffee-drink-card-content">
        <CoffeeBeanDisplay
          coffeeBeanName={props.drink.coffee_bean_id ? "Coffee Bean Name" : ""}
          roastingCompany={props.drink.coffee_bean_id ? "Roasting Company" : ""}
        />
        <div>
          <RatingDisplay rating={props.drink.rating} />
        </div>
      </div>
      {props.drink.brewing_method && (
        <div className="coffee-drink-card-brewing-method-display">
          <BrewingMethodDisplay brewingMethod={props.drink.brewing_method} />
        </div>
      )}
      <div className="coffee-card-content-footer"></div>
    </>
  );
};

export { CoffeeDrinkCardContent };
