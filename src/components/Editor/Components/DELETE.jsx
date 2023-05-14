/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "react-bootstrap";
import { Group, Text } from "react-konva";

function DELETE(props) {
  // console.log(props.index)
  // console.log(props.state)
  // index={state.selectedObject}
  //               selected={objects[selectedObject]}
  return (
    <Button
      className="btn1"
      //   ref={props.deleteRef}
      //   onClick={() => props.delete(props.state.objects[props.state.selectedObject],props.index)}
      onClick={() =>
        props.delete({
          type: props.state.objects[props.state.selectedObject],
          index: props.index,
        })
      }
      //   onTouchEnd={() => props.delete(props.selected.type,props.index)}
    >
      DELETE
      {/* <Text
            width={"auto"}
            height={13}
            fontSize={20}
            fontFamily="Arial"
            text="Delete"
            fill="red"
            stroke="black"
            strokeWidth={1.2}
          /> */}
    </Button>
  );
}

export default DELETE;
