import React from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ListMenu from "../ListMenu/ListMenu";
import UserAvatar from "../UserAvatar/UserAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopy from "@mui/icons-material/ContentCopy";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/index";

import { useAuth } from "react-oidc-context";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuRef = React.useRef<HTMLButtonElement>(null);
  const auth = useAuth();

  const given_name = useSelector((state: RootState) => state.user.givenName);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 100);
  };

  const handleLogout = () => {
    console.log("Logout");
    auth.removeUser();
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          ref={menuRef}
          data-testid="avatar-menu"
        >
          <UserAvatar given_name={given_name} />
        </IconButton>
      </Tooltip>
      <ListMenu
        open={open}
        anchorElement={menuRef.current}
        handleClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            console.log("Account Settings");
            window.location.replace(
              `${window.env.AUTH_URL}/account/?referrer=react-app#/personal-info`,
            );
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Account Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </ListMenu>
    </>
  );
}
