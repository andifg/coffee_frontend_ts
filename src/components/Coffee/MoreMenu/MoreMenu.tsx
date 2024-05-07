import React from "react";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import ListMenu from "../../ListMenu";
import theme from "../../../theme";
import { Coffee } from "../../../client";

import SwipeableDrawerBottom from "../../SwipeableDrawerBottom";
import useDeleteCoffee from "../../../hooks/useDeleteCoffee";
import useEditCoffeeDecider from "./useEditCoffeeDecider";

interface Props {
  coffee: Coffee;
  toggleShowEditCoffeeModal: () => void;
  showMoreMenu: boolean;
  toggleMoreMenuVisibility: () => void;
}

type MenuItemType = {
  name: string;
  onClick: () => void | Promise<void> | Promise<unknown>;
  textSX?: object;
};

const MoreMenu = (props: Props): React.JSX.Element => {
  const MoreMenuBottonRef = React.useRef<HTMLButtonElement>(null);
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [allowEdit] = useEditCoffeeDecider({ coffee: props.coffee });

  const [deleteCoffee] = useDeleteCoffee({ coffee_id: props.coffee._id });

  const menuItem: MenuItemType[] = [];

  if (allowEdit) {
    menuItem.push({
      name: "Edit Coffee",
      onClick: () => {
        console.log("Edit coffee");
        props.toggleShowEditCoffeeModal();
      },
    });
    menuItem.push({
      name: "Delete Coffee",
      onClick: deleteCoffee,
      textSX: { color: "error.main" },
    });
  }

  const constructDrawerListItems = () => {
    return (
      <List>
        {menuItem.map((item) => (
          <ListItem
            key={props.coffee._id + "_" + item.name + "_desk"}
            disablePadding
          >
            <ListItemButton
              onClick={item.onClick}
              component="a"
              href="#simple-list"
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
        key={props.coffee._id + "_" + item.name + "_mobile"}
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

export default MoreMenu;
