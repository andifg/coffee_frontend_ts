import React from "react";

import { useLocation, Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Paper } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";

const BottomNavigator = (): React.JSX.Element => {
  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={useLocation().pathname}>
          <BottomNavigationAction
            component={Link}
            to="/feed"
            label="Feed"
            value="/feed"
            sx={{ maxWidth: "500px", color: "primary.light" }}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="Home"
            value="/home"
            icon={<HomeIcon />}
            sx={{ maxWidth: "500px", color: "primary.light" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavigator;
