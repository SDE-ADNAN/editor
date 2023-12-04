/* eslint-disable no-unused-vars */
import { Paper } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ShapeCard from "../../../EditorDesign/Cards/ShapeCard";
import {
  TemplateFive,
  TemplateFour,
  TemplateOne,
  TemplateSix,
  TemplateThree,
  TemplateTwo,
} from "../constants";
import ShapesProperties from "../ObjectsProperties";
import "./SideBarContent.css";
import SideBarTemplateContent from "./SideBarContentCard";
import FillCard from "../../../EditorDesign/Cards/FillCard";
import ImportImages from "../TopActionsTab/images/importImages.png";
import { EditorCtx } from "../MainEditor";
import templateOneImage from "../Templates/Template1/templateOne.png";
import templateTwoImage from "../Templates/Template2/templatetwo.png";
import templateThreeImage from "../Templates/Template3/TemplateThree.png";
import templateFourImage from "../Templates/Template4/templatefour.png";
import templateFiveImage from "../Templates/Template5/templatefive.png";
import templateSixImage from "../Templates/Template6/templatesix.png";
import { API_URL } from "../../../../constant/apiURL";
import BookMarkSVG from "../../../../media/shapes_SVGS/BookMarkSVG";
import ObtuseTriangleSVG from "../../../../media/shapes_SVGS/ObtuseTriangleSVG";
import TrapeziumSVG from "../../../../media/shapes_SVGS/TrapeziumSVG";
import ParallelogramSVG from "../../../../media/shapes_SVGS/ParallelogramSVG";
import KiteSVG from "../../../../media/shapes_SVGS/KiteSVG";
import OctagonSVG from "../../../../media/shapes_SVGS/OctagonSVG";
import PlusSVG from "../../../../media/shapes_SVGS/PlusSVG";
import RightTriangleSVG from "../../../../media/shapes_SVGS/RightTriangleSVG";
import RightArrowSVG from "../../../../media/shapes_SVGS/RightArrowSVG";
import PentagonSVG from "../../../../media/shapes_SVGS/PentagonSVG";
import HexagonSVG from "../../../../media/shapes_SVGS/HexagonSVG";
import TriangleSVG from "../../../../media/shapes_SVGS/TriangleSVG";
import StarSVG from "../../../../media/shapes_SVGS/StarSVG";
import CircleSVG from "../../../../media/shapes_SVGS/CircleSVG";
import SquareSVG from "../../../../media/shapes_SVGS/SquareSVG";

const keywords = [
  "cars",
  "table",
  "office",
  "sky",
  "iphones",
  "abstract",
  "illustration",
  "trees",
  "waterfall",
  "mountain",
  "grass",
  "bikes",
  "bottle",
  "svg",
];
const solidColors = [
  "#599CFF",
  "#FFFFFF",
  "#FF1F1F",
  "#FFE81E",
  "#E7EAEE",
  "#FFA51F",
  "#D2FF1E",
  "#F281C4",
  "#4516FF",
  "#87FFFC",
  "#32CCBC",
  "#AF48FF",
];
const gradientColors = [
  "linear-gradient(135deg, #FDEB71 0%, #F8D800 100%)",
  "linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)",
  "linear-gradient(135deg, #FEB692 0%, #EA5455 100%)",
  "linear-gradient(135deg, #CE9FFC 0%, #7367F0 100%)",
  "linear-gradient(135deg, #90F7EC 0%, #32CCBC 100%)",
  "linear-gradient(135deg, #FFF6B7 0%, #F6416C 100%)",
  "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
  "linear-gradient(135deg, #E2B0FF 0%, #9F44D3 100%)",
  "linear-gradient(135deg, #FFD26F 0%, #3677FF 100%)",
  "linear-gradient(135deg, #F1CA74 0%, #A64DB6 100%)",
  "linear-gradient(135deg, #52E5E7 0%, #130CB7 100%)",
  "linear-gradient(135deg, #C2FFD8 0%, #465EFB 100%)",
];

const templates = [
  {
    img: templateOneImage,
    obj: TemplateOne
  },
  {
    img: templateTwoImage,
    obj: TemplateTwo
  },
  {
    img: templateThreeImage,
    obj: TemplateThree
  },
  {
    img: templateFourImage,
    obj: TemplateFour
  },
  {
    img: templateFiveImage,
    obj: TemplateFive
  },
  {
    img: templateSixImage,
    obj: TemplateSix
  },
]

function SideBarContent(props) {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([...photos]);
  const [imgLoading, setImgLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [templatesArr, setTemplatesArr] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [searchText, setSearchText] = useState("abstract");
  const [debouncedInputValue, setDebouncedInputValue] = React.useState("abstract");
  // const [templateImg, setTemplateImg] = useState("");

  const inputFileRef = useRef();
  const tempNameRef = useRef();

  const Ctx = useContext(EditorCtx);

  const colorfill = (e, value) => {
    props.handleShapeProperties("fill", value);
  };

  const imgChangeHandler = (event) => {
    props.setImageName(event.target.innerText);
  };

  const print = (e) => {
    e.preventDefault();
  };

  const addPexelImg = ({ type = "", e, dataUri = "", height, width }) => {
    props.addObject({
      type: type,
      e,
      index: props.state.selectedObject,
      src: dataUri,
      imageType: "pexelsImage",
      imgHeight: height,
      imgWidth: width,
    });
  };

  const jsonStrHandler = () => {
    let enteredFile = inputFileRef.current.files[0];
    let formData1 = new FormData();
    formData1.append("name", templateName);
    formData1.append("template_str", JSON.stringify(props.state.objects));
    formData1.append("template_image", enteredFile);
    fetch(API_URL + "editor_templates/create/", {
      method: "POST",
      body: formData1,
    }).then((res) => {
      console.log(res.ok);
    });
  };

  const getImagesPexels = (keyword) => {
    const pexels = `https://api.pexels.com/v1/search?query=${keyword}&per_page=80`;
    fetch(pexels, {
      method: "GET",
      headers: {
        Authorization: `4yTHjR7enJZxkDAZTMvVyIP96BDEN7tRy6OZc3ro1QjIvzA8sp26sYRK`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          let imgs = JSON.parse(JSON.stringify(data));
          setPhotos(imgs.photos);
        });
      }
    });
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchText);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  
  useEffect(() => {
    // getTemplates();
    if(debouncedInputValue){
      // getImagesPexels(debouncedInputValue)
    }
  }, [debouncedInputValue]);

  // setTimeout(() => {
  //   console.log(photos);
  //   setFilteredPhotos(photos);
  // }, 1);

  // const validTagImg = (item, keyword) => {
  //   return item?.tags.includes(keyword.toLowerCase());
  // };

  // exclude column list from filter
  const excludeColumns = ["id", "image"];

  // filter func
  const filterData = (arr, keyword) => {
    const lowercasedValue = keyword.toLowerCase().trim();
    let arr2 = JSON.parse(JSON.stringify(arr));
    if (keyword === " " || keyword === "") {
      setFilteredPhotos(photos);
      setImgLoading(false);
    } else {
      let result = arr2.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setFilteredPhotos(result);
    }
  };

  // handle change event of search input
  const handleChange = (value) => {
    setSearchText(value);
    filterData(photos, value);
  };
  const getContent = (type) => {
    let content;

    switch (props.contentType) {
      case "shapes":
        content = (
          <>
            <div className="bg">
              <div className="shape-flex">
                <div>
                  <h1 className="template-heading">Shapes</h1>
                </div>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "rect",
                        },
                        type: "Modified",
                      });

                      Ctx.showActionMenu();
                      props.addObject({
                        type: "shape",
                        shapeType: "rect",
                        index: props.state.selectedObject,
                      });
                    }}
                  >
                    <SquareSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "circle",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          radius: 50,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "circle",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <CircleSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "star",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          innerRadius: 15,
                          outerRadius: 40,
                          numPoints: 5,
                          points: [92, 50, 150, 150, 34, 150],
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "star",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <StarSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "triangle",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "triangle",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <TriangleSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "hexagon",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "hexagon",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <HexagonSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "pentagon",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "pentagon",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <PentagonSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "rightArrow",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "rightArrow",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <RightArrowSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "rightTriangle",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "rightTriangle",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <RightTriangleSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "plusShape",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "plusShape",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <PlusSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "octagon",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "octagon",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <OctagonSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "trapezium",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "trapezium",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <TrapeziumSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "kite",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "kite",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <KiteSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "parallelogram",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "parallelogram",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <ParallelogramSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "rhombus",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "rhombus",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <TrapeziumSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "scaleneTriangle",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "scaleneTriangle",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <ObtuseTriangleSVG/>
                  </div>
                </ShapeCard>
                <ShapeCard>
                  <div
                    className="shapeCard-child-div"
                    onClick={() => {
                      props.addObject({
                        type: "shape",
                        shapeType: "tag",
                        index: props.state.selectedObject,
                      });
                      Ctx.updateUndoRedo({
                        index: props.state.objects.length,
                        object: {
                          type: "shape",
                          x: 34,
                          y: 50,
                          selected: false,
                          cornerRadius: 10,
                          topLeft: 0,
                          topRight: 0,
                          bottomLeft: 0,
                          bottomRight: 0,
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
                          rotation: 0,
                          scaleX: 1,
                          scaleY: 1,
                          shapeType: "tag",
                        },
                        type: "Modified",
                      });
                    }}
                  >
                    <BookMarkSVG/>
                  </div>
                </ShapeCard>
              </div>
            </div>
          </>
        );
        break;
      case "templates":
        content = (
          <>
            {/* <div className="bg"> */}
            <div className="bg-template ">
              {/* <div>
                <input
                  placeholder="enter template name"
                  type="text "
                  onChange={(e) => {
                    setTemplateName(e.target.value);
                  }}
                ></input>
                <TextField
                  inputRef={inputFileRef}
                  type="file"
                  inputProps={{
                    accept:
                      "application/x-photoshop, application/octet-stream, image/vnd.adobe.photoshop, application/x-coreldraw, image/*, application/pdf, .cdr",
                  }}
                  id="file"
                  variant="outlined"
                  required
                >
                  template file
                </TextField>
                <button
                  onClick={() => {
                    if (props.state.selectedObject === null) {
                      jsonStrHandler();
                    } else {
                      alert("pehle deselect karo ");
                    }
                  }}
                >
                  send json string
                </button>
              </div> */}
              <div>
                <h1 className="template-heading">Templates</h1>
              </div>
              <div style={{ width: "100%", height: "70vh" }}>
                <div className="template-flex">
                  {templates &&
                    templates.map((template, index) => {
                      if (template && templates.length > 0) {
                        return (
                          <SideBarTemplateContent
                            index={index}
                            template={true}
                            src={template.img}
                            templateObj={template.obj}
                          />
                        );
                      } else {
                        return (
                          <div className="blink_me" style={{ color: "yellow" }}>
                            {" "}
                            no templates to show
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </div>
            {/* </div> */}
          </>
        );
        break;
      case "text":
        content = (
          <>
            <div className="bg">
              <div>
                <h1 className="template-heading">Click to add text</h1>
              </div>
              <div className="flex">
                <div
                  className="title"
                  onClick={(e) => {
                    props.addObject({
                      type: "text",
                      text: title,
                      textType: "title",
                      fontSize: 56,
                      fontFamily: "Arial",
                      strokeWidth: 0,
                      index: props.state.selectedObject,
                    });
                    props.updateUndoRedo({
                      index: props.state.objects.length,
                      object: {
                        type: "text",
                        x: 150,
                        y: 150,
                        text: "Add a Title",
                        fontSize: 56,
                        selected: true,
                        width: 200,
                        // height: 80,
                        fontFamily: "Arial",
                        fill: "#000000",
                        strokeWidth: 0,
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
                      },
                      type: "Modified",
                    });
                    e.preventDefault();
                    // console.log(title);
                  }}
                >
                  Click to Add a Title
                </div>
                <div
                  className="subtitle"
                  onClick={(e) => {
                    props.addObject({
                      type: "text",
                      text: subtitle,
                      textType: "subtitle",
                      fontSize: 32,
                      fontFamily: "Arial",
                      strokeWidth: 0,
                      index: props.state.selectedObject,
                    });
                    props.updateUndoRedo({
                      index: props.state.objects.length,
                      object: {
                        type: "text",
                        x: 150,
                        y: 150,
                        text: "Add a subtitle",
                        textType: "subtitle",
                        fontSize: 32,
                        selected: true,
                        width: 200,
                        // height: 80,
                        fontFamily: "Arial",
                        fill: "#000000",
                        strokeWidth: 0,
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
                      },
                      type: "Modified",
                    });
                    e.preventDefault();
                  }}
                >
                  Click to Add a subtitle
                </div>
                <div
                  className="body-t"
                  onClick={(e) => {
                    props.addObject({
                      type: "text",
                      textType: "body",
                      text: body,
                      fontSize: 22,
                      fontFamily: "Arial",
                      strokeWidth: 0,
                      index: props.state.selectedObject,
                    });
                    props.updateUndoRedo({
                      index: props.state.objects.length,
                      object: {
                        type: "text",
                        x: 150,
                        y: 150,
                        text: "Add a body",
                        textType: "body",
                        fontSize: 22,
                        selected: true,
                        width: 200,
                        // height: 80,
                        fontFamily: "Arial",
                        fill: "#000000",
                        strokeWidth: 0,
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
                      },
                      type: "Modified",
                    });
                    e.preventDefault();
                    // console.log(e.target);
                  }}
                >
                  Click to Add a body
                </div>
              </div>
            </div>
          </>
        );
        break;
      case "import":
        content = (
          <>
            <div className="bg">
              <div>
                <h1 className="template-heading">Import Images</h1>
              </div>
              <div className="opt-flex">
                <div
                  className={!show ? "opt-text" : "opt-text-selected"}
                  onClick={() => setShow(true)}
                >
                  From Stock Images
                </div>
                <div
                  className={show ? "opt-text" : "opt-text-selected"}
                  onClick={() => setShow(false)}
                >
                  From Device
                </div>
              </div>
              {/* {imgLoading && <p style={{ marginTop: "20px" }}> Loading... </p>} */}
              {show && (
                <div className="browse-image" style={{ marginTop: 30 }}>
                  {/* <a href="https://unsplash.com/" target="_blank">
                    <label className="import-button">
                      <span className="import-button-text">Browse on web</span>
                      <Form.Control type="button" hidden />
                    </label>
                  </a> */}
                  <div className="search-filter" style={{ marginBottom: 10 }}>
                    <span>Search:</span>
                    <input
                      style={{ marginLeft: 5, flex: 1 }}
                      type="text"
                      placeholder="Type to search..."
                      value={searchText}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                  <Paper elevation={0} className="import-paper">
                    {photos.length > 0 &&
                      photos.map((photo, index) => {
                        if (photo) {
                          return (
                            <SideBarTemplateContent
                              style={{ margin: "30px" }}
                              addPexelImg={addPexelImg}
                              width={300}
                              height={300}
                              onClick={(event) => {
                                props.getImgDataURL(event);
                              }}
                              key={index}
                              src={photo.src.large2x}
                              template={false}
                              name={photo.name}
                            />
                          );
                        } else {
                          // return <p> Loading... </p>;
                        }
                      })}
                  </Paper>
                </div>
              )}
              {!show && (
                <div className="from-device-import-section-flex">
                  <div className="from-device-import-section">
                    <div className="import-img">
                      <img src={ImportImages} alt="import"></img>
                    </div>
                    <label className="import-button">
                      <span className="import-button-text">Upload File</span>
                      <Form.Control
                        type="file"
                        ref={props.imgRef}
                        onChange={(e) => {
                          props.addObject({
                            type: "image",
                            e,
                            index: props.state.selectedObject,
                          });
                        }}
                        hidden
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </>
        );
        break;
      case "styles":
        content = (
          <>
            <div className="bg">
              <div style={{ fontSize: "2vw" }}>Object Properties</div>
              {props.state.selectedObject === null && (
                <div
                  className="blink_me"
                  style={{
                    padding: "20px",
                    display: "block",
                    fontSize: "1.2vw",
                    fontWeight: "bolder",
                    color: "yellow",
                  }}
                >
                  please add / select any object to edit properties....
                </div>
              )}
              {props.state.selectedObject !== null && (
                <ShapesProperties
                  handleShapeProperties={props.handleShapeProperties}
                  shape={props.shape}
                />
              )}
            </div>
          </>
        );
        break;
      case "bg-color":
        content = (
          <>
            <div className="bg">
              <div>
                <h1 className="template-heading">Background Color</h1>
              </div>
              <div className="opt-flex">
                <div
                  className={!show ? "opt-text" : "opt-text-selected"}
                  onClick={() => setShow(true)}
                >
                  Solid Color
                  {show && <div className="under-line-2"></div>}
                </div>
                <div
                  className={show ? "opt-text" : "opt-text-selected"}
                  onClick={() => setShow(false)}
                >
                  Gradiant color
                  {!show && <div className="under-line-2"></div>}
                </div>
              </div>
              {show && (
                <>
                  <div style={{ margin: "20px" }} className="bg-color-flex">
                    {solidColors.map((color, index) => {
                      return (
                        <>
                          <div>
                            <FillCard
                              color={color}
                              index={index}
                              show={show}
                              onclick={colorfill}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
              {!show && (
                <>
                  <div style={{ margin: "20px" }} className="bg-color-flex">
                    {gradientColors.map((color, index) => {
                      return (
                        <>
                          <div>
                            <FillCard color={color} index={index} show={show} />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        );
        break;
      default:
        content = null;
    }
    return content;
  };
  return <>{getContent()}</>;
}

export default SideBarContent;
