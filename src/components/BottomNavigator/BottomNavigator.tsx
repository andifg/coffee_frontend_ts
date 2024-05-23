import "./BottomNavigator.scss";
import React, { useState } from "react";

import { useLocation, Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Paper } from "@mui/material";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";

const BottomNavigator = (): React.JSX.Element => {
  const [value, setValue] = useState<string>("/feed");

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          sx={{ backgroundColor: "primary.main", paddingBottom: "15px" }}
          value={useLocation().pathname}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/feed"
            // label="Feed"
            value="/feed"
            sx={{
              maxWidth: "500px",
              color: "secondary.main",
              selected: { color: "red" },
            }}
            icon={
              value === "/feed" ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )
            }
          />
          <BottomNavigationAction
            component={Link}
            to="/home"
            // label="Home"
            value="/home"
            icon={value === "/home" ? <HomeIcon /> : <HomeOutlinedIcon />}
            sx={{ maxWidth: "500px", color: "secondary.main" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNavigator;
