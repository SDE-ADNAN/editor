// import { CheckRounded } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from "react";
import { Rect, Transformer, Group } from "react-konva";
import DeleteButton from "../DeleteButton";

function RectangleShape(props) {
  // console.log(props?.rect?.fill)
  // console.log(props.selected2Rect)
  const [isSelected, setIsSelected] = useState(false);
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
    if (props.rect.selected) {
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
      props.rect.selected !== null
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

  // const handleSelected = () => {
  //   props.rect.selected = !props.rect.selected;
  //   // forceUpdate();
  // };
  // const handleSelected2 = () => {
  //   props.rect.selected = !!props.rect.selected;
  //   // forceUpdate();
  // };

  // const xAndY=(item)=>{
  //   let  x = item.target.attrs.x
  //   let   = item.target.attrs.y

  // }

  const rectOnClick = (e) => {
    // props.rect?.fill= shapeRef.current.attrs?.fill
    // console.log(e.target.attrs);
    // console.log(props.rect.attrs);
    // console.log(props.rect._lastPos);
    // setIsSelected(true)
    props.rect.x = e.target.attrs.x;
    props.rect.y = e.target.attrs.y;
    // props.rect.selected = !props.rect.selected;
    // handleSelected()
    if (props.rect.selected === false) {
      checkNode();
      props.selectedRect(props.index);
    } else {
      props.selectedRect(null);
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

  return (
    <>
      <Rect
        draggable
        id={props.key}
        x={props.rect.x}
        y={props.rect.y}
        width={100}
        height={100}
        fill={props.rect.fill}
        // cornerRadius={props.cornerRadius}
        cornerRadius={20}
        shadowOpacity={props.rect.shadowOpacity}
        shadowColor={props.rect.shadowColor}
        shadowBlur={props.rect.shadowBlur}
        strokeWidth={props.rect.strokeWidth}
        stroke={props.rect.stroke}
        onClick={(e) => {
          rectOnClick(e);
        }}
        // onDblClick={handleSelected2}
        ref={(el) => {
          shapeRef.current = el;
          setShapeRefVisible(!!el);
        }}
        onDragEnd={(e) =>
          props.handleDragEndRect(e.currentTarget.attrs, props.index)
        }
      />
      {props.rect.selected && (
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
              props.handleRectChange("scaleX", e.target.attrs.scaleX);
              props.handleRectChange("scaleY", e.target.attrs.scaleY);
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
            delete={props.deleteRect}
          />
        </Group>
      )}
    </>
  );
}

export default RectangleShape;
