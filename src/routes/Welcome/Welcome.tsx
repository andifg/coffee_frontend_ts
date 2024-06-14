import "./welcome.scss";
import { useAuth } from "react-oidc-context";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

/**
 * Renders the welcome screen component.
 * @returns JSX.Element
 */
const WelcomeScreen = () => {
  const auth = useAuth();

  return (
    <>
      <Box className="welcome-container">
        <div className="welcome-text-wrapper">
          <Typography
            variant="h5"
            className="welcome-text"
            sx={{ color: "white", marginBottom: "20px" }}
          >
            Good Coffee, Good Taste
          </Typography>
          <Button
            variant="contained"
            className="get-started-button"
            size="large"
            color="primary"
            onClick={() => void auth.signinRedirect()}
          >
            Login / Register
          </Button>
        </div>
      </Box>
    </>
  );
};

export default WelcomeScreen;
