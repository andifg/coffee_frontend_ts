import "./HeaderBar.scss";
import { Grid } from "@mui/material";
// import Divider from "@mui/material/Divider";

interface Props {
  navbarLeft?: JSX.Element;
  navbarCenter?: JSX.Element;
  navbarRight?: JSX.Element;
}

const HeaderBar = (props: Props) => {
  return (
    <>
      <div>
        <Grid
          container
          className="navbar"
          sx={{
            minHeight: "46px",
            backgroundColor: "white",
            borderBottom: "0.5px solid",
          }}
        >
          <Grid className="navbar-left" item xs={3}>
            {props.navbarLeft}
          </Grid>
          <Grid className="navbar-center" item xs={6}>
            {props.navbarCenter}
          </Grid>
          <Grid className="navbar-right" item xs={3}>
            {props.navbarRight}
          </Grid>
        </Grid>
      </div>
      {/* <Divider className="divider" sx={{ bgcolor: "primary.main" }} /> */}
    </>
  );
};
export default HeaderBar;
