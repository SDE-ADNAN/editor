import React, { useEffect, useRef, useState } from "react";
import DeleteButton from "../DeleteButton";
import { Group, Star, Transformer } from "react-konva";

function StarShape(props) {
  const [isSelected, setIsSelected] = useState(false);

  const shapeRef = useRef();
  const trRef = useRef();
  const deleteRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Star
      id={props.key}
        x={100}
        y={100}
        numPoints={6}
        innerRadius={20}
        outerRadius={40}
        onClick={() => {
          setIsSelected(true);
        }}
        onDblClick={() => {
          setIsSelected(false);
        }}
        ref={shapeRef}
        fill={"black"}
        stroke={"yellow"}
        strokeWidth={4}
        draggable
      />
      {isSelected && (
        <Group>
          <Transformer
          ref={trRef}
          // boundBoxFunc={(oldBox, newBox) => {
          //   // limit resize
          //   if (newBox.width < 5 || newBox.height < 5) {
          //     return oldBox;
          //   }
          //   return newBox;
          // }}
        >
          
        </Transformer>
        <DeleteButton deleteRef={deleteRef} delete={props.deleteStar} />
        </Group>
        
      )}
    </>
  );
}

export default StarShape;
