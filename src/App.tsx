import CoffeeApp from "./components/CoffeeApp";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import theme from "./theme";

import { OpenAPI } from "./client";

OpenAPI.BASE = window.env.BACKEND_URL;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid
          container
          sx={{ justifyContent: "center", alignContent: "center" }}
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
            <CoffeeApp />
          </Grid>
        </Grid>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
