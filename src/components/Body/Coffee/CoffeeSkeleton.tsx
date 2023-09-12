import React from "react";
import { Skeleton } from "@mui/material";

const CoffeeSkeleton: React.FunctionComponent = () => {
  return (
    <div className="skeleton-wrapper">
      <Skeleton variant="rectangular" height={320} />
      <Skeleton
        variant="text"
        height={120}
        style={{ marginRight: "20%", marginLeft: "20%" }}
      />
    </div>
  );
};

export default CoffeeSkeleton;
