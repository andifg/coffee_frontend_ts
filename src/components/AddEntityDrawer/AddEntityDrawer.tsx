import "./AddEntityDrawer.scss";

import SwipeableDrawerBottom from "../SwipeableDrawerBottom/SwipeableDrawerBottom";

import { EspressoCupIcon } from "../../icons/EspressoCupIcon";
// import CoffeeBean from "../../assets/coffee-bean.svg";
import { CoffeeBeansIcon } from "../../icons/CoffeeBeansIcon";
import { DrinkIcon } from "../../icons/DrinkIcon";
import { CoffeeDrinkIcon } from "../../icons/CoffeeDrinkIcon";

import AddCoffeeModal from "../AddCoffee/AddCoffee";
import { RatingDialog } from "../RatingDialog/RatingDialog";

import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

type AddEntityDrawerProps = {
  open: boolean;
  close: () => void;
};

type MenuItemType = {
  name: string;
  onClick: () => void;
  textSX?: object;
  icon?: JSX.Element;
};

const AddEntityDrawer = (props: AddEntityDrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openCoffeeBeanModal, setOpenCoffeeBeanModal] =
    useState<boolean>(false);

  const changePathForAddRating = () => {
    console.log("changePathForAddRating");
    navigate(`${location.pathname}/add-rating`);
  };

  const menuItem: Map<number, MenuItemType[]> = new Map([
    [
      1,
      [
        {
          name: "Rating for existing Coffee Bean",
          onClick: () => {
            console.log("Add coffee shop");
          },
          icon: <EspressoCupIcon />,
        },
        {
          name: "Coffee Drink",
          onClick: () => {
            changePathForAddRating();
          },
          icon: <CoffeeDrinkIcon />,
        },
        {
          name: "Other Drink",
          onClick: () => {
            changePathForAddRating();
          },
          icon: <DrinkIcon />,
        },
        {
          name: "Coffee Bean",
          onClick: () => {
            setOpenCoffeeBeanModal(true);
          },
          icon: <CoffeeBeansIcon />,
        },
      ],
    ],
  ]);

  const constructListMenuItems = () => {
    return (
      menuItem.get(1)?.map((item) => (
        <MenuItem
          key={"_" + item.name + "_mobile"}
          sx={item.textSX}
          onClick={item.onClick}
          data-testid={item.name}
        >
          {item.icon}
          <div className="add-entity-drawer-menu-item-name">{item.name}</div>
        </MenuItem>
      )) || <></>
    );
  };

  return (
    <>
      <SwipeableDrawerBottom
        open={props.open}
        onClose={props.close}
        onOpen={() => {}}
        header={
          <div className="add-entity-drawer-header-items">
            <div></div>
            <div>New Post</div>
            <div></div>
          </div>
        }
      >
        {constructListMenuItems()}
      </SwipeableDrawerBottom>
      {props.open && (
        <>
          {" "}
          <AddCoffeeModal
            open={openCoffeeBeanModal}
            setOpen={setOpenCoffeeBeanModal}
          />
          <RatingDialog />{" "}
        </>
      )}
    </>
  );
};

export { AddEntityDrawer };
