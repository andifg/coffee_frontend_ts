import "./CoffeeHeader.scss";

import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";

import { CoffeeMoreMenu } from "../CoffeeMoreMenu/CoffeeMoreMenu";
import UserAvatar from "../../UserAvatar/UserAvatar";
import Typography from "@mui/material/Typography";
import { Coffee } from "../../../client";

interface CofeeHeaderProps {
  coffee: Coffee;
  coffee_owner_name: string;
  toggleShowEditCoffeeModal: () => void;
  toggleMoreMenuVisibility: () => void;
  showMoreMenu: boolean;
}

const CoffeeHeader = (props: CofeeHeaderProps) => {
  return (
    <CardContent
      sx={{ padding: "0px", paddingTop: "4px", paddingBottom: "4px" }}
    >
      <Grid container>
        <Grid className="coffee-header-left" xs={1}>
          <UserAvatar given_name={props.coffee_owner_name} />
        </Grid>
        <Grid className="coffee-header-middle" xs={9}>
          <Typography
            variant="body1"
            component="div"
            sx={{ color: "primary.main" }}
          >
            {props.coffee_owner_name}
          </Typography>
        </Grid>
        <Grid className="coffee-header-right" xs={2}>
          <CoffeeMoreMenu
            coffee={props.coffee}
            toggleShowEditCoffeeModal={props.toggleShowEditCoffeeModal}
            toggleMoreMenuVisibility={props.toggleMoreMenuVisibility}
            showMoreMenu={props.showMoreMenu}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CoffeeHeader;
