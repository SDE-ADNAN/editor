import { Paper, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ShapeCard from "../../../EditorDesign/Cards/ShapeCard";
import { clientID } from "../constants";
import ShapesProperties from "../ObjectsProperties";
import "./SideBarContent.css";
import SideBarTemplateContent from "./SideBarContentCard";
import Star from "./star.png";
import Triangle from "./triangle.png";
import Rect from "./Rect.png";
import FillCard from "../../../EditorDesign/Cards/FillCard";
import ImportImages from "../TopActionsTab/images/importImages.png";
import { Button } from "react-bootstrap";

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

function SideBarContentMD(props) {
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");

  const colorfill = (e, value) => {
    props.handleShapeProperties("fill", value);
  };

  const imgChangeHandler = (event) => {
    // console.log(event.target.innerText)
    props.setImageName(event.target.innerText);
  };

  const print = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
  };

  const addPexelImg = ({ type = "", e, dataUri = "" }) => {
    props.addObject({
      type: type,
      e,
      index: props.state.selectedObject,
      src: dataUri,
      imageType: "pexelsImage",
    });
  };

  useEffect(() => {
    getImagesUnsplash(props.imageName);
  }, [props.imageName]);

  const getImagesUnsplash = (keyword) => {
    // const urlUnsplash =
    //   `https://api.unsplash.com/photos?page=${Math.floor(100 + Math.random() * 900)}`;
    // // search/photos?page=1&query="+props.imageName+"&"+props.clientID
    // fetch(urlUnsplash,{
    //   method: "GET",
    //   headers: {

    //     Authorization: `Client-ID ${clientID}`,
    //   },
    const pexels = `https://api.pexels.com/v1/search?query=${keyword}&per_page=80`;
    // search/photos?page=1&query="+props.imageName+"&"+props.clientID
    fetch(pexels, {
      method: "GET",
      headers: {
        Authorization: `563492ad6f917000010000014c0b0383d602447ea4fc1c573c15439b`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          let imgs = JSON.parse(JSON.stringify(data));
          setPhotos(imgs.photos);
          // console.log(data);
          // console.log(photos[0]);
        });
      }
    });
  };

  const getContent = (type) => {
    let content;

    switch (props.contentType) {
      case "shapes":
        content = (
          <>
            <div className="shape-flex">
              <div>
                <h1 className="template-heading">Shapes</h1>
              </div>
              <ShapeCard>
                <div
                  className="rect-shape"
                  onClick={() =>
                    props.addObject({
                      type: "shape",
                      shapeType: "rect",
                      index: props.state.selectedObject,
                    })
                  }
                ></div>
              </ShapeCard>
              <ShapeCard>
                <div
                  className="circle-shape"
                  onClick={() =>
                    props.addObject({
                      type: "shape",
                      shapeType: "circle",
                      index: props.state.selectedObject,
                    })
                  }
                ></div>
              </ShapeCard>
              <ShapeCard>
                <div>
                  <img
                    src={Star}
                    alt="star"
                    onClick={() =>
                      props.addObject({
                        type: "shape",
                        shapeType: "star",
                        index: props.state.selectedObject,
                      })
                    }
                  ></img>
                </div>
              </ShapeCard>
              <ShapeCard>
                <div
                  onClick={() =>
                    props.addObject({
                      type: "shape",
                      shapeType: "triangle",
                      index: props.state.selectedObject,
                    })
                  }
                >
                  <img src={Triangle} alt="triangle"></img>
                </div>
              </ShapeCard>
              <ShapeCard>
                <div>
                  <img src={Rect} alt="rect"></img>
                </div>
              </ShapeCard>
            </div>
          </>
        );
        break;
      case "templates":
        content = (
          <>
            {/* <div>
              <Paper className="keyWords">
                {keywords &&
                  keywords.map((keyword, index) => {
                    return (
                      <div
                        key={index}
                        onClick={(event) => {
                          imgChangeHandler(event);
                        }}
                        className="keyWords-item"
                      >
                        {keyword}
                      </div>
                    );
                  })}
              </Paper>
            </div> */}
            <div>
              <h1 className="template-heading">Templates</h1>
            </div>

            {/* <input  className="input"type="text" onChange={imgChangeHandler}></input>
            <button
              style={{ width: "25vw",marginTop:"1vh",marginLeft:"1vw",zIndex:"10" }}
              type="submit"
              onClick={getImagesUnsplash}
            >
              SUBMIT
            </button> */}
            <div className="flex">
              <SideBarTemplateContent />
              <SideBarTemplateContent />
              <SideBarTemplateContent />
              <SideBarTemplateContent />
              <SideBarTemplateContent />
              <SideBarTemplateContent />
            </div>

            {/* <SideBarTemplateContent />
            <SideBarTemplateContent /> */}
          </>
        );
        break;
      case "text":
        content = (
          <>
            <div>
              <h1 className="template-heading">Click to add text</h1>
            </div>
            <div className="flex">
              <div className="title">
                <form
                  onSubmit={(e) => {
                    props.addObject({
                      type: "text",
                      text: title,
                      textType: "title",
                      fontSize: 56,
                      fontFamily: "Arial",
                      strokeWidth: 2,
                      index: props.state.selectedObject,
                    });
                    e.preventDefault();
                    // console.log(title);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add a title"
                    className="title-text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </form>
              </div>
              <div className="subtitle">
                <form
                  onSubmit={(e) => {
                    props.addObject({
                      type: "text",
                      text: subtitle,
                      textType: "subtitle",
                      fontSize: 32,
                      fontFamily: "Arial",
                      strokeWidth: 0,
                      index: props.state.selectedObject,
                    });
                    e.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add a subtitle"
                    className="subtitle-text"
                    onChange={(e) => {
                      setSubtitle(e.target.value);
                    }}
                  />
                </form>
              </div>
              <div className="body-t">
                <form
                  onSubmit={(e) => {
                    props.addObject({
                      type: "text",
                      textType: "body",
                      text: body,
                      fontSize: 22,
                      fontFamily: "Arial",
                      strokeWidth: 0,
                      index: props.state.selectedObject,
                    });
                    e.preventDefault();
                    // console.log(e.target);
                  }}
                >
                  <input
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                    type="text"
                    placeholder="Add a body"
                    className="body-text"
                  />
                </form>
              </div>
            </div>
          </>
        );
        break;
      case "import":
        content = (
          <>
            <div>
              <h1 className="template-heading">Import Images</h1>
            </div>
            <div className="opt-flex">
              <div
                className={!show ? "opt-text" : "opt-text-selected"}
                onClick={() => setShow(true)}
              >
                From Stock Images
                {show && <div className="under-line-1"></div>}
              </div>
              <div
                className={show ? "opt-text" : "opt-text-selected"}
                onClick={() => setShow(false)}
              >
                From Device
                {!show && <div className="under-line-2"></div>}
              </div>
            </div>
            {show && (
              <div>
                <Paper elevation={0} className="paper">
                  {photos &&
                    photos.map((photo, index) => {
                      if (!photo) {
                        return <p> Loading... </p>;
                      } else {
                        return (
                          <SideBarTemplateContent
                            style={{ margin: "30px" }}
                            addPexelImg={addPexelImg}
                            width={photo.width}
                            height={photo.height}
                            onClick={(event) => props.getImgDataURL(event)}
                            key={index}
                            src={photo.src.portrait}
                          />
                        );
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
                      onChange={(e) =>
                        props.addObject({
                          type: "image",
                          e,
                          index: props.state.selectedObject,
                        })
                      }
                      hidden
                    />
                  </label>
                </div>
              </div>
            )}
          </>
        );
        break;
      // case "styles":
      //   content = (
      //     <>
      //       {" "}
      //       {props.state.selectedobject !== null && (
      //         <ShapesProperties
      //           handleShapeProperties={props.handleShapeProperties}
      //           shape={props.shape}
      //         />
      //       )}
      //     </>
      //   );
      //   break;
      case "bg-color":
        content = (
          <>
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
          </>
        );
        break;
      default:
        content = null;
    }
    return content;
  };
  return (
    <>
      <div className="bg">{getContent("template")}</div>
    </>
  );
}

export default SideBarContentMD;
