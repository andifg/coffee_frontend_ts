import "./BottomNavigator.scss";
import React, { useState } from "react";

import { useLocation, Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import { Paper } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { CoffeeBeanIcon } from "../../icons/CoffeeBeanIcon";
import { AddEntityDrawer } from "../AddEntityDrawer/AddEntityDrawer";

const BottomNavigator = (): React.JSX.Element => {
  const [value, setValue] = useState<string>("/coffee-drinks");
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
              console.log("Path changed to: ", newValue);
              if (newValue === "/add") {
                return;
              }
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              component={Link}
              to="/coffee-drinks"
              value="/coffee-drinks"
              sx={{
                maxWidth: "500px",
                color: "white",
              }}
              icon={
                value === "/coffee-drinks" ? (
                  <FreeBreakfastIcon />
                ) : (
                  <FreeBreakfastOutlinedIcon />
                )
              }
              onClick={() => {
                if (value === "/coffee-drinks") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
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
                  <CoffeeBeanIcon />
                ) : (
                  <CoffeeBeanIcon
                    stroke="white"
                    fill="none"
                    strokeWidth={3.5}
                  />
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
      <AddEntityDrawer
        open={openAddModal}
        close={() => {
          setOpenAddModal(false);
        }}
      />
    </>
  );
};

export default BottomNavigator;
