/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

import { } from "lodash";
import { Stage, Layer, Rect } from "react-konva";

// import { Paper } from "@mui/material"; // Replaced with div
import { Form, Button } from "react-bootstrap";
import { 
  MdMenu, 
  MdNotifications, 
  MdGetApp 
} from "react-icons/md";

import {
  maxStageWidth,
  maxStageHeight,
  TemplateOne,
  clientID,
} from "./constants";
import CanvasImage from "./CanvasImage";
import Download from "./Download";
import CanvasText from "./CanvasText";
import AddedImage from "./AddedImage";
import ObjectsProperties from "./ObjectsProperties";
import AddShapesButton from "./AddShapesButton";
import Shape from "./Shapes/Shape";
import DELETE from "./DELETE";
import LayersMenu from "./LayersMenu";
import SideBar from "../Components/SideBar/SideBar";
import SideBarContent from "./SideBarContent/SideBarContent";
import ModernToolbar from "./TopActionsTab/ModernToolbar";
import ChangeBgButton from "./Buttons/ChangeBgButton";
import NavBar from "../../EditorDesign/NavBar/NavBar";
import Home from "../home.png";
import downloadIcon from "../DownloadIcon.png";

import Shapes from "./Shapes/Shape";
import Stack from "../../DataStructures/Stack";

const EditorCtx = React.createContext();
export { EditorCtx };

const MemeGenerator = () => {
  const stageRefParent = useRef();
  const stageRef = useRef();
  const imgRef = useRef();
  const [state, setState] = useState({
    images: [],
    imageName: "abstract",
    objects: [],
    undoRedo: [],
    // redo: [],
    historyStep: 0,
    backgroundImageSrc: null,
    backgroundImageName: null,
    selectedObject: null,
    selectedTextarea: null,
    src: "",
    stageWidth: maxStageWidth,
    stageHeight: maxStageWidth * 1.4142,
    stageScale: 1,
    contentType: "text",
    mainModalType: "",
    subModalType: "",
    showAcTab: false,
    showMenu: false,
    showTextAreaModal: false,
    scale: 1,
    x: 0,
    y: 0,
  });

  const setShowmenu = (val) => {
    setState((state) => ({
      ...state,
      showMenu: val,
    }));
  };
  //////////////////////////////////////////////////////
  // for undo redo
  // --------------------------------------------------------

  // const addUndoRedo=()=>{

  // }
  // const popUndoRedo = () => {
  //   const orgRedoArr = [...state.undoRedo];
  //   console.log("1st" + orgRedoArr);
  //   const poppedRedoItem = orgRedoArr.pop();
  //   console.log("1st" + orgRedoArr);
  //   const updatedRedoArr = JSON.parse(JSON.stringify(orgRedoArr));
  //   setState((state) => ({
  //     ...state,
  //     redo: updatedRedoArr,
  //   }));
  //   return poppedRedoItem;
  // };

  // const popStateObj = () => {
  //   if (state.objects.length !== 0) {
  //     const orgUndoArr = [state.objects];
  //     const poppedUndoItem = orgUndoArr.splice(-1);
  //     const updatedUndoArr = JSON.parse(JSON.stringify(orgUndoArr));
  //     setState((state) => ({
  //       ...state,
  //       objects: updatedUndoArr,
  //     }));
  //     return poppedUndoItem;
  //   }
  // };

  const pushStateObj = (val) => {
    setState((state) => ({
      ...state,
      objects: [...state.objects, val],
      selectedObject: state.objects.length - 1,
    }));
  };
  const pushUndoRedo = (val) => {
    setState((state) => ({
      ...state,
      undoRedo: [...state.undoRedo, val],
      selectedObject: state.objects.length - 1,
    }));
  };
  // const undo = () => {
  //   if (state.objects.length > 0) {
  //     if (state.selectedObject !== null) {
  //       state.objects[state.selectedObject].selected = false;
  //     }
  //     const objarr1 = [...state.objects];
  //     const poppedItem = objarr1.pop();
  //     pushUndoRedo(poppedItem);
  //     const updatedUndo = JSON.parse(JSON.stringify(objarr1));
  //     setState((state) => ({
  //       ...state,
  //       objects: updatedUndo,
  //       selectedObject:
  //         // state.objects.length > 0 ? state.objects.length - 1 :
  //         null,
  //     }));
  //   } else {
  //     return;
  //   }
  // };

  ////////////////////////
  const updateUndoRedo = (object) => {
    object.object.selected = false;
    if (state.historyStep < state.undoRedo.length - 1) {
      let temparr = JSON.parse(JSON.stringify(state.undoRedo));
      temparr.length = state.historyStep + 1;
      setState((state) => ({
        ...state,
        undoRedo: temparr,
        // historyStep: state.historyStep - 1,
      }));
    }
    setState((state) => ({
      ...state,
      undoRedo: [...state.undoRedo, object],
      historyStep: state.historyStep + 1,
    }));
  };

  const undo = () => {
    console.log(state.historyStep);
    if (state.historyStep > 0) {
      let latestValue = state.undoRedo[state.historyStep - 1];
      console.log(latestValue);
      let tempObjects = JSON.parse(JSON.stringify(state.objects));
      let tempUndoRedo = JSON.parse(JSON.stringify(state.undoRedo));
      tempObjects[latestValue.index] = latestValue.object;
      setState((state) => ({
        ...state,
        objects: tempObjects,
        undoRedo: tempUndoRedo,
        historyStep: state.historyStep - 1,
      }));
    } else {
      console.log("else");
    }
  };

  const redo = () => {
    console.log(state.historyStep);
    console.log(state.undoRedo);
    if (state.historyStep < state.undoRedo.length - 1) {
      console.log(state.undoRedo);
      let latestValue = state.undoRedo[state.historyStep + 1];
      let tempObjects = JSON.parse(JSON.stringify(state.objects));
      let tempUndoRedo = JSON.parse(JSON.stringify(state.undoRedo));
      tempObjects[latestValue.index] = latestValue.object;
      setState((state) => ({
        ...state,
        objects: tempObjects,
        undoRedo: tempUndoRedo,
        historyStep: state.historyStep + 1,
      }));
    }
  };
  //----------------------------------------------------------------------
  ///////////////////////////////////////////////////////////
  const setShowTextAreaModal = (val) => {
    setState((state) => ({
      ...state,
      showTextAreaModal: val,
    }));
  };

  // -------------------------------------------------------------------------------------------
  // for undo redo
  // const [position, setPosition] = useState(0);
  let history = [[state.objects]];
  let historyStep = 0;
  const handleUndo = () => {
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    console.log(history);
    console.log(state.objects);
    setState((state) => ({
      ...state,
      objects: previous,
    }));
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    console.log(history);
    console.log(state.objects);
    const next = history[historyStep];
    setState((state) => ({
      ...state,
      objects: next,
    }));
  };
  // ---------------------------------------------------------------------------------------------
  // for resizing
  ///////////////////////////////////////////////////////

  const checkSize = () => {
    console.log("ffffffffffffffffffffffffffffffff");
    if (stageRefParent) {
      const width = (stageRefParent && stageRefParent.current && stageRefParent.current.offsetWidth) || 300;
      setState((state) => ({
        ...state,
        stageWidth: width,
      }));
      const CANVAS_VIRTUAL_WIDTH = 500;
      const CANVAS_VIRTUAL_HEIGHT = 707;

      // for resizing the stage//////////////////////////////////////////////////////
      const scaleX = width / CANVAS_VIRTUAL_WIDTH;
      setState((state) => ({
        ...state,
        stageScale: scaleX,
      }));
      /////////////////////////////////////////////////////////////////////////////////
    } else {
      return;
    }
  };

  useEffect(() => {
    if (stageRefParent) {
      window.addEventListener("resize", checkSize);
    }

    if (!state.showMenu) {
      setState((state) => ({
        ...state,
        mainModalType: "",
      }));
    }
    if (state.selectedObject !== null) {
      setShowmenu(true);
    } else {
      return;
    }
    return () => {
      if (stageRefParent) {
        window.removeEventListener("resize", checkSize);
      }
    };
  }, [state.selectedObject, state.showMenu, stageRefParent]);

  useEffect(() => {
    document.body.classList.add("hide-scroll");

    return () => {
      window.removeEventListener("resize", checkSize);
      document.body.classList.remove("hide-scroll");
    };
  }, []);

  function fitStageIntoParentContainer() {
    var container = stageRefParent && stageRefParent.current;
    var container2 = document.querySelector("#container");
    var canvas = document.getElementsByTagName("canvas")[0];
    // canvas.style.width += 20;
    // canvas.height = container2.offsetHeight;
    // console.log(canvas.width);
    // console.log(container2.offsetWidth);
    // console.log(container2.offsetHeight);

    // now we need to fit stage into parent container
    var containerWidth = container && container.offsetWidth;
    var sceneWidth = container && container.offsetWidth;
    var sceneHeight = container && container.offsetHeight;
    // but we also make the full scene visible
    // so we need to scale all objects on canvas
    var scale = containerWidth / sceneWidth;

    stageRef && stageRef.current && stageRef.current.width && stageRef.current.width(sceneWidth * scale);
    stageRef && stageRef.current && stageRef.current.height && stageRef.current.height(sceneHeight * scale);
    stageRef && stageRef.current && stageRef.current.scale && stageRef.current.scale({ x: scale, y: scale });
    // canvas.offsetWidth = sceneWidth * scale;
    // canvas.offsetHeight = sceneHeight * scale;

    // now you may want to make it visible even on small screens
    // we can just scale it

    let scale2 = 1;

    // // console.log("hiiiiiiiiiiiiii");
    // scale2 = Math.min(
    //   (window.innerWidth / CANVAS_VIRTUAL_WIDTH) *
    //     (containerWidth / sceneWidth),
    //   (window.innerHeight / CANVAS_VIRTUAL_HEIGHT) *
    //     (containerWidth / sceneWidth)
    // );
    console.log(scale2);
    setState((state) => ({
      ...state,
      stageWidth: sceneWidth * scale,
      stageHeight: sceneHeight * scale,
      stageScale: scale2,
    }));
  }

  const showActionMenu = () => {
    // console.log(state.selectedObject !== null);
    if (state.showMenu === false) {
      setShowmenu(true);
    } else if (state.showMenu === true) {
      setShowmenu(false);
    }
  };
  const setMainModalType = (name) => {
    // console.log(state.mainModalType);
    if (name !== " ") {
      setState((state) => ({
        ...state,
        mainModalType: name,
      }));
    }
    // console.log(state.mainModalType);
  };
  const setSubModalType = (name) => {
    // console.log(state.subModalType);
    if (name !== " ") {
      setState((state) => ({
        ...state,
        subModalType: name,
      }));
    }
    // else if (
    //   state.subModalType === "fill" ||
    //   state.subModalType === "opacity" ||
    //   state.subModalType === "stroke" ||
    //   state.subModalType === "border" ||
    //   state.subModalType === "position" ||
    //   state.subModalType === "font styles"
    // ) {
    //   setState((state) => ({
    //     ...state,
    //     subModalType: "",
    //   }));
    // }
    // console.log(state.subModalType);
  };
  const setImageName = (name) => {
    // console.log(state.imageName);
    if (name !== " ") {
      setState((state) => ({
        ...state,
        imageName: name,
      }));
    }
    // console.log(state.imageName);
  };

  const getObject = ({
    type,
    text,
    textType,
    shapeType,
    fontSize,
    fontFamily,
    strokeWidth,
  }) => {
    const typeOfText = (type) => {
      if (type === "title") {
        return "Add a title";
      } else if (type === "subtitle") {
        return "Add a subtitle";
      } else {
        return "Add a body";
      }
    };
    let obj = null;
    switch (type) {
      case "text":
        obj = {
          type: "text",
          x: 150,
          y: 150,
          text: text ? text : typeOfText(textType),
          fontSize: fontSize ? fontSize : 24,
          selected: true,
          width: 200,
          // height: 80,
          fontFamily: fontFamily ? fontFamily : "Arial",
          fill: "#000000",
          strokeWidth: strokeWidth ? strokeWidth : 0,
          stroke: "#000000",
          shadowColor: "#000000",
          align: "center",
          padding: 5,
          letterSpacing: 1,
          lineHeight: 1,
          textDecoration: "none",
          verticalAlign: "top",
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          offsetX: 100,
          offsetY: 0,
          shadowOpacity: 1,
          shadowBlur: 0,
        };
        break;
      case "shape":
        obj = {
          type: "shape",
          x: 34,
          y: 50,
          selected: true,
          cornerRadius: 10,
          /////////
          //cornerRadius
          topLeft: 0,
          topRight: 0,
          bottomLeft: 0,
          bottomRight: 0,
          /////////
          points: [92, 50, 150, 150, 34, 150],
          fill: "white",
          strokeWidth: 1.5,
          stroke: "#000000",
          shadowColor: "black",
          align: "center",
          opacity: 1,
          shadowOpacity: 1,
          shadowBlur: 0,
          width: 100,
          height: 100,
          innerRadius: 15,
          outerRadius: 40,
          numPoints: 5,
          radius: 50,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          shapeType: shapeType,
        };
        break;
      default:
        obj = null;
    }

    return obj;
  };

  const replaceImage = (e) => {
    console.log(e);
    const files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    console.log(e.target.result);
    reader.onload = (e) => {
      setState((state) => ({
        ...state,
        objects: [
          ...state.objects,
          ...(state.objects[state.selectedObject].src = e.target.result),
        ],
      }));
    };
    // imgRef.current.value = "";
  };

  const addObject = ({
    type,
    shapeType = "",
    e,
    index,
    text,
    textType,
    src = "",
    imageType = "",
    imgHeight,
    imgWidth,
    fontSize,
    fontFamily,
    strokeWidth,
  }) => {
    const objects = state.objects;

    if (index !== null) {
      objects[index].selected = false;
      // console.log(imageType);
    }
    if (type === "image" && imageType === "") {
      const files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      console.log(e.target.result);

      reader.onload = (e) => {
        updateUndoRedo({
          index: state.objects.length,
          object: {
            type: "image",
            imageType: "stock",
            selected: true,
            x: 40,
            y: 50,
            fill: "white",
            height: 200,
            width: 200,
            opacity: 1,
            stroke: 0,
            strokeWidth: 0,
            shadowBlur: 0,
            shadowColor: "black",
            shadowOpacity: 1,
            scaleX: 1,
            scaleY: 1,
            src: e.target.result,
          },
          type: "Modified",
        });
        setState((state) => ({
          ...state,
          objects: [
            ...state.objects,
            {
              type: "image",
              imageType: "stock",
              selected: true,
              x: 40,
              y: 50,
              fill: "white",
              height: 200,
              width: 200,
              opacity: 1,
              stroke: 0,
              strokeWidth: 0,
              shadowBlur: 0,
              shadowColor: "black",
              shadowOpacity: 1,
              scaleX: 1,
              scaleY: 1,
              src: e.target.result,
            },
          ],
          selectedObject: state.objects.length,
        }));
      };
      // imgRef.current.value = "";
    } else if (type === "image" && imageType === "pexelsImage") {
      updateUndoRedo({
        index: state.objects.length,
        object: {
          type: "image",
          imageType: imageType,
          selected: true,
          x: 40,
          y: 50,
          fill: "white",
          height: imgHeight ? imgHeight : 300,
          width: imgWidth ? imgWidth : 200,
          opacity: 1,
          stroke: 0,
          strokeWidth: 0,
          shadowBlur: 0,
          shadowColor: "black",
          shadowOpacity: 1,
          scaleX: 1,
          scaleY: 1,
          src: src,
        },
        type: "Modified",
      });
      setState((state) => ({
        ...state,
        objects: [
          ...state.objects,
          {
            type: "image",
            imageType: imageType,
            selected: true,
            x: 40,
            y: 50,
            fill: "white",
            height: imgHeight ? imgHeight : 300,
            width: imgWidth ? imgWidth : 200,
            opacity: 1,
            stroke: 0,
            strokeWidth: 0,
            shadowBlur: 0,
            shadowColor: "black",
            shadowOpacity: 1,
            scaleX: 1,
            scaleY: 1,
            src: src,
          },
        ],
        selectedObject: state.objects.length,
      }));
    } else {
      setState((state) => ({
        ...state,
        objects: [
          ...objects,
          // //////////////////////////////////////////////
          getObject({
            type,
            text,
            textType,
            shapeType,
            fontSize,
            fontFamily,
            strokeWidth,
          }),
          // /////////////////////////////////
        ],
        selectedObject: state.objects.length,
      }));
    }
    // console.log(objects);
  };

  const handleObjectChange = (key, value) => {
    if (state.selectedObject === null) {
      alert("please select a Object");
      return;
    }

    const objects = state.objects;
    objects[state.selectedObject][key] = value;
    objects[state.selectedObject].selected = !false;
    setState((state) => ({
      ...state,
      objects,
    }));
  };

  const selectObject = (index, type) => {
    // console.log(index);
    const objects = state.objects;
    const oldSelected = state.selectedObject;
    // console.log(objects);

    if (oldSelected !== null) {
      objects[oldSelected].selected = false;
    }
    if (index !== null) {
      objects[index].selected = true;
    }
    // if (type === "text") {
    //   // console.log("from 3rd if");
    //   objects[index].selected = false;
    // } else if (oldSelected !== null) {
    //   // console.log("from 1st if");
    //   objects[oldSelected].selected = false;
    //   // objects[index].selected = true;
    // } else if (index !== null && type !== "text") {
    //   // console.log("from 2nd if");
    //   objects[index].selected = true;
    // }

    //////////////////////////////////////////////////////////
    // const template = [...objects,...TemplateOne]
    /////////////////////////////////////////////////////////
    setState((state) => ({
      ...state,
      objects,
      selectedObject: index,
    }));
    // console.log(state);
  };
  const deSelectObject = (index) => {
    const objects = state.objects;
    // console.log(objects[index].selected);
    if (index !== null) {
      objects[index].selected = false;
      setShowmenu(false);
      setState((state) => ({
        ...state,
        objects,
        selectedObject: null,
        mainModalType: "",
        subModalType: "",
      }));
    } else if (index === null) {
      setState((state) => ({
        ...state,
        selectedObject: null,
        mainModalType: "",
        subModalType: "",
      }));
    }
  };

  const deSelectCanvasObject = (index) => {
    const objects = state?.objects;
    // const oldSelected = state.selectedObject;
    // if (oldSelected !== null) {
    //   objects[oldSelected].selected = false;
    // }
    if (index !== null) {
      objects[index].selected = false;
      setState((state) => ({
        ...state,
        objects,
        selectedObject: null,
      }));
    }
  };

  const deleteObject = ({ type, index }) => {
    // console.log(type)
    // console.log(index)
    const id = index;
    if (id != null) {
      const objects = state.objects;
      objects.splice(id, 1);

      if (type === "text") {
        setState((state) => ({
          ...state,
          objects,
          selectedObject: null,
          selectedTextarea: null,
        }));
      } else {
        setState((state) => ({
          ...state,
          objects,
          selectedObject: null,
        }));
      }
    } else {
      alert("please select a Object");
    }
  };

  const onTransform = (target, index, shapeRef) => {
    let object = state.objects[index];
    let objects = state.objects;

    /////////////////////////////////////////////////////////
    let node = null;
    if (object.type !== "text") {
      node = shapeRef.current;
    } else {
      node = shapeRef;
    }
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);
    if (object.type === "shape" && object.shapeType === "rect") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "shape" && object.shapeType === "hexagon") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "shape" && object.shapeType === "pentagon") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "shape" && object.shapeType === "rightArrow") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "shape" && object.shapeType === "triangle") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "text") {
      objects[index].fontSize = Math.max(node.fontSize() * scaleY);
      objects[index].width = Math.max(5, node.width() * scaleX);
      // objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "image" && object.imageType === "pexelsImage") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "image" && object.imageType === "stock") {
      objects[index].width = Math.max(5, node.width() * scaleX);
      objects[index].height = Math.max(node.height() * scaleY);
      target.rotation = 0;
      objects[index].rotation = target.rotation;
    }

    if (object.type === "shape" && object.shapeType === "circle") {
      objects[index].radius = Math.max(node.radius() * scaleY);
      objects[index].rotation = target.rotation;
    }
    if (object.type === "shape" && object.shapeType === "star") {
      objects[index].innerRadius = Math.max(node.innerRadius() * scaleY);
      objects[index].outerRadius = Math.max(node.outerRadius() * scaleY);
      objects[index].rotation = target.rotation;
    }
    // objects[index].radius = (target.scaleX * 100).toFixed(0);

    /////////////////////////////////////////////////////////////////

    setState((state) => ({
      ...state,
      objects,
    }));
  };

  const handleDragEnd = (target, index) => {
    // history = history.slice(0, historyStep + 1);
    let objects = state?.objects;
    objects[index].x = target.x;
    objects[index].y = target.y;
    objects[index].rotation = target.rotation;

    // history = history.concat([state.objects]);
    // historyStep += 1;

    // if( objects[index].type === "text"){
    //   objects[index].fontSize = Math.max(node.fontSize() * scaleY);
    // }

    if (objects[index].type === "image" || objects[index].type === "text") {
      setState((state) => ({
        ...state,
        objects,
      }));
    } else {
      setState((state) => ({
        ...state,
        objects,
      }));
      // selectObject(index);
    }
  };

  const addBackground = (e) => {
    const file = e.target.files[0];
    var fr = new FileReader();

    var img = new Image();
    img.onload = () => {
      let stageWidth = img.width;
      let stageHeight = img.height;
      // stageWidth = stageWidth > maxStageWidth ? maxStageWidth : stageWidth;
      // stageHeight = stageHeight > maxStageHeight ? maxStageHeight : stageHeight;
      stageWidth = maxStageWidth;
      stageHeight = maxStageHeight;

      setState((state) => ({
        ...state,
        backgroundImageSrc: img.src,
        backgroundImageName: img.name,
        stageWidth,
        stageHeight,
      }));
    };
    fr.onload = () => {
      img.name = file.name;
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  };

  const stageOnClick = () => {
    const objects = state.objects;
    //  const index = objects.indexOf((object)=>{return object.selected ===true} )
    const index = state.selectedObject;
    // console.log(index);
    if (index !== undefined && index !== null) {
      // console.log(index);
      if (objects[index].selected === true) {
        objects[index].selected = false;
      }

      setState((state) => ({
        ...state,
        objects,
        selectedObject: null,
      }));
    } else {
      return;
    }
  };

  const returnDataURL = () => {
    deSelectObject(state.selectedObject);
    const dataURL = stageRef.current
      ? stageRef.current.getStage().toDataURL({ pixelRatio: 2 })
      : null;
    // console.log(dataURL)
    return dataURL;
  };

  const getImgDataURL = (ref) => {
    const dataURL = ref.target ? ref.target.toDataURL({ pixelRatio: 1 }) : null;
    // console.log(dataURL);
    return dataURL;
  };

  //   function moveArrayItemToNewIndex(arr, old_index, new_index) {
  //     if (new_index >= arr.length) {
  //         var k = new_index - arr.length + 1;
  //         while (k--) {
  //             arr.push(undefined);
  //         }
  //     }
  //     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  //     return arr;
  // };

  //////////////////////////////////////////////////////////////////////////

  // For Changing Layers and moving forward , backward ,top and bottom

  function forceTransform(target, index, shapeRef) {
    onTransform(target, index, shapeRef);
  }
  function moveIndex(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }

  const layerFunc = ({ type, index }) => {
    const objects = state.objects;
    const selectedItem = objects[index];
    const length = state.objects.length - 1;
    // console.log(length)

    // if (selectedItem.type === "image") {
    //   selectedItem.checkNode();
    // }
    if (type === "bottom") {
      if (index !== 0) {
        const objects2 = moveIndex(objects, index, 0);
        const objects3 = JSON.parse(JSON.stringify(objects2));
        setState((state) => ({
          ...state,
          objects: objects3,
          selectedObject: 0,
        }));
      } else {
        alert("already reached bottom");
      }
    } else if (type === "backward") {
      const preindex = index - 1;
      // console.log(preindex)
      if (preindex > -1) {
        const objects2 = moveIndex(objects, index, preindex);
        const objects3 = JSON.parse(JSON.stringify(objects2));

        setState((state) => ({
          ...state,
          objects: objects3,
          selectedObject: preindex,
        }));
      } else {
        alert("already reached bottom");
      }
    } else if (type === "forward") {
      const postindex = index + 1;
      // console.log(postindex)
      if (postindex <= length) {
        const objects2 = moveIndex(objects, index, postindex);
        const objects3 = JSON.parse(JSON.stringify(objects2));

        setState((state) => ({
          ...state,
          objects: objects3,
          selectedObject: postindex,
        }));
      } else {
        alert("already reached top");
      }
    } else if (type === "top") {
      if (index !== length) {
        const objects2 = moveIndex(objects, index, length);
        const objects3 = JSON.parse(JSON.stringify(objects2));
        setState((state) => ({
          ...state,
          objects: objects3,
          selectedObject: length,
        }));
      } else {
        alert("already reached top");
      }
    } else {
      return;
    }
  };

  /////////////////////////////////////////////////////////////////////////////

  //for Templates:

  const addTemplate = (templateObj) => {
    // const objects = state.objects;
    // console.log(objects)

    const template = JSON.parse(JSON.stringify(templateObj));
    // console.log(template);
    setState((state) => ({
      ...state,
      objects: template,
      selectedObject: null,
    }));

    //  else {
    //   const template = [...objects, ...TemplateTwo];
    //   setState((state) => ({
    //     ...state,
    //     objects: template,
    //     selectedObject: index,
    //   }));
    //   console.log(state);
    // }
  };

  const deleteALL = () => {
    const objarr = JSON.parse(JSON.stringify(state.objects));
    if (state.selectedObject !== null) {
      objarr[state.selectedObject].selected = false;
    } else {
      for (var i = 0; i < objarr.length; i++) {
        objarr[i].selected = false;
      }
    }
    setState((state) => ({
      ...state,
      objects: objarr,
      selectedObject: null,
    }));
    setState((state) => ({
      ...state,
      objects: [],
      selectedObject: null,
    }));
  };

  const name = () => {
    console.log("ADNAN");
  };

  /////////////////////////////////////////////////////////////////////////////

  // for contenttype
  const setContent = (type) => {
    setState((state) => ({
      ...state,
      contentType: type,
    }));
  };
  // for contenttype

  const duplicate = (oldobjarr, selectedObj) => {
    if (state.selectedObject === null) {
      alert("please select an object");
    } else {
      //deepcloning the provided array
      let oldobjarr_2 = JSON.parse(JSON.stringify(oldobjarr));
      //adding the element to be duplicated to the newobjarr array
      let newobjarr = [...oldobjarr_2, selectedObj];
      // running a forEach loop over the newobjarr array to mark all the elements.selected to be false
      // newobjarr.forEach((element) => {
      //   element.selected = false;
      // });
      newobjarr[state.selectedObject].selected = false;

      // making the cloned object.selected to be true
      newobjarr[newobjarr.length - 1].selected = true;
      // changing the x and y coordinates of the cloned object to avoid overlapping of the cloned object over the base object..
      newobjarr[newobjarr.length - 1].x += 20;
      newobjarr[newobjarr.length - 1].y += 20;

      //setting the state as per our changes.
      setState((state) => ({
        ...state,
        objects: JSON.parse(JSON.stringify(newobjarr)),
        selectedObject: newobjarr.length - 1,
      }));
    }
  };
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    const oldobjarr = state.objects;
    // if (state.selectedObject === null) {
    //   return;
    // } else
    if (clickedOnEmpty) {
      let oldobjarr_2 = JSON.parse(JSON.stringify(oldobjarr));
      oldobjarr_2.forEach((element) => {
        element.selected = false;
      });
      setState((state) => ({
        ...state,
        objects: oldobjarr_2,
        selectedObject: null,
      }));
    }

    // if (clickedOnEmpty) {
    //   setState((state) => ({
    //     ...state,
    //     selectedObject: null,
    //   }));
    // } else {
    //   return;
    // }
  };

  // lets think you want to make all your objects visible in
  // 700x700 scene

  // now you may want to make it visible even on small screens
  // we can just scale it

  let scale = 1;

  const horizontalFlip = (e) => {
    const Object = state.objects[state.selectedObject];
    console.log(Object);
    console.log(e);

    const oldobjarr = state.objects;
    let oldobjarr_2 = JSON.parse(JSON.stringify(oldobjarr));
    const updatedObject = {
      ...Object,
      offsetX: Object.width / 2,
      scaleX: -Object.scaleX,
      rotation: 0,
      // x: Object.width - Object.x,
    };
    oldobjarr_2[state.selectedObject] = updatedObject;
    setState((state) => ({
      ...state,
      objects: oldobjarr_2,
    }));
  };

  const verticalFlip = () => {
    const Object = state.objects[state.selectedObject];
    const updatedObject = {
      ...Object,
      scaleY: -Object.scaleY,
      // y: Object.width - Object.y,
    };
    state.objects[state.selectedObject] = updatedObject;
  };

  // for canvas zoom in zoom out

  const scaleRelativeToPoint = (point, increaseScale) => {
    const scaleBy = 1.02;
    const stage = stageRef.current;
    const oldScaleX = stage.scaleX();
    const oldScaleY = stage.scaleY();
    const mousePointTo = {
      x: point.x / oldScaleX - stage.x() / oldScaleX,
      y: point.y / oldScaleY - stage.y() / oldScaleY,
    };
    const newScale = increaseScale ? oldScaleY * scaleBy : oldScaleY / scaleBy;
    setState((state) => ({
      ...state,
      scale: newScale,
      x: (point.x / newScale - mousePointTo.x) * newScale,
      y: (point.y / newScale - mousePointTo.y) * newScale,
    }));
  };

  const handleWheel = (e) => {
    // e.evt.preventDefault();
    // scaleRelativeToPoint(
    //   e.target.getStage().getPointerPosition(),
    //   e.evt.deltaY < 0
    // );
  };

  const {
    imageName,
    objects,
    src,
    backgroundImageSrc,
    stageWidth,
    stageHeight,
    selectedObject,
    triggerCors,
    contentType,
  } = state;

  return (
    <>
      <EditorCtx.Provider
        value={{
          state: state,
          showMenu: state.showMenu,
          showTextAreaModal: state.showTextAreaModal,
          addObject: addObject,
          checkSize: checkSize,
          positionFunc: layerFunc,
          duplicateFunc: duplicate,
          addTemplate: addTemplate,
          setShowmenu: setShowmenu,
          showActionMenu: showActionMenu,
          deSelectObject: deSelectObject,
          setSubModalType: setSubModalType,
          setMainModalType: setMainModalType,
          handleShapeProperties: handleObjectChange,
          setShowTextAreaModal: setShowTextAreaModal,
          handleUndo: handleUndo,
          handleRedo: handleRedo,
          replaceImage: replaceImage,
          horizontalFlip: horizontalFlip,
          verticalFlip: verticalFlip,
          pushUndoRedo: pushUndoRedo,
          undo: undo,
          redo: redo,
          updateUndoRedo: updateUndoRedo,
        }}
      >
        {/* <NavBar
          id="navbar"
          homeIcon={Home}
          download={true}
          downloadIcon={downloadIcon}
          downloadElement={
            <>
              <Download
                state={state}
                deSelectObject={deSelectObject}
                style={{ marginRight: "20px" }}
                dataURL={returnDataURL}
                width={stageWidth}
                height={stageHeight}
              />
              <button
                onClick={() => {
                  console.log(state.objects);
                }}
              >
                objects stack
              </button>
              <button
                onClick={() => {
                  console.log(state.undoRedo);
                }}
              >
                undoRedo stack
              </button>
              <button
                onClick={() => {
                  console.log(state.historyStep);
                }}
              >
                historyStep
              </button>
            </>
          }
          linkText="/pamphlet/create/editor-home"
        /> */}
        <div className="flex h-screen bg-gray-100 overflow-hidden">
          {/* Left Navigation Sidebar */}
          <div className="w-20 bg-gray-900 flex-shrink-0 flex flex-col">
            <SideBar
              setContent={setContent}
              state={state}
              getImgDataURL={getImgDataURL}
              addObject={addObject}
              imgRef={imgRef}
              clientID={clientID}
              imageName={imageName}
              setImageName={setImageName}
              handleShapeProperties={handleObjectChange}
              shape={objects[selectedObject]}
              contentType={contentType}
            />
          </div>
          
          {/* Content Sidebar */}
          <div className="w-80 bg-white border-r border-gray-300 overflow-y-auto flex-shrink-0 shadow-sm">
            <SideBarContent
              getImgDataURL={getImgDataURL}
              addObject={addObject}
              state={state}
              imgRef={imgRef}
              clientID={clientID}
              imageName={imageName}
              addTemplate={addTemplate}
              updateUndoRedo={updateUndoRedo}
              setImageName={setImageName}
              handleShapeProperties={handleObjectChange}
              shape={objects[selectedObject]}
              contentType={contentType}
            />
          </div>
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Top Navigation Bar */}
            <div className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <MdMenu className="w-6 h-6 text-gray-600" />
                <span className="text-lg font-semibold text-gray-800">Design name</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800 font-medium">For developers</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  Beautify
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 font-medium">
                  <MdGetApp className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
                  <MdNotifications className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            {/* Modern Toolbar */}
            <div className="w-full">
              <ModernToolbar
                state={state}
                selectedObject={selectedObject}
                shape={state.objects[selectedObject]}
                onDeleteObject={() => {
                  if (selectedObject !== null) {
                    deleteObject({
                      type: state.objects[selectedObject].type,
                      index: selectedObject,
                    });
                  }
                }}
                onDuplicateObject={() => {
                  if (selectedObject !== null) {
                    duplicate(state.objects, state.objects[selectedObject]);
                  }
                }}
              />
            </div>
            {/* Canvas Area */}
            <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                {/* Canvas Container */}
                <div className="bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden w-full h-full flex items-center justify-center">
                  <Stage
                    className="[&>canvas]:bg-white"
                    onMouseDown={(e) => {
                      checkDeselect(e);
                    }}
                    onWheel={(e) => {
                      handleWheel(e);
                    }}
                    onTouchStart={(e) => {
                      checkDeselect(e);
                    }}
                    scaleX={state.stageScale}
                    scaleY={state.stageScale}
                    width={Math.min(800, window.innerWidth - 500)}
                    x={state.x}
                    y={state.y}
                    height={Math.min(600, (window.innerWidth - 500) * 0.75)}
                    ref={stageRef}
                  >
                <Layer>
                  <CanvasImage
                    src={
                      backgroundImageSrc ? backgroundImageSrc : src
                    }
                    width={Math.min(800, window.innerWidth - 500)}
                    triggerCors={triggerCors}
                    height={Math.min(600, (window.innerWidth - 500) * 0.75)}
                  />
                  {objects &&
                    objects.map((object, index) => {
                      if (object === undefined) {
                        return null;
                      } else if (object.type === "image") {
                        return (
                          <AddedImage
                            image={object}
                            showActionMenu={showActionMenu}
                            state={state}
                            src={object.src}
                            properties={object.properties}
                            handleDragEnd={handleDragEnd}
                            index={index}
                            updateUndoRedo={updateUndoRedo}
                            selectedImage={selectObject}
                            handleShapeChange={handleObjectChange}
                            onTransform={onTransform}
                            deleteImage={() =>
                              deleteObject({
                                type: "image",
                                index,
                              })
                            }
                          />
                        );
                      } else if (object.type === "text") {
                        return (
                          <CanvasText
                            scaleX={state.stageScale}
                            scaleY={state.stageScale}
                            input={object}
                            showActionMenu={showActionMenu}
                            setShowmenu={setShowmenu}
                            handleDragEnd={handleDragEnd}
                            deSelectObject={deSelectObject}
                            selected={objects[selectedObject]}
                            handleTextChange={handleObjectChange}
                            index={index}
                            key={index}
                            stageRef={stageRef}
                            state={state}
                            setState={setState}
                            updateUndoRedo={updateUndoRedo}
                            stageRefParent={stageRefParent}
                            selectedText={selectObject}
                            onTransform={onTransform}
                            deleteText={() =>
                              deleteObject({
                                type: "text",
                                index,
                              })
                            }
                          />
                        );
                      } else if (object.type === "shape") {
                        return (
                          <EditorCtx.Provider
                            value={{
                              showActionMenu: showActionMenu,
                            }}
                          >
                            <Shapes
                              scale={state.stageScale}
                              shape={object}
                              index={index}
                              state={state}
                              updateUndoRedo={updateUndoRedo}
                              key={index}
                              scaleX={scale}
                              scaleY={scale}
                              deSelectObject={deSelectObject}
                              handleShapeChange={handleObjectChange}
                              selectedShape={selectObject}
                              selected={objects[selectedObject]}
                              deleteShape={() =>
                                deleteObject({
                                  type: "shape",
                                  index,
                                })
                              }
                              // handleDragStart={handleDragStart}

                              handleDragEnd={handleDragEnd}
                              onTransform={onTransform}
                            />
                          </EditorCtx.Provider>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Layer>
                  </Stage>
                </div>
                

              </div>
              
              {/* Control Panel - Right Side */}
              <div className="absolute bottom-6 right-6 flex flex-col space-y-4">
                {/* Zoom Controls */}
                <div className="bg-white shadow-lg rounded-xl border border-gray-200 px-4 py-2 flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-center">100%</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
                    </svg>
                  </button>
                </div>

                {/* Pages Control */}
                <div className="bg-white shadow-lg rounded-xl border border-gray-200 px-4 py-2 flex items-center space-x-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-900">1 / 1</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Fit to Screen Control */}
                <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group" title="Fit to Screen">
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a2 2 0 012-2h2M4 16v4a2 2 0 002 2h2m8-20h2a2 2 0 012 2v2m0 8v4a2 2 0 01-2 2h-2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Bottom Floating Toolbar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white shadow-2xl rounded-2xl border border-gray-200 px-6 py-3 flex items-center space-x-6 backdrop-blur-sm bg-opacity-95">
            {/* Zoom Out */}
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9" />
              </svg>
            </button>
            
            {/* Zoom Level */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">100%</span>
            </div>
            
            {/* Zoom In */}
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-gray-200"></div>
            
            {/* Fit to Screen */}
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group" title="Fit to Screen">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a2 2 0 012-2h2M4 16v4a2 2 0 002 2h2m8-20h2a2 2 0 012 2v2m0 8v4a2 2 0 01-2 2h-2" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-gray-200"></div>
            
            {/* Previous Page */}
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Page Counter */}
            <span className="text-sm font-medium text-gray-900 px-2">1 / 1</span>
            
            {/* Next Page */}
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </EditorCtx.Provider>
    </>
  );
};
export default MemeGenerator;
