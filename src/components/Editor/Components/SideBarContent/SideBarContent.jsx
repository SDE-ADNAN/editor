/* eslint-disable no-unused-vars */
// import { Paper } from "@mui/material"; // Replaced with div
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

import { 
  FaSquare, 
  FaCircle, 
  FaStar, 
  FaPlay 
} from "react-icons/fa";
import { 
  MdCropSquare, 
  MdRadioButtonUnchecked,
  MdStarBorder 
} from "react-icons/md";
import TextSection from "./TextSection";
import ShapesSection from "./ShapesSection";

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
    if (debouncedInputValue) {
      getImagesPexels(debouncedInputValue)
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
          <ShapesSection 
            addObject={props.addObject}
            state={props.state}
          />
        );
        break;
      case "templates":
        content = (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Templates</h2>
              <p className="text-sm text-gray-600">Choose a template to get started</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {templates &&
                templates.map((template, index) => {
                  if (template && templates.length > 0) {
                    return (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 hover:border-gray-300"
                        onClick={() => props.addTemplate(template.obj)}
                      >
                        <div className="aspect-square mb-2 overflow-hidden rounded-md">
                          <img
                            src={template.img}
                            alt={`Template ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-600 text-center">Template {index + 1}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="text-center py-8 text-gray-500">
                        No templates to show
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        );
        break;
      case "text":
        content = (
          <TextSection 
            addObject={props.addObject}
            updateUndoRedo={props.updateUndoRedo}
            selectedObject={props.state.selectedObject}
            objectsLength={props.state.objects.length}
          />
        );
        break;
      case "import":
        content = (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload</h2>
              <p className="text-sm text-gray-600">Add images to your design</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  show
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setShow(true)}
              >
                Stock Images
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  !show
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setShow(false)}
              >
                Upload
              </button>
            </div>

            {show && (
              <div>
                {/* Search Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search for images..."
                    value={searchText}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {photos.length > 0 ? (
                    photos.map((photo, index) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          addPexelImg({
                            type: "image",
                            dataUri: photo.src.large2x,
                            height: photo.height,
                            width: photo.width,
                          });
                        }}
                      >
                        <img
                          src={photo.src.medium}
                          alt={photo.alt || "Stock photo"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      <p>Search for images above</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!show && (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors">
                  <div className="mb-4">
                    <img src={ImportImages} alt="Upload" className="mx-auto w-12 h-12 opacity-50" />
                  </div>
                  <label className="cursor-pointer">
                    <span className="text-sm text-gray-600 hover:text-gray-800">
                      Click to upload an image
                    </span>
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
                      accept="image/*"
                      hidden
                    />
                  </label>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports: JPG, PNG, GIF, WebP
                  </p>
                </div>
              </div>
            )}
          </div>
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
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Background</h2>
              <p className="text-sm text-gray-600">Choose a background color</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  show
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setShow(true)}
              >
                Solid
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium ${
                  !show
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setShow(false)}
              >
                Gradient
              </button>
            </div>

            {show && (
              <div className="grid grid-cols-4 gap-3">
                {solidColors.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                    onClick={(e) => colorfill(e, color)}
                    title={color}
                  />
                ))}
              </div>
            )}

            {!show && (
              <div className="grid grid-cols-2 gap-3">
                {gradientColors.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ background: color }}
                    onClick={(e) => colorfill(e, color)}
                    title={`Gradient ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        );
        break;
      default:
        content = null;
    }
    return content;
  };
  return (
    <div className="h-full bg-white">
      {getContent()}
    </div>
  );
}

export default SideBarContent;
