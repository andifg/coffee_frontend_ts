import "./SwipeableDrawerBottom.scss";
import React from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  header?: JSX.Element | undefined;
  children: JSX.Element | JSX.Element[];
}

const SwipeableDrawerBottom = (props: Props): React.JSX.Element => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.open}
      onOpen={props.onOpen}
      onClose={props.onClose}
      PaperProps={{
        "data-testid": "swipeable-drawer-paper",
        style: { paddingBottom: "20px" },
      }}
    >
      <Container
        sx={{
          width: "30px",
          height: "6px",
          borderRadius: "3px",
          backgroundColor: "secondary.light",
          left: "calc(50% - 15px)",
          marginTop: "3px",
          marginBottom: "9px",
        }}
      ></Container>
      {props.header && (
        <div className="swipeable-drawer-bottom-header">{props.header}</div>
      )}
      <Box
        sx={{
          margin: "5px",
          marginBottom: "10px",
          marginTop: "8px",
          borderRadius: "16px",
          // backgroundColor: "secondary.light",
        }}
      >
        {props.children}
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeableDrawerBottom;
