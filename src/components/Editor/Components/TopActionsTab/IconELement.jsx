import React from "react";

function IconELement(props) {
  return (
    <div
      // className="ac-icon-main"
      className={`ac-icon-main
      ${props.title === "Back" ? "ac-icon-main-back " : "ac-icon-main"}`}
      id="delete"
      onClick={props.onClick}
    >
      <div>
        <img
          className={`sidebarIcons ${
            props.title !== "Back" &&
            props.title !== "Delete" &&
            props.title !== "Delete ALL" &&
            props.title !== "Position" &&
            props.title !== "Fill" &&
            props.title !== "Opacity" &&
            props.title !== "Stroke" &&
            props.title !== "Border" &&
            props.title !== "Styles" &&
            props.title !== "Duplicate"
              ? "ac-icon-side-bar-img"
              : "ac-icon-side-bar-img"
          }`}
          src={props.image}
          alt={props.title}
        ></img>
      </div>

      <div
        className={`
        ${props.title === "Back" ? "icon-title-back" : "icon-title"}

         `}
      >
        {props.title}
      </div>
    </div>
  );
}

export default IconELement;
