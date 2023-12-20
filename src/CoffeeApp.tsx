import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { Grid } from "@mui/material";

import Router from "./routes/Router";
import { OpenAPI } from "./client";

const CoffeeApp = () => {
  const auth = useAuth();

  const getUserToken = async () => {
    return auth.user?.access_token || "";
  };

  OpenAPI.TOKEN = getUserToken;

  useEffect(() => {
    console.log("Auth event changed" + auth.events);
    return auth.events.addUserUnloaded(() => {
      console.log("User logged out " + Date.now());
    });
  }, [auth.events, auth.removeUser]);

  useEffect(() => {
    console.log(auth);

    if (auth.activeNavigator) {
      console.log("Active navigator");
      console.log(auth.activeNavigator);
    }

    if (!auth.user && !auth.isLoading && window.location.pathname != "/") {
      console.log("User not logged in");
      console.log(auth);

      window.location.href = "/";
    }
  }, [auth]);

  return (
    <Grid container sx={{ justifyContent: "center", alignContent: "center" }}>
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

export default CoffeeApp;
