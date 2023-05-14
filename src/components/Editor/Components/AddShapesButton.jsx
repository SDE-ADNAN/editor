import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
// import { Button } from "react-bootstrap";

const shapes = ["Rectangle", "Circle", "Star"];

function AddShapesButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
         variant="outline-primary"
        onClick={handleClick}
      >
        ADD SHAPES
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Button fullWidth onClick={()=>props.addRects()}>{shapes[0]}</Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button fullWidth onClick={ ()=>props.addCircle()}>{shapes[1]}</Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button  fullWidth onClick={()=>props.addStar()}>{shapes[2]}</Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AddShapesButton;
