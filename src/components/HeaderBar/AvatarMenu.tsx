import React from "react";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListMenu from "../Common/ListMenu";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/index";
import { setUserRole } from "../../redux/UserRoleReducer";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const menuRef = React.useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.userRole.userRole);

  const switchRole = () => {
    dispatch(setUserRole(userRole == "Admin" ? "User" : "Admin"));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 100);
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
        >
          <Avatar
            sx={{
              width: 28,
              height: 28,
              bgcolor: "white",
              color: "primary.main",
              borderColor: "primary.main",
              border: "1px solid",
            }}
          >
            A
          </Avatar>
        </IconButton>
      </Tooltip>
      <ListMenu
        open={open}
        anchorElement={menuRef.current}
        handleClose={handleClose}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={userRole == "Admin"} onClick={switchRole} />
            }
            label="Admin"
          />
        </MenuItem>
      </ListMenu>
    </>
  );
}
