import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppGrid } from "./components/AppGrid/AppGrid";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { AuthProvider } from "react-oidc-context";
import { PWAUpdateModal } from "./components/PWAUpdateModal/PWAUpdateModal";
import { WebStorageStateStore } from "oidc-client-ts";
import { OpenAPI } from "./client";
import { Link } from "react-router-dom";

OpenAPI.BASE = window.env?.BACKEND_URL || "http://localhost:3000";

const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const signoutRedirect = (): void => {
  <Link to={`/`}>Get Started</Link>;
};

const oidcConfig = {
  authority: window.env?.AUTH_URL,
  client_id: "react-app",
  redirect_uri: window.location + "/drinks",
  onSigninCallback: onSigninCallback,
  automaticSilentRenew: true,
  onSignoutRedirect: signoutRedirect,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  scope: "openid roles address",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthProvider {...oidcConfig}>
          <Provider store={store}>
            <AppGrid />
            <PWAUpdateModal />
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
