import React, { useEffect, useRef, useState } from "react";
import { Circle, Group, Transformer } from "react-konva";
import DeleteButton from "../DeleteButton";

function CircleShape(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [shapeRefVisible, setShapeRefVisible] = useState(false);
  const [trRefVisible, setTrRefVisible] = useState(false);
  const [deleteRefVisible, setDeleteRefVisible] = useState(false);

  const shapeRef = useRef();
  const trRef = useRef();
  const deleteRef = useRef();

  const checkNode = () => {
    const selectedNode = shapeRef.current;
    const deleteNode = deleteRef.current;
    trRef.current?.add(deleteNode);
    // console.log(props.circle)
    if (props.circle.selected) {
      trRef.current?.nodes([selectedNode]);
      deleteNode?.position(trRef.current.findOne(".top-right").position());
    } else {
      trRef.current?.detach();
    }
    trRef.current?.getLayer().batchDraw();
  };

  useEffect(() => {
    if (
      !shapeRefVisible &&
      !trRefVisible &&
      !deleteRefVisible &&
      props.circle.selected !== null
    ) {
      return;
    } else {
      checkNode();
    }
    // if (isSelected) {
    //   // we need to attach transformer manually
    //   trRef.current.nodes([shapeRef.current]);
    //   trRef.current.getLayer().batchDraw();
    //   console.log(props.circle)
    // }
  }, [shapeRefVisible, trRefVisible, deleteRefVisible]);

  const circleOnClick = (e) => {
    // props.rects?.fill= shapeRef.current.attrs?.fill
    // console.log(props.selectedRect(props.index))
    setIsSelected(true);
    if (props.circle.selected === true) {
      checkNode();
      props.selectedCircle(props.index);
    } else {
      props.selectedCircle(null);
    }
  };

  return (
    <>
      <Circle
        id={props.key}
        x={200}
        y={100}
        onClick={() => {
          setIsSelected(true);
        }}
        onDblClick={(e) => {
          circleOnClick(e);
        }}
        ref={(el) => {
          shapeRef.current = el;
          setShapeRefVisible(!!el);
        }}
        stroke="black"
        radius={50}
        fill={props?.circle?.fill}
        draggable
      />
      {isSelected && (
        <Group>
          <Transformer
            ref={(el) => {
              trRef.current = el;
              setTrRefVisible(!!el);
            }}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          ></Transformer>
          <DeleteButton
            deleteRef={(el) => {
              deleteRef.current = el;
              setDeleteRefVisible(!!el);
            }}
            delete={props.deleteCircle}
          />
        </Group>
      )}
    </>
  );
}

export default CircleShape;
