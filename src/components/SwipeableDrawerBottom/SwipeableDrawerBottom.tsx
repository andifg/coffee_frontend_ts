import React from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface Props {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}

const SwipeableDrawerBottom = (props: Props): React.JSX.Element => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props.open}
      onOpen={props.onOpen}
      onClose={props.onClose}
      PaperProps={{ "data-testid": "swipeable-drawer-paper" }}
    >
      <Container
        sx={{
          width: "30px",
          height: "6px",
          borderRadius: "3px",
          backgroundColor: "secondary.light",
          left: "calc(50% - 15px)",
          marginTop: "3px",
        }}
      ></Container>
      <Box
        sx={{
          margin: "5px",
          marginBottom: "10px",
          marginTop: "8px",
          borderRadius: "16px",
          backgroundColor: "secondary.light",
        }}
      >
        {props.children}
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeableDrawerBottom;
