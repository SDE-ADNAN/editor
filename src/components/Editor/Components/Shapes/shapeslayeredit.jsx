// import { CheckRounded } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from "react";
import { Rect, Circle, Star, Transformer, Group } from "react-konva";
import DeleteButton from "../DeleteButton";

function Shape(props) {
  // console.log(props?.rect?.fill)
  // console.log(props.selected2Rect)
  //   const [isSelected, setIsSelected] = useState(false);
  const [shapeRefVisible, setShapeRefVisible] = useState(false);
  const [trRefVisible, setTrRefVisible] = useState(false);
  const [deleteRefVisible, setDeleteRefVisible] = useState(false);
  // const [fill,setFill]=useState("")

  const shapeRef = useRef();
  const trRef = useRef();
  const deleteRef = useRef();

  // console.log(props.delete)
  const checkNode = () => {
    const selectedNode = shapeRef.current;
    const deleteNode = deleteRef.current;
    trRef.current?.add(deleteNode);
    // console.log(props?.rect)
    if (props.shape.selected) {
      trRef.current?.nodes([selectedNode]);
      deleteNode?.position(trRef.current.findOne(".top-right").position());
    } else {
      trRef.current?.detach();
    }
    trRef.current?.getLayer().batchDraw();
  };

  useEffect(() => {
    // console.log(shapeRef.current._id)
    // console.log(shapeRef.current.attrs)
    // console.log(shapeRef.current)
    // console.log(trRef.current)
    // console.log(deleteRef.current)
    // console.log(props.rect.length)

    if (
      !shapeRefVisible &&
      !trRefVisible &&
      !deleteRefVisible &&
      props.shape.selected !== null
    ) {
      return;
    } else {
      checkNode();
    }

    // if(props.rect.selected===true){
    //    setIsSelected(true)
    // }else{
    //   setIsSelected(false)
    // }

    // if (props.rect.selected !==null) {
    //   // we need to attach transformer manually
    //   // trRef.current.nodes([shapeRef.current]);
    //   // trRef.current.getLayer().batchDraw();
    //   checkNode()
    // }
  }, [shapeRefVisible, trRefVisible, deleteRefVisible]);

  // const handleSelected = () => {
  //   props.input.selected = !props.input.selected;
  //   // forceUpdate();
  // };

  //   const handleSelected = () => {
  //     props.rect.selected = !props.rect.selected;
  //     // forceUpdate();
  //   };
  // const handleSelected2 = () => {
  //   props.rect.selected = !!props.rect.selected;
  //   // forceUpdate();
  // };

  // const xAndY=(item)=>{
  //   let  x = item.target.attrs.x
  //   let   = item.target.attrs.y

  // }

  const shapeOnClick = (e) => {
    // props.rect?.fill= shapeRef.current.attrs?.fill
    // console.log(trRef.current)
    // console.log(shapeRef.current.index)
    // console.log(props.key)
    // console.log(props.index)
    // console.log(window.innerWidth)
    // setIsSelected(true)
    props.shape.x = e.target.attrs.x;
    props.shape.y = e.target.attrs.y;
    // let widthderieved =props.shape.width * trRef?.current?.attrs?.scaleX
    // let heightderieved =300
    // props.shape.width = widthderieved;
    // props.shape.height = heightderieved;
    // e.target.attrs.height=props.shape.height  ;
    // handleSelected()
    if (props.shape.selected === false) {
      checkNode();
      props.selectedShape(props.index);
    } else {
      props.selectedShape(null);
    }
  };

  // const color =()=>{

  //   console.log(props.rect[props.selectedRect2].attrs.stroke)
  //   if(props.rect.selected ===true){
  //     setFill("red")
  //   }else{
  //     setFill(props.rect[props.selectedRect2].attrs.stroke)
  //   }

  // }

  //  const handleDragStart = e => {
  //   const id = e.target.name();
  //   const items = this.state.items.slice();
  //   const item = items.find(i => i.id === id);
  //   const index = items.indexOf(item);
  //   // remove from the list:
  //   items.splice(index, 1);
  //   // add to the top
  //   items.push(item);
  //   this.setState({
  //     items
  //   });
  // };

  //  const handleDragEnd = e => {
  //   const id = e.target.name();
  //   const items = this.state.items.slice();
  //   const item = this.state.items.find(i => i.id === id);
  //   const index = this.state.items.indexOf(item);
  //   // update item position
  //   items[index] = {
  //     ...item,
  //     x: e.target.x(),
  //     y: e.target.y()
  //   };
  //   this.setState({ items });
  // };

  const getShapes = () => {
    let _shape;
    switch (props.shape?.type) {
      case "rect":
        _shape = (
          <Rect
            draggable
            id={props.key}
            x={props.shape.x}
            y={props.shape.y}
            width={props.shape.width}
            height={props.shape.height}
            fill={props.shape.fill}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            onClick={(e) => {
              shapeOnClick(e);
            }}
            // onDblClick={handleSelected2}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragStart={() => props.handleDragStart(props.index)}
            onDragEnd={(e) =>
              props.handleDragEndShape(e.target.attrs, props.index)
            }
          />
        );
        break;
      case "circle":
        _shape = (
          <Circle
            draggable
            id={props.key}
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
            onClick={(e) => {
              shapeOnClick(e);
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) =>
              props.handleDragEndShape(e.target.attrs, props.index)
            }
          />
        );
        break;
      case "star":
        _shape = (
          <Star
            draggable
            id={props.key}
            x={props.shape.x}
            y={props.shape.y}
            // width={props.shapes.width}
            // height={props.shapes.height}
            fill={props?.shape?.fill}
            shadowOpacity={props.shape.shadowOpacity}
            shadowColor={props.shape.shadowColor}
            shadowBlur={props.shape.shadowBlur}
            strokeWidth={props.shape.strokeWidth}
            stroke={props.shape.stroke}
            numPoints={props.shape.numPoints}
            innerRadius={props.shape.innerRadius}
            outerRadius={props.shape.outerRadius}
            onClick={(e) => {
              shapeOnClick(e);
            }}
            ref={(el) => {
              shapeRef.current = el;
              setShapeRefVisible(!!el);
            }}
            onDragEnd={(e) =>
              props.handleDragEndShape(e.target.attrs, props.index)
            }
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
      {props.shape?.selected && (
        <Group>
          <Transformer
            ref={(el) => {
              trRef.current = el;
              setTrRefVisible(!!el);
            }}
            onTransform={(e) => {
              deleteRef.current.position(
                e.currentTarget.findOne(".top-right").position()
              );
            }}
            onTransformEnd={(e) => {
              props.handleShapeChange("scaleX", e.target.attrs.scaleX);
              props.handleShapeChange("scaleY", e.target.attrs.scaleY);
            }}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
          <DeleteButton
            deleteRef={(el) => {
              deleteRef.current = el;
              setDeleteRefVisible(!!el);
            }}
            delete={props.deleteShape}
          />
        </Group>
      )}
    </>
  );
}

export default Shape;
