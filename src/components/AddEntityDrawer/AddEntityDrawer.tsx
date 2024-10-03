import "./AddEntityDrawer.scss";

import SwipeableDrawerBottom from "../SwipeableDrawerBottom/SwipeableDrawerBottom";

import { EspressoCupIcon } from "../../icons/EspressoCupIcon";
import { CoffeeBeansIcon } from "../../icons/CoffeeBeansIcon";
import { DrinkIcon } from "../../icons/DrinkIcon";
import { CoffeeDrinkIcon } from "../../icons/CoffeeDrinkIcon";
import { DrinkType } from "../RatingDialog/DrinkType";

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

  const changePathForAddRating = (drinkType?: DrinkType) => {
    let path = `${location.pathname}/add-rating`;

    if (drinkType) {
      path += `?drinkType=${drinkType}`;
    }

    navigate(path);
  };

  const closeAddCoffeeModal = () => {
    props.close();
    setOpenCoffeeBeanModal(false);
  };

  const menuItem: Map<number, MenuItemType[]> = new Map([
    [
      1,
      [
        {
          name: "Rating for existing Coffee Bean",
          onClick: () => {
            // console.log("Add coffee shop");
            changePathForAddRating();
          },
          icon: <EspressoCupIcon />,
        },
        {
          name: "Coffee Drink",
          onClick: () => {
            changePathForAddRating(DrinkType.CoffeeDrink);
          },
          icon: <CoffeeDrinkIcon />,
        },
        {
          name: "Other Drink",
          onClick: () => {
            changePathForAddRating(DrinkType.Drink);
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
            close={closeAddCoffeeModal}
          />
        </>
      )}
      <RatingDialog close={props.close} />{" "}
    </>
  );
};

export { AddEntityDrawer };
