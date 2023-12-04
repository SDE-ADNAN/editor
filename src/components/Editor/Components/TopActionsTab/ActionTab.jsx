import React, { useContext, useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Hidden } from "@mui/material";

import DeleteIcon from "./images/Delete.png";
import EditIcon from "./images/Edit.png";
import DeleteALL from "./images/DeleteAll.png";
import OpacityIcon from "./images/Opacity.png";
import StrokeIcon from "./images/Stroke.png";
import BorderIcon from "./images/Border.png";
import replaceIcon from "./replace (1).png";
import FillIcon from "./images/FillIcon.png";
import PositionIcon from "./images/position.png";
import DuplicateIcon from "./images/duplicate.png";

import topLeft from "./images/topLeft.png";
import topRight from "./images/topRight.png";
import bottomLeft from "./images/bottomLeft.png";
import bottomRight from "./images/bottomRight.png";

import Bottom from "./images/Bottom.png";
import Top from "./images/Top.png";
import Backward from "./images/Backward.png";
import Forward from "./images/Forward.png";

import FontIcon from "./images/Font.png";
import BackIcon from "./images/Back.png";

import "./ActionTab.css";
import IconELement from "./IconELement";
import ModalComponent from "../Modal/ModalComponent";
import FillCard from "../../../EditorDesign/Cards/FillCard";

import { EditorCtx } from "../MainEditor";

const solidColors = [
  "#000000",
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
// const gradientColors = [
//   "linear-gradient(135deg, #FDEB71 0%, #F8D800 100%)",
//   "linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)",
//   "linear-gradient(135deg, #FEB692 0%, #EA5455 100%)",
//   "linear-gradient(135deg, #CE9FFC 0%, #7367F0 100%)",
//   "linear-gradient(135deg, #90F7EC 0%, #32CCBC 100%)",
//   "linear-gradient(135deg, #FFF6B7 0%, #F6416C 100%)",
//   "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
//   "linear-gradient(135deg, #E2B0FF 0%, #9F44D3 100%)",
//   "linear-gradient(135deg, #FFD26F 0%, #3677FF 100%)",
//   "linear-gradient(135deg, #F1CA74 0%, #A64DB6 100%)",
//   "linear-gradient(135deg, #52E5E7 0%, #130CB7 100%)",
//   "linear-gradient(135deg, #C2FFD8 0%, #465EFB 100%)",
// ];

const fontFamilies = [
  "Arial",
  "Poppins",
  "Bebas Neue",
  "Oswald",
  "Arial Black",
  "Bahnschrift",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Ebrima",
  "Franklin Gothic Medium",
  "Gabriola",
  "Gadugi",
  "Georgia",
  "HoloLens MDL2 Assets",
  "Impact",
  "Ink Free",
  "Javanese Text",
  "Leelawadee UI",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Malgun Gothic",
  "Marlett",
  "Microsoft Himalaya",
  "Microsoft JhengHei",
  "Microsoft New Tai Lue",
  "Microsoft PhagsPa",
  "Microsoft Sans Serif",
  "Microsoft Tai Le",
  "Microsoft YaHei",
  "Microsoft Yi Baiti",
  "MingLiU-ExtB",
  "MS Gothic",
  "MV Boli",
  "Myanmar Text",
  "Nirmala UI",
  "Palatino Linotype",
  "Segoe MDL2 Assets",
  "Segoe Print",
  "Segoe Script",
  "Segoe UI",
  "Segoe UI Historic",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "SimSun",
  "Sitka",
  "Sylfaen",
  "Symbol",
  "Roboto",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "Yu Gothic",
];

function ActionTab(props) {
  let shape = props?.state?.objects[props?.index];
  const Ctx = useContext(EditorCtx);
  const inputFileRef = useRef();

  // useEffect(() => {
  //   if (Ctx.state.objects.length > 0) {
  //     setVisible(true);
  //   }
  // }, [Ctx.state.objects]);

  const colorfill = (e, value) => {
    Ctx.handleShapeProperties("fill", value);
    Ctx.updateUndoRedo({
      index: props.index,
      object: {
        ...props.shape,
        // x: e.currentTarget.attrs.x,
        // y: e.currentTarget.attrs.y,
        // width: e.currentTarget.attrs.width,
        // height: e.currentTarget.attrs.height,
        fill: value,
      },
      type: "Modified",
    });
    // console.log(props?.state?.objects[props?.index]?.opacity);
    // console.log(props?.state?.objects[props?.index]?.type);
  };

  // const ModalObj={
  //   'fill':{button:<IconELement image={FillIcon} title="Fill" />,
  // }
  // }

  return (
    <>
      <div className="actabBG border main">
        {/* <button
          onClick={() => {
            Ctx.undo();
            // console.log(props.state.historyStep);
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            Ctx.redo();
            // console.log(props.state.historyStep);
          }}
        >
          Redo
        </button>
        <button
          onClick={() =>
            Ctx.horizontalFlip(Ctx.state.objects[Ctx.state.selectedObject])
          }
        >
          flip
        </button> */}
        <Hidden mdUp>
          <div>
            <IconELement
              // style={{ marginLeft: "20rem" }}
              onClick={() => {
                Ctx.setShowmenu(false);
                if (window.innerWidth < 601) {
                  Ctx.deSelectObject(props.state.selectedObject);
                }

                // console.log(Ctx.showMenu);
              }}
              image={BackIcon}
              title="Back"
              id="BackBtn"
            />
          </div>
        </Hidden>

        <div className="actab-elements-div">
          <IconELement
            onClick={() => {
              // if (!visible) {
              //   alert("Please Add Objects");
              // } else {
              Ctx.setShowmenu(false);
              props.deleteALL();
              // }
            }}
            image={DeleteALL}
            title="Delete ALL"
          />
        </div>
        {props?.state?.objects[props.index]?.type === "text" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Edit Text"
              open={
                props.state.subModalType === "editText"
                //  && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    // Ctx.setShowmenu(false);
                    Ctx.setSubModalType("editText");
                    // }
                  }}
                  image={EditIcon}
                  title="EditText"
                />
              }
              body={
                <>
                  <div>
                    <Form.Control
                      as="textarea"
                      name="text"
                      rows={4}
                      value={props.state?.objects[props.index]?.text}
                      placeholder="enter text"
                      onChange={(e) => {
                        Ctx.handleShapeProperties(
                          e.target.name,
                          e.target.value
                        );
                        Ctx.updateUndoRedo({
                          index: props.index,
                          object: {
                            ...props.shape,
                            // x: e.currentTarget.attrs.x,
                            // y: e.currentTarget.attrs.y,
                            // width: e.currentTarget.attrs.width,
                            // height: e.currentTarget.attrs.height,
                            text: e.target.value,
                          },
                          type: "Modified",
                        });
                      }}
                    />
                  </div>
                  <div style={{ width: "100%", height: "10rem" }}></div>
                </>
              }
            ></ModalComponent>
          </div>
        )}
        <div className="actab-elements-div">
          <IconELement
            onClick={() => {
              // if (!visible) {
              //   alert("Please Add Objects");
              // } else {
              Ctx.setShowmenu(false);
              Ctx.deSelectObject(props.state.selectedObject);
              props.delete({
                type: props.state.objects[props.state.selectedObject],
                index: props.index,
              });
              // }
            }}
            image={DeleteIcon}
            title="Delete"
          />
        </div>
        {props?.state?.objects[props.index]?.type !== "image" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Fill"
              // open={props.state.subModalType === "fill" }
              open={
                props.state.subModalType === "fill"
                // && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("fill");
                    // }
                  }}
                  image={FillIcon}
                  title="Fill"
                />
              }
              body={
                <>
                  <div
                    className="opt-text"
                    style={{
                      color: "black",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Colour Mixer
                  </div>
                  <Container>
                    <Row>
                      <Col>
                        {" "}
                        <Form.Control
                          className="color-picker"
                          type="color"
                          name="fill"
                          value={props.shape?.fill}
                          onChange={(e) => {
                            Ctx.handleShapeProperties("fill", e.target.value);
                            Ctx.updateUndoRedo({
                              index: props.index,
                              object: {
                                ...props.shape,
                                // x: e.currentTarget.attrs.x,
                                // y: e.currentTarget.attrs.y,
                                // width: e.currentTarget.attrs.width,
                                // height: e.currentTarget.attrs.height,
                                fill: e.target.value,
                              },
                              type: "Modified",
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Container>

                  <div
                    className="opt-text"
                    style={{
                      color: "black",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Solid Colours
                  </div>
                  <div style={{ margin: "20px" }} className="solid-color-sec">
                    {solidColors.map((color, index) => {
                      return (
                            <FillCard
                              color={color}
                              index={index}
                              show={true}
                              onclick={colorfill}
                              toggleMenu={Ctx.showActionMenu}
                              key={index}
                            />
                      );
                    })}
                  </div>
                  {/* <div
                className="opt-text"
                style={{
                  color: "black",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                Gradient Colours
              </div>
              <div style={{ margin: "20px" }} className="bg-color-flex">
                {gradientColors.map((color, index) => {
                  return (
                    <>
                      <div>
                        <FillCard color={color} index={index} show={false} />
                      </div>
                    </>
                  );
                })}
              </div> */}
                </>
              }
            />
          </div>
        )}
        {props?.state?.objects[props.index]?.type === "text" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Font Family"
              open={
                props.state.subModalType === "font family"
                //  && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("font family");
                    // }
                  }}
                  image={FontIcon}
                  title="Font"
                />
              }
              body={
                <>
                  <Container>
                    <Row xs={12}>
                      <Col xs={6}>
                        <div>
                          {" "}
                          <div
                            className="opt-text"
                            style={{
                              color: "black",
                              marginTop: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            Font Family
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div>
                          <Form.Control
                            as="select"
                            value={props?.shape?.fontFamily}
                            name="fontFamily"
                            onChange={(e) => {
                              Ctx.handleShapeProperties(
                                "fontFamily",
                                e.target.value
                              );
                              Ctx.updateUndoRedo({
                                index: props.index,
                                object: {
                                  ...props.shape,
                                  // x: e.currentTarget.attrs.x,
                                  // y: e.currentTarget.attrs.y,
                                  // width: e.currentTarget.attrs.width,
                                  // height: e.currentTarget.attrs.height,
                                  fontFamily: e.target.value,
                                },
                                type: "Modified",
                              });
                            }}
                          >
                            {fontFamilies.map((font,index) => (
                              <option
                                value={font}
                                key={index}
                                // for font families
                                style={{ fontFamily: font }}
                              >
                                {font}
                              </option>
                            ))}
                          </Form.Control>
                        </div>{" "}
                      </Col>
                    </Row>
                    {/* <Row xs={6}>
                    <Col xs={6}>
                      <div
                        className="opt-text"
                        style={{
                          color: "black",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Font Size
                      </div>
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        name="fontSize"
                        value={Number(props.shape?.fontSize)}
                        defaultValue={24}
                        onChange={(e) =>
                          Ctx.handleShapeProperties(
                            "fontSize",
                            Number(e.target.value)
                          )
                        }
                      />
                    </Col>
                  </Row> */}
                  </Container>
                </>
              }
            ></ModalComponent>
          </div>
        )}
        {props?.state?.objects[props.index]?.type === "text" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Font Size"
              open={
                props.state.subModalType === "font size"
                //  && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("font size");
                    // }
                  }}
                  image={FontIcon}
                  title="Font Size"
                />
              }
              body={
                <>
                  <Container>
                    <Row xs={6}>
                      <Col xs={6}>
                        <div
                          className="opt-text"
                          style={{
                            color: "black",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          Font Size
                        </div>
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          type="number"
                          name="fontSize"
                          value={Number(props.shape?.fontSize)}
                          defaultValue={24}
                          onChange={(e) => {
                            Ctx.handleShapeProperties(
                              "fontSize",
                              Number(e.target.value)
                            );
                            Ctx.updateUndoRedo({
                              index: props.index,
                              object: {
                                ...props.shape,
                                // x: e.currentTarget.attrs.x,
                                // y: e.currentTarget.attrs.y,
                                // width: e.currentTarget.attrs.width,
                                // height: e.currentTarget.attrs.height,
                                fontSize: Number(e.target.value),
                              },
                              type: "Modified",
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Container>
                </>
              }
            ></ModalComponent>
          </div>
        )}

        <div className="actab-elements-div">
          <ModalComponent
            heading="Opacity"
            open={
              props.state.subModalType === "opacity"
              // && visible
            }
            button={
              <IconELement
                onClick={() => {
                  // if (!visible) {
                  //   alert("Please Add Objects");
                  // } else {
                  Ctx.setSubModalType("opacity");
                  // }
                }}
                image={OpacityIcon}
                title="Opacity"
              />
            }
            body={
              <>
                <Form.Group>
                  <Form.Range
                    type="range"
                    min={0}
                    max={1}
                    name="opacity"
                    step={0.001}
                    value={String(props?.state?.objects[props?.index]?.opacity)}
                    onChange={(e) => {
                      Ctx.handleShapeProperties(
                        "opacity",
                        Number(e.target.value)
                      );
                      Ctx.updateUndoRedo({
                        index: props.index,
                        object: {
                          ...props.shape,
                          // x: e.currentTarget.attrs.x,
                          // y: e.currentTarget.attrs.y,
                          // width: e.currentTarget.attrs.width,
                          // height: e.currentTarget.attrs.height,
                          opacity: Number(e.target.value),
                        },
                        type: "Modified",
                      });
                    }}
                  />
                </Form.Group>
              </>
            }
          />
        </div>
        {props?.state?.objects[props.index]?.type !== "image" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Border"
              open={
                props.state.subModalType === "stroke"
                // && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("stroke");
                    // }
                  }}
                  image={StrokeIcon}
                  title="Border"
                />
              }
              body={
                <>
                  <Form.Group>
                    <Container>
                      <Row xs={12}>
                        <Col xs={6}>
                          <div
                            className="opt-text"
                            style={{
                              color: "black",
                              marginTop: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            Border Width
                          </div>
                        </Col>
                        <Col xs={6}>
                          <Form.Control
                            type="number"
                            step={0.1}
                            value={
                              props?.state?.objects[props?.index]?.strokeWidth
                            }
                            name="strokeWidth"
                            onChange={(e) => {
                              Ctx.handleShapeProperties(
                                "strokeWidth",
                                Number(e.target.value)
                              );
                              Ctx.updateUndoRedo({
                                index: props.index,
                                object: {
                                  ...props.shape,
                                  // x: e.currentTarget.attrs.x,
                                  // y: e.currentTarget.attrs.y,
                                  // width: e.currentTarget.attrs.width,
                                  // height: e.currentTarget.attrs.height,
                                  strokeWidth: Number(e.target.value),
                                },
                                type: "Modified",
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row xs={12}>
                        <Col xs={6}>
                          <div
                            className="opt-text"
                            style={{
                              color: "black",
                              marginTop: "1rem",
                              marginBottom: "1rem",
                            }}
                          >
                            Border Color
                          </div>
                        </Col>
                        <Col xs={6}>
                          <Form.Control
                            className="color-picker"
                            xs={12}
                            type="color"
                            name="stroke"
                            value={props?.state?.objects[props?.index]?.stroke}
                            onChange={(e) => {
                              Ctx.handleShapeProperties(
                                "stroke",
                                e.target.value
                              );
                              Ctx.updateUndoRedo({
                                index: props.index,
                                object: {
                                  ...props.shape,
                                  // x: e.currentTarget.attrs.x,
                                  // y: e.currentTarget.attrs.y,
                                  // width: e.currentTarget.attrs.width,
                                  // height: e.currentTarget.attrs.height,
                                  stroke: e.target.value,
                                },
                                type: "Modified",
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Form.Group>
                </>
              }
            />
          </div>
        )}
        {props?.state?.objects[props.index]?.shapeType === "rect" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Border"
              open={
                props.state.subModalType === "border"
                // && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("border");
                    // }
                  }}
                  image={BorderIcon}
                  title="Border"
                />
              }
              body={
                <>
                  {shape?.type === "shape" && shape?.shapeType === "rect" && (
                    <div className="BorderRadiusItem-flex">
                      <Container>
                        <Row xs={12}>
                          <Col xs={6}>
                            <Row xs={12} className="center">
                              <div className="border-div-icon">
                                <div className="border-img">
                                  <img src={topLeft} alt="Top Left"></img>
                                </div>

                                {/* <div className="border-text">Top Left</div> */}
                              </div>{" "}
                            </Row>
                            <Row xs={12} className="input-field ">
                              {" "}
                              <Form.Control
                                type="number"
                                name="topLeft"
                                min={0}
                                // max={50}
                                step={1}
                                value={shape?.topLeft}
                                onChange={(e) => {
                                  Ctx.handleShapeProperties(
                                    "topLeft",
                                    Number(e.target.value)
                                  );
                                  Ctx.updateUndoRedo({
                                    index: props.index,
                                    object: {
                                      ...props.shape,
                                      // x: e.currentTarget.attrs.x,
                                      // y: e.currentTarget.attrs.y,
                                      // width: e.currentTarget.attrs.width,
                                      // height: e.currentTarget.attrs.height,
                                      topLeft: Number(e.target.value),
                                    },
                                    type: "Modified",
                                  });
                                }}
                              />
                            </Row>
                          </Col>
                          <Col xs={6}>
                            <Row xs={12} className="center">
                              <div className="border-div-icon">
                                <div className="border-img">
                                  <img src={topRight} alt="Top Right"></img>
                                </div>

                                {/* <div className="border-text">Top Right</div> */}
                              </div>{" "}
                            </Row>
                            <Row xs={12} className="input-field">
                              <Form.Control
                                type="number"
                                name="topRight"
                                min={0}
                                // max={50}
                                step={1}
                                value={shape?.topRight}
                                onChange={(e) => {
                                  Ctx.handleShapeProperties(
                                    "topRight",
                                    Number(e.target.value)
                                  );
                                  Ctx.updateUndoRedo({
                                    index: props.index,
                                    object: {
                                      ...props.shape,
                                      // x: e.currentTarget.attrs.x,
                                      // y: e.currentTarget.attrs.y,
                                      // width: e.currentTarget.attrs.width,
                                      // height: e.currentTarget.attrs.height,
                                      topRight: Number(e.target.value),
                                    },
                                    type: "Modified",
                                  });
                                }}
                              />{" "}
                            </Row>
                          </Col>
                          <Col xs={6}>
                            <Row xs={12} className="center">
                              <div className="border-div-icon">
                                <div className="border-img">
                                  <img src={bottomLeft} alt="Bottom Left"></img>
                                </div>

                                {/* <div className="border-text">Bottom Left</div> */}
                              </div>{" "}
                            </Row>
                            <Row xs={12} className="input-field">
                              <Form.Control
                                type="number"
                                name="bottomLeft"
                                min={0}
                                // max={50}
                                step={1}
                                value={shape?.bottomLeft}
                                onChange={(e) => {
                                  Ctx.handleShapeProperties(
                                    "bottomLeft",
                                    Number(e.target.value)
                                  );
                                  Ctx.updateUndoRedo({
                                    index: props.index,
                                    object: {
                                      ...props.shape,
                                      // x: e.currentTarget.attrs.x,
                                      // y: e.currentTarget.attrs.y,
                                      // width: e.currentTarget.attrs.width,
                                      // height: e.currentTarget.attrs.height,
                                      bottomLeft: Number(e.target.value),
                                    },
                                    type: "Modified",
                                  });
                                }}
                              />{" "}
                            </Row>
                          </Col>
                          <Col xs={6}>
                            <Row xs={12} className="center">
                              <div className="border-div-icon">
                                <div className="">
                                  <img
                                    src={bottomRight}
                                    alt="Bottom Right"
                                  ></img>
                                </div>

                                {/* <div className="border-text">Bottom Right</div> */}
                              </div>{" "}
                            </Row>
                            <Row xs={12} className="input-field">
                              <Form.Control
                                type="number"
                                name="bottomRight"
                                min={0}
                                // max={50}
                                step={1}
                                value={shape?.bottomRight}
                                onChange={(e) => {
                                  Ctx.handleShapeProperties(
                                    "bottomRight",
                                    Number(e.target.value)
                                  );
                                  Ctx.updateUndoRedo({
                                    index: props.index,
                                    object: {
                                      ...props.shape,
                                      // x: e.currentTarget.attrs.x,
                                      // y: e.currentTarget.attrs.y,
                                      // width: e.currentTarget.attrs.width,
                                      // height: e.currentTarget.attrs.height,
                                      bottomRight: Number(e.target.value),
                                    },
                                    type: "Modified",
                                  });
                                }}
                              />{" "}
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  )}
                </>
              }
            />
          </div>
        )}
        {props?.state?.objects[props.index]?.type === "image" && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Replace"
              open={
                props.state.subModalType === "replace"
                // && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("replace");
                    // }
                  }}
                  image={replaceIcon}
                  title="Replace"
                />
              }
              body={
                <>
                  <div className="ReplaceItem-flex">
                    <div>
                      <text>Choose image file to replace..</text>
                    </div>
                    <div className="input-tag">
                      <input
                        inputRef={inputFileRef}
                        type="file"
                        onChange={(e) => {
                          Ctx.replaceImage(e);
                          Ctx.updateUndoRedo({
                            index: props.index,
                            object: {
                              ...props.shape,
                              // x: e.currentTarget.attrs.x,
                              // y: e.currentTarget.attrs.y,
                              // width: e.currentTarget.attrs.width,
                              // height: e.currentTarget.attrs.height,
                              src: e.target.result,
                            },
                            type: "Modified",
                          });
                        }}
                        inputProps={{
                          accept:
                            "application/x-photoshop, application/octet-stream, image/vnd.adobe.photoshop, application/x-coreldraw, image/*, application/pdf, .cdr",
                        }}
                        id="file"
                        variant="outlined"
                        required
                      ></input>
                    </div>
                    {/* <div>
                      <button
                        onClick={() => {
                          // Ctx.replaceImage(inputFileRef);
                        }}
                      >
                        replace
                      </button>
                    </div> */}
                  </div>
                </>
              }
            />
          </div>
        )}
        {props.state.selectedObject !== null && (
          <div className="actab-elements-div">
            <ModalComponent
              heading="Position"
              open={
                props.state.subModalType === "position"
                // && visible
              }
              button={
                <IconELement
                  onClick={() => {
                    // if (!visible) {
                    //   alert("Please Add Objects");
                    // } else {
                    Ctx.setSubModalType("position");
                    // }
                  }}
                  image={PositionIcon}
                  title="Position"
                />
              }
              body={
                <>
                  {/* <LayersMenu
              layerFunc={props.layerFunc}
              selectedObject={props.selectedObject}
            /> */}
                  <div className="position-div">
                    <div
                      className="position-item"
                      onClick={() => {
                        Ctx.positionFunc({
                          type: "bottom",
                          index: props.selectedObject,
                        });
                      }}
                    >
                      <IconELement image={Bottom} title="Bottom" />
                    </div>
                    <div
                      className="position-item"
                      onClick={() => {
                        Ctx.positionFunc({
                          type: "backward",
                          index: props.selectedObject,
                        });
                      }}
                    >
                      <IconELement image={Backward} title="Backward" />
                    </div>
                    <div
                      className="position-item"
                      onClick={() => {
                        Ctx.positionFunc({
                          type: "forward",
                          index: props.selectedObject,
                        });
                      }}
                    >
                      <IconELement image={Forward} title="Forward" />
                    </div>
                    <div
                      className="position-item"
                      onClick={() => {
                        Ctx.positionFunc({
                          type: "top",
                          index: props.selectedObject,
                        });
                      }}
                    >
                      <IconELement image={Top} title="Top" />
                    </div>
                  </div>
                </>
              }
            />
          </div>
        )}
        <div className="actab-elements-div">
          <IconELement
            image={DuplicateIcon}
            title="Duplicate"
            onClick={() => {
              // if (!visible) {
              //   alert("Please Add Objects");
              // } else {
              Ctx.duplicateFunc(
                props?.state?.objects,
                props?.state?.objects[props?.index]
              );
              // }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ActionTab;
