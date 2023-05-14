import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Rect,
  Circle,
  Star,
  Transformer,
  Group,
  Line,
  Shape,
} from "react-konva";
import { EditorCtx } from "../MainEditor";

import download from "./DownloadPNG.png";
// import DeleteButton from "../DeleteButton";

function Shapes(props) {
  const Ctx = useContext(EditorCtx);
  const [shapeRefVisible, setShapeRefVisible] = useState(false);
  const [trRefVisible, setTrRefVisible] = useState(false);
  // const [deleteRefVisible, setDeleteRefVisible] = useState(false);

  const shapeRef = useRef();
  const trRef = useRef();
  // const deleteRef = useRef();

  const checkNode = () => {
    const selectedNode = shapeRef.current;
    // const deleteNode = deleteRef.current;
    // trRef.current?.add(deleteNode);
    if (props.shape.selected) {
      trRef.current?.nodes([selectedNode]);
      // deleteNode?.position(trRef.current.findOne(".top-right").position());
    } else {
      trRef.current?.detach();
    }
    trRef.current?.getLayer().batchDraw();
  };

  useEffect(() => {
    if (!shapeRefVisible && !trRefVisible && props.shape.selected !== null) {
      return;
    } else {
      checkNode();
    }
  }, [shapeRefVisible, trRefVisible]);

  const shapeOnClick = (e) => {
    const oldSelected = props.state.selectedObject;
    // console.log(shapeRef);
    if (window.innerWidth > 601) {
      Ctx.showActionMenu();
    }
    const arr = [];
    props.shape.x = e.target.attrs.x;
    props.shape.y = e.target.attrs.y;
    props.state.objects.map((object1) => {
      arr.push(object1.selected);
      return arr;
    });
    // console.log(arr);
    // for (var i = 0; i < props.state.objects.length; i++) {
    //   console.log(props.state.objects[i].selected);
    // }
    if (props.shape.selected === false) {
      checkNode();
      props.selectedShape(props.index, "shape");
    } else {
      // props.shape.selected = !props.shape.selected;
      props.selectedShape(null);
    }
  };

  const enabledAnchorsFunc = () => {
    if (
      props.shape.shapeType === "star" ||
      props.shape.shapeType === "circle"
    ) {
      return [
        "top-left",
        "top-center",
        "top-right",
        // "middle-right",
        // "middle-left",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ];
    } else {
      return [
        "top-left",
        "top-center",
        "top-right",
        "middle-right",
        "middle-left",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ];
    }
  };

  const getShapes = () => {
    let _shape;

    switch (props.shape?.shapeType) {
      case "rect":
        _shape = (
          <Rect
            draggable={props.shape.selected ? true : false}
            key={props.index}
            // x={props.state.stageWidth * 0.3}
            // y={props.state.stageWidth * 0.25} //for responsive object
            // width={props.state.stageWidth - 200}
            // height={props.state.stageWidth - 200}
            x={props.shape.x}
            y={props.shape.y}
            width={props.shape.width}
            height={props.shape.height}
            // cornerRadius={props.shape.cornerRadius}
            cornerRadius={[
              props.shape.topLeft,
              props.shape.topRight,
              props.shape.bottomRight,
              props.shape.bottomLeft,
            ]}
            opacity={props.shape.opacity}
            fill={props.shape.fill}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            rotation={props.shape.rotation}
            stroke={props.shape.stroke}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(shapeRef);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            /////////////////////////////////////////////////////////////////////////////////////////////////
            // due to this on transform prop calling the props.ontransform and
            // props.ondragend functions the shapes are not behaving wierdly
            // when we are trying to (rotate + resize + position) the shapes at the same time
            onTransform={(e) => {
              props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            //////////////////////////////////////////////////////////////////////////////////////////////////////

            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            // onDragStart={(e)=>props.handleDragStart(e)}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "circle":
        _shape = (
          <Circle
            draggable={props.shape.selected ? true : false}
            key={props.index}
            x={props.shape.x}
            y={props.shape.y}
            radius={props.shape.radius}
            // width={props.width}
            // height={props.height}
            fill={props?.shape?.fill}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            opacity={props.shape.opacity}
            // onDragStart={(e)=>props.handleDragStart(e)}
            onClick={(e) => {
              shapeOnClick(e);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onTransform={(e) => {
              props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  radius: e.currentTarget.attrs.radius,
                },
                type: "Modified",
              });
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  radius: e.currentTarget.attrs.radius,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "star":
        _shape = (
          <Star
            draggable={props.shape.selected ? true : false}
            key={props.index}
            x={props.shape.x}
            y={props.shape.y}
            // width={props.shapes.width}
            // height={props.shapes.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            numPoints={props.shape.numPoints}
            innerRadius={props.shape.innerRadius}
            outerRadius={props.shape.outerRadius}
            // onDragStart={(e)=>props.handleDragStart(e)}
            onClick={(e) => {
              shapeOnClick(e);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
            }}
            onTransform={(e) => {
              props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "triangle":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(50, 0);
              context.lineTo(100, 100);
              context.lineTo(0, 100);
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            // points={props.shape.points}
            // [92, 50, 150, 150, 34, 150]
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "hexagon":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(50, 0); //p1 top
              context.lineTo(100, 25); //p2
              context.lineTo(100, 75); //p3
              context.lineTo(50, 100); //p4
              context.lineTo(0, 75); //p5
              context.lineTo(0, 25); //p6
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "pentagon":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(50, 0); //p1 top
              context.lineTo(100, 40); //p2
              context.lineTo(85, 100); //p3
              context.lineTo(15, 100); //p4
              context.lineTo(0, 40); //p5
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index, shapeRef);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "rightArrow":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(65, 15); //p1 top
              context.lineTo(100, 50); //p2
              context.lineTo(65, 85); //p3
              context.lineTo(65, 67); //p4
              context.lineTo(0, 67); //p5
              context.lineTo(0, 33); //p6
              context.lineTo(65, 33); //p7
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "rightTriangle":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, 0); //p1 top
              context.lineTo(100, 100); //p2
              context.lineTo(0, 100); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "plusShape":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(35, 0); //p1 top
              context.lineTo(65, 0); //p2
              context.lineTo(65, 35); //p3
              context.lineTo(100, 35); //p3
              context.lineTo(100, 65); //p3
              context.lineTo(65, 65); //p3
              context.lineTo(65, 100); //p3
              context.lineTo(35, 100); //p3
              context.lineTo(35, 65); //p3
              context.lineTo(0, 65); //p3
              context.lineTo(0, 35); //p3
              context.lineTo(35, 35); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "octagon":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(75, 0); //p1 top
              context.lineTo(100, 25); //p2
              context.lineTo(100, 75); //p3
              context.lineTo(75, 100); //p3
              context.lineTo(25, 100); //p3
              context.lineTo(0, 75); //p3
              context.lineTo(0, 25); //p3
              context.lineTo(25, 0); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "trapezium":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(20, 0); //p1 top
              context.lineTo(80, 0); //p2
              context.lineTo(100, 100); //p3
              context.lineTo(0, 100); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "kite":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(50, 0); //p1 top
              context.lineTo(100, 30); //p2
              context.lineTo(50, 100); //p3
              context.lineTo(0, 30); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "parallelogram":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(20, 0); //p1 top
              context.lineTo(100, 0); //p2
              context.lineTo(80, 100); //p3
              context.lineTo(0, 100); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "rhombus":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(50, 0); //p1 top
              context.lineTo(100, 50); //p2
              context.lineTo(50, 100); //p3
              context.lineTo(0, 50); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "scaleneTriangle":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(0, 0); //p1 top
              context.lineTo(100, 100); //p2
              context.lineTo(20, 100); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "tag":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(25, 0); //p1 top
              context.lineTo(75, 0); //p2
              context.lineTo(75, 100); //p3
              context.lineTo(50, 60); //p3
              context.lineTo(25, 100); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            lineJoin={"round"}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      case "ribbon":
        _shape = (
          <Shape
            draggable={props.shape.selected ? true : false}
            key={props.index}
            sceneFunc={(context, shape) => {
              context.beginPath();
              context.moveTo(25, 0); //p1 top
              context.lineTo(75, 0); //p2
              context.lineTo(75, 100); //p3
              context.lineTo(50, 60); //p3
              context.lineTo(25, 100); //p3
              context.closePath();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            x={props.shape.x}
            y={props.shape.y}
            tension={0}
            lineJoin={"round"}
            closed
            width={props.shape.width}
            height={props.shape.height}
            fill={props?.shape?.fill}
            opacity={props.shape.opacity}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            rotation={props.shape.rotation}
            scaleX={props.shape.scaleX}
            scaleY={props.shape.scaleY}
            onClick={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTouchEnd={(e) => {
              shapeOnClick(e);
              // console.log(e.currentTarget.attrs);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            onTransformEnd={(e) => {
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) => {
              props.handleDragEnd(e.currentTarget.attrs, props.index);
              props.updateUndoRedo({
                index: props.index,
                object: {
                  ...props.shape,
                  x: e.currentTarget.attrs.x,
                  y: e.currentTarget.attrs.y,
                  width: e.currentTarget.attrs.width,
                  height: e.currentTarget.attrs.height,
                },
                type: "Modified",
              });
            }}
          />
        );
        break;
      default:
        _shape = null;
    }
    return _shape;
  };

  return (
    <>
      {getShapes()}
      {/* <Rect
      draggable
      id={props.key}
      x={props.shape.x}
      y={props.shape.y}
      width={100}
      height={100}
      fill={props.shape.fill}
      shadowOpacity={props.shape.shadowOpacity}
      shadowColor={props.shape.shadowColor}
      shadowBlur={props.shape.shadowBlur}
      strokeWidth={props.shape.strokeWidth}
      stroke={props.shape.stroke}
      onClick={(e)=>{shapeOnClick(e)}}
      // onDblClick={handleSelected2}
      ref={el => { shapeRef.current = el; setShapeRefVisible(!!el); }}
      onDragEnd={(e) =>
        props.handleDragEndShape(e.currentTarget.attrs, props.index)
      }
    /> */}
      {props.shape.selected && (
        <Group>
          <Transformer
            anchorStroke="#084e99"
            anchorCornerRadius={5}
            anchorFill="#49c7f5"
            anchorSize={
              props.shape.shapeType === "star" ||
              props.shape.shapeType === "circle" ||
              props.shape.shapeType === "triangle"
                ? 10
                : 6
            }
            borderStroke="black"
            borderDash={[3, 3]}
            // centeredScaling={true}
            // ignoreStroke
            enabledAnchors={
              props.shape.shapeType === "star" ||
              props.shape.shapeType === "circle"
                ? // ||
                  // props.shape.shapeType === "triangle"
                  [
                    // "top-left",
                    // "top-center",
                    // "top-right",
                    // "middle-right",
                    // "middle-left",
                    // "bottom-left",
                    // "bottom-center",
                    "bottom-right",
                  ]
                : [
                    "top-left",
                    "top-center",
                    "top-right",
                    "middle-right",
                    "middle-left",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right",
                  ]
            }
            // enabledAnchors={() => {
            //   enabledAnchorsFunc();
            // }}
            ref={(el) => {
              trRef.current = el;
              setTrRefVisible(!!el);
            }}
            onTransformEnd={(e) => {
              props.handleShapeChange("scaleX", e.target.attrs.scaleX);
              props.handleShapeChange("scaleY", e.target.attrs.scaleY);
            }}
            onTransform={(e) => {
              // props.onTransform(e.currentTarget.attrs, props.index, shapeRef);
              // props.handleDragEnd(e.currentTarget.attrs, props.index);
            }}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          {/* <DeleteButton
            deleteRef={(el) => {
              deleteRef.current = el;
              setDeleteRefVisible(!!el);
            }}
            delete={props.deleteShape}
          /> */}
        </Group>
      )}
    </>
  );
}

export default Shapes;
