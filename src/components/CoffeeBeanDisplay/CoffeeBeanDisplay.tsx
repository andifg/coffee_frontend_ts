import "./CoffeeBeanDisplay.scss";
import theme from "../../theme";
import UserAvatar from "../UserAvatar/UserAvatar";

type CoffeeBeanProps = {
  coffeeBeanName?: string;
  roastingCompany?: string;
  ownerName?: string;
};

const CoffeeBeanDisplay = (props: CoffeeBeanProps) => {
  return (
    <div className="coffee-bean-display">
      {props.ownerName && (
        <div className="coffee-bean-display-user-avatar">
          <UserAvatar given_name={props.ownerName} />
        </div>
      )}
      <div className="coffee-bean-display-names">
        <div className="coffee-bean-display-bean-name">
          {props.coffeeBeanName}
        </div>
        <div
          style={{ color: theme.palette.secondary.main }}
          className="coffee-bean-display-roasting-company"
        >
          {props.roastingCompany}
        </div>
      </div>
    </div>
  );
};

export { CoffeeBeanDisplay };
