import React from "react";

function ButtonLarge(props) {
  return (
    <div>
      <div className="ButtonLarge">
        <div style={{ color: "white", fontSize: "2rem" }}>{props.text}</div>
      </div>
    </div>
  );
}

export default ButtonLarge;
