import CoffeeApp from "./CoffeeApp";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "react-oidc-context";
import AppUpdateModal from "./components/AppUpdateModal";

import { OpenAPI } from "./client";
import { Link } from "react-router-dom";

OpenAPI.BASE = window.env.BACKEND_URL;

const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const signoutRedirect = (): void => {
  <Link to={`/`}>Get Started</Link>;
};

const oidcConfig = {
  authority: window.env.AUTH_URL,
  client_id: "react-app",
  redirect_uri: window.location + "/feed",
  onSigninCallback: onSigninCallback,
  automaticSilentRenew: true,
  onSignoutRedirect: signoutRedirect,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider {...oidcConfig} scope="openid roles address">
        <Provider store={store}>
          <CoffeeApp />
          <AppUpdateModal />
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
