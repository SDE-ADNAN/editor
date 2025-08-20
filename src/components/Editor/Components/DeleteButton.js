import React from "react";
import { Text, Group } from "react-konva";
// import { Html } from "react-konva-utils";


const deleteButton = (props) => {
  // console.log(props)
  // console.log( `from delete button : ${props.delete}` )
  return (
    <Group
      ref={props.deleteRef}
      // onClick={() => props.delete()}
      // onTouchEnd={() => props.delete()}
    >
      <Text
        className="strokeme"
        width={"auto"}
        height={13}
        fontSize={17}
        fontFamily="Arial"
        text="replace"
        fill="red"
      />
    </Group>
  );
};

export default deleteButton;
