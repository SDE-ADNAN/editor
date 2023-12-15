/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";

import "./SideBar.scss";
import { Hidden } from "@mui/material";
import { EditorCtx } from "../MainEditor";
import TemplatesSVG from "../../../../media/sideBar_SVGS/TemplatesSVG";
import ShapesSVG from "../../../../media/sideBar_SVGS/ShapesSVG";
import TextSVG from "../../../../media/sideBar_SVGS/TextSVG";
import ImportSVG from "../../../../media/sideBar_SVGS/ImportSVG";
import StylesSVG from "../../../../media/sideBar_SVGS/StylesSVG";

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
        {/* <Hidden mdUp>
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
                image={templates}
                title=""
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
                image={shapes}
                title=""
              />
            }
            body={
              <>
                <div className="shape-flex">
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
                image={text}
                title=""
              />
            }
            body={
              <>
                
                <div className="flex-text">
                  <div className="title">
                    <div
                      type="text"
                      placeholder="Add a title"
                      className="title-text"
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
                      }}
                    >
                      Add a Title
                    </div>
                  </div>
                  <div className="subtitle">
                    <div
                      type="text"
                      id="subtitle"
                      placeholder="Add a subtitle"
                      className="subtitle-text"
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
                  </div>
                  <div className="body-t">
                    <div
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
                      }}
                    >
                      Add a Body
                    </div>
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
                image={importSVG}
                title=""
              />
            }
            body={
              <>
                <div className="opt-flex">
                  <div
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
        </Hidden> */}
        <Hidden mdDown>
          <div
            onClick={() => {
              handleClick("templates");
            }}
            id="elements"
            className="group"
          >
            <div className={`tempIcon ${props.contentType === "templates"? "selected":""}`} align="center">
              <TemplatesSVG />
            </div>
          </div>
          <div
            onClick={() => {
              handleClick("shapes");
            }}
            id="templates"
            className="group"
            style={{ paddingBottom: "1rem" }}
          >
            <div className={`tempIcon ${props.contentType === "shapes"? "selected":""}`} align="center">
              <ShapesSVG />
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
            <div className={`tempIcon ${props.contentType === "text"? "selected":""}`} align="center">
              <TextSVG />
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
            <div className={`tempIcon ${props.contentType === "import"? "selected":""}`} align="center">
              <ImportSVG />
            </div>
          </div>
          <div
            onClick={() => {
              handleClick("styles");
            }}
            id="styles"
            className="group"
            style={{ paddingBottom: "1rem" }}
          >
            <div className={`tempIcon ${props.contentType === "styles"? "selected":""}`} align="center">
              <StylesSVG />
            </div>
          </div>
        </Hidden>
        <div
          onClick={() => {
            handleClick("bg-color");
          }}
          id="styles"
          className="group"
          style={{ paddingBottom: "1rem" }}
        ></div>
      </div>
    </>
  );
}

export default SideBar;
