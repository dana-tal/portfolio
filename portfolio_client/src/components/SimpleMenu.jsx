import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    // Save the button element to anchor the menu
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // Close the menu
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        Open Menu
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
        <MenuItem onClick={handleClose}>Option 3</MenuItem>
      </Menu>
    </div>
  );
}