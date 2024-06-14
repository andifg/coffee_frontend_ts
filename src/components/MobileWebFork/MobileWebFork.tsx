import { useMediaQuery } from "@mui/material";
import theme from "../../theme";

interface Props {
  mobileChild: JSX.Element;
  webChild: JSX.Element;
}

const MobileWebFork = (props: Props) => {
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return <>{matches ? props.webChild : props.mobileChild}</>;
};

export { MobileWebFork };
