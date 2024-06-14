import "./LoadingCircle.scss";
import React from "react";
import theme from "../../theme";
import { CircularProgress } from "@mui/material";

const LoadingCircle = (): React.JSX.Element => {
  return (
    <div
      className="circular-progress-wrapper"
      style={{ backgroundColor: theme.palette.secondary.light }}
    >
      <CircularProgress
        style={{ color: theme.palette.primary.main }}
        className="circular-progress"
        data-testid="circular-progress"
      />
    </div>
  );
};

export { LoadingCircle };
