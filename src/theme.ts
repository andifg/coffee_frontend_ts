import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#582200",
      light: "#FFA770",
    },
    secondary: {
      light: "#CCCCCC",
      main: "#747474",
    },
    warning: {
      main: "#d74d4d",
      dark: "#A13A3A",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
    },
  },
});

export default theme;
