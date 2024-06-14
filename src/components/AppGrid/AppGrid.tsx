import { Grid } from "@mui/material";
import Router from "../../routes/Router";
import useAuthWrapper from "./useAuthWrapper";

const AppGrid = () => {
  useAuthWrapper();

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "secondary.light",
      }}
    >
      <Grid
        item
        sx={{ position: "relative" }}
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
      >
        <Router />
      </Grid>
    </Grid>
  );
};

export { AppGrid };
