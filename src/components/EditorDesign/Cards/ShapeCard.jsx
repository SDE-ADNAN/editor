import React from "react";
import "./ShapeCard.css";

function ShapeCard(props) {
  return <div className="Card-main">{props.children}</div>;
}

export default ShapeCard;
