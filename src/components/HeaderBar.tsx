import { Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

interface Props {
  navbarLeft?: JSX.Element;
  navbarRight?: JSX.Element;
}

const HeaderBar = (props: Props) => {
  return (
    <>
      <div>
        <Grid container className="navbar" sx={{ minHeight: "46px" }}>
          <Grid className="navbar-left" item xs={3}>
            {props.navbarLeft}
          </Grid>
          <Grid item xs={6}>
            <img
              style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
              src="/logo-no-background.png"
            />
          </Grid>
          <Grid className="navbar-right" item xs={3}>
            {props.navbarRight}
          </Grid>
        </Grid>
      </div>
      <Divider className="divider" sx={{ bgcolor: "primary.main" }} />
    </>
  );
};
export default HeaderBar;
