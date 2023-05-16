import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, ExitToApp } from "@mui/icons-material";

import { authActions } from "../../../store/auth-slice";
// import ChangePassword from "../../../pages/AuthPages/ChangePassword";

function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePassChange = () => {
    handleClose();
    history.replace("/changePassword");
  };

  const onLogout = () => {
    dispatch(authActions.logout());
    history.replace("/");
  };

  const dropdownData = [
    // {'label': 'Profile', 'icon': <AccountBox />, 'action':handleClose},
    { label: "Change Password", icon: "C", action: handlePassChange },
    { label: "Logout", icon: <ExitToApp />, action: onLogout },
  ];

  return (
    <>
      <IconButton
        color="inherit"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {dropdownData.map((item, i) => {
          return (
            <MenuItem
              key={item.label}
              component={ListItem}
              onClick={item.action}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default UserMenu;
