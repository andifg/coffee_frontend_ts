import "./CardSkeleton.scss";
import React from "react";
import { Skeleton } from "@mui/material";

const CardSkeleton: React.FunctionComponent = () => {
  return (
    <div className="skeleton-wrapper" data-testid="coffee-skeleton">
      <Skeleton variant="rectangular" height={320} />
      <Skeleton
        variant="text"
        height={120}
        style={{ marginRight: "20%", marginLeft: "20%" }}
      />
    </div>
  );
};

export { CardSkeleton };
