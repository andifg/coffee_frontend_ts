import AddIcon from "./AddIcon";
import AvatarMenu from "./AvatarMenu";
import HeaderBar from "../Common/HeaderBar";

const HomeHeaderBar = () => {
  return (
    <div>
      {/* <Grid container className="navbar">
          <Grid className="navbar-left" item xs={3}>
            <AddIcon />
          </Grid>
          <Grid item xs={6}>
            <img
              style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
              src="/logo-no-background.png"
            />
          </Grid>
          <Grid className="navbar-right" item xs={3}>
            <AvatarMenu />
          </Grid>
        </Grid> */}

      <HeaderBar navbarLeft={<AddIcon />} navbarRight={<AvatarMenu />} />
    </div>
  );
};
export default HomeHeaderBar;
