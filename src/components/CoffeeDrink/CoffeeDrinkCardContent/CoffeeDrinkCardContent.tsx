import "./CoffeeDrinkCardContent.scss";
import { Rating as CoffeeDrink } from "../../../client";
import { RatingDisplay } from "../../RatingDisplay/RatingDisplay";
import { CoffeeBeanDisplay } from "../../CoffeeBeanDisplay/CoffeeBeanDisplay";
import { BrewingMethodDisplay } from "../../BrewingMethodDisplay/BrewingMethodDisplay";

interface Props {
  coffeeDrink: CoffeeDrink;
}

const CoffeeDrinkCardContent = (props: Props) => {
  return (
    <>
      <div className="coffee-drink-card-content">
        <CoffeeBeanDisplay
          coffeeBeanName="Café Crema"
          roastingCompany="Martermühle"
        />
        <div>
          <RatingDisplay rating={props.coffeeDrink.rating} />
        </div>
      </div>
      <div className="coffee-drink-card-brewing-method-display">
        <BrewingMethodDisplay
          brewingMethod={props.coffeeDrink.brewing_method}
        />
      </div>
      <div className="coffee-card-content-footer"></div>
    </>
  );
};

export { CoffeeDrinkCardContent };
