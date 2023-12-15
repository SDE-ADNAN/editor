import React from "react";
import "./FillCard.css";

function FillCard(props) {
  let color = props.color;

  return (
    <>
      {props.show && (
        <>
          <div
            key={props.index}
            onClick={(e) => {
              props.onclick(e, color);
              props.toggleMenu && props.toggleMenu();
            }}
            style={{ backgroundColor: color }}
            // style={{
            //   background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`,
            // }}
            className="fill-card-hw"
          ></div>
        </>
      )}
      {!props.show && (
        <>
          <div
            key={props.index}
            onClick={() => {
              // console.log(color);
            }}
            style={{ backgroundImage: color }}
            // style={{
            //   background: `linear-gradient(to bottom,  ${color1} 0%,${color2} 100%)`,
            // }}
            className="fill-card-hw"
          ></div>
        </>
      )}
    </>
  );
}

export default FillCard;
