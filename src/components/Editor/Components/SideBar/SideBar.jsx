import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

import "./SideBar.css";
import templateIcon from "./TemplateIcon.png";
import Star from "../SideBarContent/star.png";
import ShapesIcon from "./ShapesIcon.png";
import TextIcon from "./TextIcon.png";
import ImportIcon from "./ImportIcon.png";
import propsIcon from "./Properties.png";
import ImportImages from "../TopActionsTab/images/importImages.png";
import IconELement from "../TopActionsTab/IconELement";
import { Hidden, Paper } from "@mui/material";
import ModalComponent from "../Modal/ModalComponent";
import SideBarTemplateContent from "../SideBarContent/SideBarContentCard";
import ShapeCard from "../../../EditorDesign/Cards/ShapeCard";
import { EditorCtx } from "../MainEditor";
import templateOneImage from "../Templates/Template1/templateOne.png";
import templateTwoImage from "../Templates/Template2/templatetwo.png";
import templateThreeImage from "../Templates/Template3/TemplateThree.png";
import templateFourImage from "../Templates/Template4/templatefour.png";
import templateFiveImage from "../Templates/Template5/templatefive.png";
import templateSixImage from "../Templates/Template6/templatesix.png";
import {
  TemplateFive,
  TemplateFour,
  TemplateOne,
  TemplateSix,
  TemplateThree,
  TemplateTwo,
} from "../constants";

function SideBar(props) {
  // const [isSelected,setIsSelected ] = useState(false)\
  const Ctx = useContext(EditorCtx);

  const handleClick = (contentType) => {
    if (contentType !== " ") {
      props.setContent(contentType);
    }
    // if(!isSelected) {
    //   setIsSelected(true)
    // }else{
    //   setIsSelected(false)
    // }
  };
  // const handleRequest = () => {
  //   handleClick("elements");
  //   // props.getImagesPexels()
  // };

  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState();
  const [title, /*setTitle*/] = useState("");
  const [subtitle, /*setSubtitle*/] = useState("");
  const [body, /*setBody*/] = useState("");

  const addPexelImg = ({ type = "", e, dataUri = "" }) => {
    props.addObject({
      type: type,
      e,
      index: props.state.selectedObject,
      src: dataUri,
      imageType: "pexelsImage",
    });
  };

  return (
    <>
      <div className="sideBarBG">
        <Hidden mdUp>
          <ModalComponent
            heading="Templates"
            open={props.state.mainModalType === "templates"}
            button={
              <IconELement
                onClick={() => {
                  handleClick("templates");
                  Ctx.setMainModalType("");
                  Ctx.setMainModalType("templates");
                }}
                image={templateIcon}
                title="Templates"
              />
            }
            body={
              <>
                <div className="flex-template">
                  <SideBarTemplateContent
                    template={true}
                    src={templateOneImage}
                    templateObj={TemplateOne}
                  />
                  <SideBarTemplateContent
                    template={true}
                    src={templateTwoImage}
                    templateObj={TemplateTwo}
                  />
                  <SideBarTemplateContent
                    template={true}
                    src={templateThreeImage}
                    templateObj={TemplateThree}
                  />
                  <SideBarTemplateContent
                    template={true}
                    src={templateFourImage}
                    templateObj={TemplateFour}
                  />
                  <SideBarTemplateContent
                    template={true}
                    src={templateFiveImage}
                    templateObj={TemplateFive}
                  />
                  <SideBarTemplateContent
                    template={true}
                    src={templateSixImage}
                    templateObj={TemplateSix}
                  />
                </div>
              </>
            }
          />
          <ModalComponent
            heading="Shapes"
            open={props.state.mainModalType === "shapes"}
            button={
              <IconELement
                onClick={() => {
                  handleClick("shapes");
                  Ctx.setMainModalType("shapes");
                }}
                image={ShapesIcon}
                title="Shapes"
              />
            }
            body={
              <>
                <div className="shape-flex">
                  {/* <div>
                    <h1 className="template-heading">Shapes</h1>
                  </div> */}
                  <ShapeCard>
                    <div
                      className="rect-shape"
                      onClick={() => {
                        Ctx.setShowmenu(false);
                        Ctx.addObject({
                          type: "shape",
                          shapeType: "rect",
                          index: props.state.selectedObject,
                        });
                      }}
                    ></div>
                  </ShapeCard>
                  <ShapeCard>
                    <div
                      className="circle-shape"
                      onClick={() => {
                        Ctx.setShowmenu(false);
                        Ctx.addObject({
                          type: "shape",
                          shapeType: "circle",
                          index: props.state.selectedObject,
                        });
                      }}
                    ></div>
                  </ShapeCard>
                  <ShapeCard>
                    <div>
                      <img
                        className="star-img"
                        src={Star}
                        alt="star"
                        onClick={() => {
                          Ctx.setShowmenu(false);
                          Ctx.addObject({
                            type: "shape",
                            shapeType: "star",
                            index: props.state.selectedObject,
                          });
                        }}
                      ></img>
                    </div>
                  </ShapeCard>
                  {/* <ShapeCard>
                    <div
                      onClick={() =>
                        Ctx.addObject({
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
                  </ShapeCard> */}
                </div>
              </>
            }
          />
          <ModalComponent
            heading="Text"
            open={props.state.mainModalType === "text"}
            button={
              <IconELement
                onClick={() => {
                  handleClick("text");
                  Ctx.setMainModalType("text");
                }}
                image={TextIcon}
                title="Text"
              />
            }
            body={
              <>
                {/* <div>
                  <h1 className="template-heading">Click to add text</h1>
                </div> */}
                <div className="flex-text">
                  <div className="title">
                    {/* <form
                      onSubmit={(e) => {
                        props.addObject({
                          type: "text",
                          text: title,
                          textType: "title",
                          fontSize-sb: 56,
                          fontFamily: "Arial",
                          strokeWidth: 0,
                          index: props.state.selectedObject,
                        });
                        e.preventDefault();
                        // console.log(title);
                      }}
                    > */}
                    <div
                      type="text"
                      placeholder="Add a title"
                      className="title-text"
                      // onChange={(e) => {
                      //   setTitle(e.target.value);
                      // }}
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
                        e.preventDefault();
                        // console.log(title);
                      }}
                    >
                      Add a Title
                    </div>
                    {/* </form> */}
                  </div>
                  <div className="subtitle">
                    {/* <form
                      onSubmit={(e) => {
                        props.addObject({
                          type: "text",
                          text: subtitle,
                          textType: "subtitle",
                          fontSize-sb: 32,
                          fontFamily: "Arial",
                          strokeWidth: 0,
                          index: props.state.selectedObject,
                        });
                        e.preventDefault();
                      }}
                    > */}
                    {/* <Link to="#subtitle"> */}
                    <div
                      type="text"
                      id="subtitle"
                      placeholder="Add a subtitle"
                      className="subtitle-text"
                      // onChange={(e) => {
                      //   setSubtitle(e.target.value);
                      // }}
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
                        e.preventDefault();
                      }}
                    >
                      Add a Subtitle
                    </div>
                    {/* </Link> */}
                    {/* </form> */}
                  </div>
                  <div className="body-t">
                    {/* <form
                      onSubmit={(e) => {
                        props.addObject({
                          type: "text",
                          textType: "body",
                          text: body,
                          fontSize-sb: 22,
                          fontFamily: "Arial",
                          strokeWidth: 0,
                          index: props.state.selectedObject,
                        });
                        e.preventDefault();
                        // console.log(e.target);
                      }}
                    > */}
                    <div
                      // onChange={(e) => {
                      //   setBody(e.target.value);
                      // }}
                      type="text"
                      placeholder="Add a body"
                      className="body-text"
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
                        e.preventDefault();
                        // console.log(e.target);
                      }}
                    >
                      Add a Body
                    </div>
                    {/* // </form> */}
                  </div>
                </div>
              </>
            }
          />
          <ModalComponent
            heading="Import"
            open={props.state.mainModalType === "import"}
            button={
              <IconELement
                onClick={() => {
                  handleClick("import");
                  Ctx.setMainModalType("import");
                }}
                image={ImportIcon}
                title="Import"
              />
            }
            body={
              <>
                {/* <div>
                  <h1 className="template-heading">Import Images</h1>
                </div> */}
                <div className="opt-flex">
                  <div
                    // className={!show ? "opt-text" : "opt-text-selected"}
                    className={`${
                      !show ? "opt-text-sideBar" : "opt-text-selected"
                    }`}
                    onClick={() => setShow(true)}
                  >
                    From Stock Images
                    {show && (
                      <div
                        className={` under-line-1 ${
                          show ? "slide-in-right" : ""
                        }`}
                      ></div>
                    )}
                  </div>
                  <div
                    className={`${
                      show ? "opt-text-sideBar" : "opt-text-selected"
                    }`}
                    onClick={() => setShow(false)}
                  >
                    From Device
                    {!show && (
                      <div
                        className={` under-line-2 ${
                          !show ? "slide-in-left" : ""
                        }`}
                      ></div>
                    )}
                  </div>
                </div>
                {/* {show && ( */}
                  <div>
                    <Paper elevation={0} className="md-import-paper">
                      {photos &&
                        photos.map((photo, index) => {
                          return (
                            <SideBarTemplateContent
                              className="image-card_"
                              style={{ margin: "30px" }}
                              addPexelImg={addPexelImg}
                              width={photo.width}
                              height={photo.height}
                              onClick={(event) => {
                                props.getImgDataURL(event);
                                Ctx.showActionMenu();
                              }}
                              index={index}
                              src={photo.src.portrait}
                              key={index}
                            />
                          );
                        })}
                    </Paper>
                  </div>
                {/* )} */}
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
            }
          />
          {/* <ModalComponent
            heading="Styles"
            button={
              <IconELement
                onClick={() => {
                  handleClick("styles");
                  Ctx.setMainModalType("styles");
                }}
                image={BgColorIcon}
                title="Styles"
              />
            }
            body={
              <>
                {props.state.selectedObject === null && (
                  <div
                    style={{
                      padding: "20px",
                      display: "block",
                      fontSize-sb: "2em",
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
              </>
            }
          /> */}
        </Hidden>
        <Hidden mdDown>
          <div
            onClick={() => {
              handleClick("templates");
            }}
            id="elements"
            className="group"
          >
            {/* Elements */}
            <div className="tempIcon" align="center">
              <img
                className=" tempIcon-image"
                src={templateIcon}
                alt="abc"
              ></img>
            </div>
            <div className="fontSize-sb">Templates</div>
          </div>
          <div
            onClick={() => {
              handleClick("shapes");
            }}
            id="templates"
            className="group"
            style={{ paddingBottom: "1rem" }}
          >
            {/* Templates */}
            <div className="tempIcon" align="center">
              <img className=" tempIcon-image" src={ShapesIcon} alt="abc"></img>
              <div className="fontSize-sb">Shapes</div>
            </div>
          </div>
          <div
            onClick={() => {
              handleClick("text");
            }}
            id="uploads"
            className="group"
            style={{ paddingBottom: "1rem" }}
          >
            {/* Uploads */}
            <div className="tempIcon" align="center">
              <img className=" tempIcon-image" src={TextIcon} alt="abc"></img>
              <div className="fontSize-sb">Text</div>
            </div>
          </div>
          <div
            onClick={() => {
              handleClick("import");
            }}
            id="text"
            className="group"
            style={{ paddingBottom: "1rem" }}
          >
            {/* Text */}
            <div className="tempIcon" align="center">
              <img className=" tempIcon-image" src={ImportIcon} alt="abc"></img>
            </div>
            <div className="fontSize-sb">Import</div>
          </div>
          {/* Styles */}
          <div
            onClick={() => {
              handleClick("styles");
            }}
            id="styles"
            className="group"
            style={{ paddingBottom: "1rem" }}
          >
            <div className="tempIcon" align="center">
              <img src={propsIcon} alt="abc"></img>
            </div>
            <div className="fontSize-sb">Properties</div>
          </div>
        </Hidden>
        {/* //////////////////////////////////////////////////////////////////////////// */}
        <div
          onClick={() => {
            handleClick("bg-color");
          }}
          id="styles"
          className="group"
          style={{ paddingBottom: "1rem" }}
        ></div>
        {/* Styles */}
        {/* <div className="tempIcon" align="center">
            <img src={BgColorIcon} alt="abc"></img>
          </div>
          <div className="fontSize-sb">Fill</div>
        </div> */}
        {/* ///////////////////////////////////////////////////// */}
        {/* ///////////////////////////////////////////////////////////// */}
      </div>
    </>
  );
}

export default SideBar;
