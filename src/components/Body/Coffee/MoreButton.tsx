import React, { useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useMediaQuery from "@mui/material/useMediaQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import { deleteCoffeeId } from "../../../redux/CoffeeIdsReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/index";
import ListMenu from "../../Common/ListMenu";
import { CoffeesService } from "../../../client";
import theme from "../../../theme";

import SwipeableDrawerBottom from "../../Common/SwipeableDrawerBottom";

interface Props {
  coffee_id: string;
  toggleShowEditCoffeeModal: () => void;
}

type MenuItemType = {
  name: string;
  onClick: () => void | Promise<void> | Promise<unknown>;
  textSX?: object;
};

const MoreMenu = (props: Props): React.JSX.Element => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const MoreMenuBottonRef = React.useRef<HTMLButtonElement>(null);
  const userRole = useSelector((state: RootState) => state.userRole.userRole);
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [menuItem, setMenuItem] = React.useState<MenuItemType[]>([]);

  const deleteCoffee = async () => {
    console.log("Delete coffee");
    try {
      await CoffeesService.deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete(
        props.coffee_id,
      );
      dispatch(deleteCoffeeId(props.coffee_id));
      console.log(`Removed coffee  ${props.coffee_id}`);
    } catch (e) {
      console.log("ERRRIIRRRRRR");
    }
  };

  useEffect(() => {
    const menuItems: MenuItemType[] = [
      {
        name: "Edit Coffee",
        onClick: () => {
          console.log("Edit coffee");
          props.toggleShowEditCoffeeModal();
        },
      },
    ];

    if (userRole === "Admin") {
      menuItems.push({
        name: "Delete Coffee",
        onClick: deleteCoffee,
        textSX: { color: "error.main" },
      });
    }

    setMenuItem(menuItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  const toggleMenuVisibility = () => {
    setShowMenu(!showMenu);
  };

  const constructDrawerListItems = () => {
    return (
      <List>
        {menuItem.map((item) => (
          <ListItem
            key={props.coffee_id + "_" + item.name + "_desk"}
            disablePadding
          >
            <ListItemButton
              onClick={item.onClick}
              component="a"
              href="#simple-list"
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
        key={props.coffee_id + "_" + item.name + "_mobile"}
        sx={item.textSX}
        onClick={item.onClick}
      >
        {item.name}
      </MenuItem>
    ));
  };

  return (
    <>
      <IconButton
        onClick={toggleMenuVisibility}
        sx={{ padding: "0px", marginRight: "10px" }}
        aria-label="settings"
        ref={MoreMenuBottonRef}
      >
        <MoreHorizIcon sx={{ color: "primary.main" }} />
      </IconButton>
      {matches ? (
        <ListMenu
          open={showMenu}
          anchorElement={MoreMenuBottonRef.current}
          handleClose={toggleMenuVisibility}
        >
          {constructListMenuItems()}
        </ListMenu>
      ) : (
        <SwipeableDrawerBottom
          open={showMenu}
          onClose={toggleMenuVisibility}
          onOpen={toggleMenuVisibility}
        >
          {constructDrawerListItems()}
        </SwipeableDrawerBottom>
      )}
    </>
  );
};

export default MoreMenu;
