import React from "react";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import ListMenu from "../../ListMenu/ListMenu";
import theme from "../../../theme";
import { Drink as CoffeeDrink } from "../../../client";
import useDeleteCoffeeDrink from "./useDeleteCoffeeDrink";

import SwipeableDrawerBottom from "../../SwipeableDrawerBottom/SwipeableDrawerBottom";

interface Props {
  coffeeDrink: CoffeeDrink;
  toggleShowEditCoffeeModal: () => void;
  showMoreMenu: boolean;
  toggleMoreMenuVisibility: () => void;
}

type MenuItemType = {
  name: string;
  onClick: () => void | Promise<void> | Promise<unknown>;
  textSX?: object;
};

const CoffeeDrinkMoreMenu = (props: Props): React.JSX.Element => {
  const MoreMenuBottonRef = React.useRef<HTMLButtonElement>(null);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  //   const [allowEdit] = useEditCoffeeDecider({ coffee: props.coffee });

  const [deleteCoffeeDrink] = useDeleteCoffeeDrink({
    coffeeDrinkId: props.coffeeDrink._id,
  });

  const menuItem: MenuItemType[] = [];

  //   if (allowEdit) {
  //     menuItem.push({
  //       name: "Edit Coffee",
  //       onClick: () => {
  //         console.log("Edit coffee");
  //         props.toggleShowEditCoffeeModal();
  //       },
  //     });
  menuItem.push({
    name: "Delete Coffee Drink",
    onClick: deleteCoffeeDrink,
    textSX: { color: "error.main" },
  });
  //   }

  const constructDrawerListItems = () => {
    return (
      <List>
        {menuItem.map((item) => (
          <ListItem
            key={props.coffeeDrink._id + "_" + item.name + "_desk"}
            disablePadding
          >
            <ListItemButton
              onClick={item.onClick}
              component="a"
              data-testid={item.name}
            >
              <ListItemText primary={item.name} sx={item.textSX} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  const constructListMenuItems = () => {
    return menuItem.map((item) => (
      <MenuItem
        key={props.coffeeDrink._id + "_" + item.name + "_mobile"}
        sx={item.textSX}
        onClick={item.onClick}
        data-testid={item.name}
      >
        {item.name}
      </MenuItem>
    ));
  };

  return (
    <>
      <IconButton
        onClick={props.toggleMoreMenuVisibility}
        sx={{ padding: "0px", marginRight: "8px" }}
        aria-label="settings"
        ref={MoreMenuBottonRef}
        data-testid="more-menu-button"
      >
        <MoreVertIcon sx={{ color: "primary.main" }} />
      </IconButton>
      {matches ? (
        <ListMenu
          open={props.showMoreMenu}
          anchorElement={MoreMenuBottonRef.current}
          handleClose={props.toggleMoreMenuVisibility}
        >
          {constructListMenuItems()}
        </ListMenu>
      ) : (
        <SwipeableDrawerBottom
          open={props.showMoreMenu}
          onClose={props.toggleMoreMenuVisibility}
          onOpen={props.toggleMoreMenuVisibility}
        >
          {constructDrawerListItems()}
        </SwipeableDrawerBottom>
      )}
    </>
  );
};

export { CoffeeDrinkMoreMenu };
