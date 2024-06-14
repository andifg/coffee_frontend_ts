// import AddIcon from "../../components/AddIcon/AddIcon";
import { Typography } from "@mui/material";
import AvatarMenu from "../../components/AvatarMenu/AvatarMenu";
import HeaderBar from "../../components/HeaderBar/HeaderBar";

const HomeHeaderBar = () => {
  return (
    <div>
      <HeaderBar
        navbarRight={<AvatarMenu />}
        navbarCenter={
          <Typography
            variant="overline"
            sx={{ textAlign: "center", fontSize: "0.85rem" }}
          >
            {"Your Beans & Coffees"}
          </Typography>
        }
      />
    </div>
  );
};
export { HomeHeaderBar };
