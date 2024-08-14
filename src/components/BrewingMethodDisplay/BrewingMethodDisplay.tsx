import "./BrewingMethodDisplay.scss";
import { EspressoCupIcon } from "../../icons/EspressoCupIcon";

type BrewingMethodDisplayProps = {
  brewingMethod: string;
};

const BrewingMethodDisplay = (props: BrewingMethodDisplayProps) => {
  return (
    <div className="brewing-method-display">
      <div className="brewing-method-display-icon">
        <EspressoCupIcon stroke="black" />
      </div>

      <div className="brewing-method-display-brewing-method">
        {props.brewingMethod}
      </div>
    </div>
  );
};

export { BrewingMethodDisplay };
