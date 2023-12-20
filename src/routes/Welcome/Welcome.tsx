import { useAuth } from "react-oidc-context";
import Button from "@mui/material/Button";
import HeaderBar from "../../components/HeaderBar";
import { Box } from "@mui/material";

/**
 * Renders the welcome screen component.
 * @returns JSX.Element
 */
const WelcomeScreen = () => {
  const auth = useAuth();

  return (
    <>
      <HeaderBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20vh",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "auto",
            maxHeight: "60%",
            maxWidth: "60%",
            marginBottom: "8px",
          }}
          alt="The house from the offer."
          src="./coffee.jpeg"
        />
        <Button
          variant="outlined"
          className="get-started-button"
          size="large"
          color="primary"
          onClick={() => void auth.signinRedirect()}
        >
          Login / Register
        </Button>
      </div>
    </>
  );
};

export default WelcomeScreen;
