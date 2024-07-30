import "./BrewingMethodDisplay.scss";
import theme from "../../theme";
import EspressoCup from "../../assets/espresso-cup-black.svg";

type BrewingMethodDisplayProps = {
  brewingMethod: string;
};

const BrewingMethodDisplay = (props: BrewingMethodDisplayProps) => {
  return (
    <div className="brewing-method-display">
      <img
        src={EspressoCup}
        alt="star"
        style={{
          color: theme.palette.primary.main,
          height: "30px",
          marginRight: "4px",
        }}
      />

      <div className="brewing-method-display-brewing-method">
        {props.brewingMethod}
      </div>
    </div>
  );
};

export { BrewingMethodDisplay };
