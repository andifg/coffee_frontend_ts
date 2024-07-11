import "./BottomNavigator.scss";
import React, { useState } from "react";

import { useLocation, Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Paper } from "@mui/material";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AddCoffeeModal from "../AddCoffee/AddCoffee";

const BottomNavigator = (): React.JSX.Element => {
  const [value, setValue] = useState<string>("/feed");
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  return (
    <>
      <Box sx={{ pb: 7 }}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            sx={{ backgroundColor: "primary.main", paddingBottom: "15px" }}
            value={useLocation().pathname}
            onChange={(_, newValue) => {
              if (newValue === "/add") {
                return;
              }
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
                color: "white",
              }}
              icon={
                value === "/feed" ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )
              }
              onClick={() => {
                if (value === "/feed") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
            <BottomNavigationAction
              value="/add"
              onClick={() => {
                setOpenAddModal(true);
              }}
              sx={{
                maxWidth: "500px",
                color: "white",
              }}
              icon={<AddBoxOutlinedIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/home"
              // label="Home"
              value="/home"
              icon={value === "/home" ? <HomeIcon /> : <HomeOutlinedIcon />}
              sx={{ maxWidth: "500px", color: "white" }}
            />
          </BottomNavigation>
        </Paper>
      </Box>
      <AddCoffeeModal open={openAddModal} setOpen={setOpenAddModal} />
    </>
  );
};

export default BottomNavigator;
