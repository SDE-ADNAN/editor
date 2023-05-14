/* eslint-disable no-unused-vars */
import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import AlignVerticalBottomRoundedIcon from "@mui/icons-material/AlignVerticalBottomRounded";
import AlignVerticalTopRoundedIcon from "@mui/icons-material/AlignVerticalTopRounded";
// import { Button } from "react-bootstrap";

function LayersMenu(props) {
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
        className="btn1"
        variant="contained"
        id="basic-button"
        // aria-controls={open ? "basic-menu" : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Position
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
          <Button
            fullWidth
            onClick={() =>
              props.layerFunc({ type: "bottom", index: props.selectedObject })
            }
          >
            <div className="vH6Kyg">
              <span className="iQtSJg _-JbZKA">
                <span aria-hidden="true" className="NA_Img dkWypw">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21 20c0 .41-.34.75-.75.75H3.75a.75.75 0 1 1 0-1.5h16.5c.41 0 .75.34.75.75zM11 6v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zm7 5v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zM9.5 6a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V6zm7 5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-4z"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="Sbf1Gw">Bottom</span>
            </div>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            onClick={() =>
              props.layerFunc({ type: "backward", index: props.selectedObject })
            }
            fullWidth
          >
            <div className="vH6Kyg">
              <span className="iQtSJg _-JbZKA">
                <span aria-hidden="true" className="NA_Img dkWypw">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.75 18.12V9.75a.75.75 0 1 0-1.5 0v8.37l-2.26-2.25a.75.75 0 0 0-1.06 1.06l2.83 2.82c.68.69 1.79.69 2.47 0l2.83-2.82A.75.75 0 0 0 15 15.87l-2.25 2.25zM15 11.85v1.67l6.18-3.04a1 1 0 0 0 0-1.79l-7.86-3.86a3 3 0 0 0-2.64 0L2.82 8.69a1 1 0 0 0 0 1.8L9 13.51v-1.67L4.4 9.6l6.94-3.42c.42-.2.9-.2 1.32 0L19.6 9.6 15 11.85z"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="Sbf1Gw">Backward</span>
              {/* <span className="_-JbZKA">
              <kbd className="c-8JMw _5RSqIg fO2LDQ">Ctrl+[</kbd>
            </span> */}
            </div>
          </Button>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Button
            onClick={() =>
              props.layerFunc({ type: "forward", index: props.selectedObject })
            }
            fullWidth
          >
            <div className="vH6Kyg">
              <span className="iQtSJg _-JbZKA">
                <span aria-hidden="true" className="NA_Img dkWypw">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12.75 5.82v8.43a.75.75 0 1 1-1.5 0V5.81L8.99 8.07A.75.75 0 1 1 7.93 7l2.83-2.83a1.75 1.75 0 0 1 2.47 0L16.06 7A.75.75 0 0 1 15 8.07l-2.25-2.25zM15 10.48l6.18 3.04a1 1 0 0 1 0 1.79l-7.86 3.86a3 3 0 0 1-2.64 0l-7.86-3.86a1 1 0 0 1 0-1.8L9 10.49v1.67L4.4 14.4l6.94 3.42c.42.2.9.2 1.32 0l6.94-3.42-4.6-2.26v-1.67z"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="Sbf1Gw">Forward</span>
              {/* <span className="_-JbZKA">
                <kbd className="c-8JMw _5RSqIg fO2LDQ">Ctrl+]</kbd>
              </span> */}
            </div>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            onClick={() =>
              props.layerFunc({ type: "top", index: props.selectedObject })
            }
            fullWidth
          >
            <div className="vH6Kyg">
              <span className="iQtSJg _-JbZKA">
                <span aria-hidden="true" className="NA_Img dkWypw">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21 4c0 .41-.34.75-.75.75H3.75a.75.75 0 0 1 0-1.5h16.5c.41 0 .75.34.75.75zM11 9v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zm7 0v4a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2h1a2 2 0 0 1 2 2zM9.5 9a.5.5 0 0 0-.5-.5H8a.5.5 0 0 0-.5.5v9c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V9zm7 0a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V9z"
                    ></path>
                  </svg>
                </span>
              </span>
              <span className="Sbf1Gw">Top</span>
            </div>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default LayersMenu;
