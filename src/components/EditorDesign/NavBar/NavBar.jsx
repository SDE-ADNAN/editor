/* eslint-disable no-unused-vars */
import React from "react";

import BackPNG from "./Back.png";
import infoPNG from "./info.png";
import { Link } from "react-router-dom";
// import { Hidden } from "@mui/material"; // Removed MUI dependency

function NavBar(props) {
  return (
    <div className="nav">
      <div className="back-png">
        {/* <div>
          <Link to={props.linkText}>
            <img className="back-png" src={BackPNG} alt="abc"></img>
          </Link>
        </div> */}
        {/* <Hidden mdDown>
          <div
            style={{
              color: "white",
              display: "contents",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "1.3em" }}>Home</div>
          </div>
        </Hidden> */}
      </div>
      {/* <div className="heading">Editor</div> */}
      <div className="info-png">
        {props.download && <>{props.downloadElement}</>}
        {/* {props.downloadIcon && <img src={props.downloadIcon} alt="abc" ></img>} */}
      </div>
    </div>
  );
}

export default NavBar;
