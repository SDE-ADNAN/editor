import React from "react";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";

// const fontFamilies = [
//   "Arial",
//   "Arial Black",
//   "Bahnschrift",
//   "Calibri",
//   "Cambria",
//   "Cambria Math",
//   "Candara",
//   "Comic Sans MS",
//   "Consolas",
//   "Constantia",
//   "Corbel",
//   "Courier New",
//   "Ebrima",
//   "Franklin Gothic Medium",
//   "Gabriola",
//   "Gadugi",
//   "Georgia",
//   "HoloLens MDL2 Assets",
//   "Impact",
//   "Ink Free",
//   "Javanese Text",
//   "Leelawadee UI",
//   "Lucida Console",
//   "Lucida Sans Unicode",
//   "Malgun Gothic",
//   "Marlett",
//   "Microsoft Himalaya",
//   "Microsoft JhengHei",
//   "Microsoft New Tai Lue",
//   "Microsoft PhagsPa",
//   "Microsoft Sans Serif",
//   "Microsoft Tai Le",
//   "Microsoft YaHei",
//   "Microsoft Yi Baiti",
//   "MingLiU-ExtB",
//   "Mongolian Baiti",
//   "MS Gothic",
//   "MV Boli",
//   "Myanmar Text",
//   "Nirmala UI",
//   "Palatino Linotype",
//   "Sans Serif",
//   "Segoe MDL2 Assets",
//   "Segoe Print",
//   "Segoe Script",
//   "Segoe UI",
//   "Segoe UI Historic",
//   "Segoe UI Emoji",
//   "Segoe UI Symbol",
//   "SimSun",
//   "Sitka",
//   "Sylfaen",
//   "Symbol",
//   "Roboto",
//   "Tahoma",
//   "Times New Roman",
//   "Trebuchet MS",
//   "Verdana",
//   "Webdings",
//   "Wingdings",
//   "Yu Gothic",
// ];
function ObjectsProperties(props) {
  // useEffect(() => {
  //   // console.log(props)
  // }, [props]);

  // const ermsg = () => {
  //   if (props?.shape?.selected !== true) {
  //     alert("Please select an Object");
  //   } else {
  //     return;
  //   }
  // };

  // const duplicate = (array, element) => {
  //   const newObject = [];
  //   if (element !== null) {
  //     newObject.append(element);
  //   }
  //   // console.log(newObject);
  // };

  return (
    <Form>
      <Row className="mt-2">
        <Col>
          <Accordion activeKey="1">
            {/* <Card> */}
            {/* <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                onClick={ermsg}
                eventKey="0"
              >
                EFFECTS / STYLES
              </Accordion.Toggle>
            </Card.Header> */}
            <Accordion.Collapse eventKey={props?.shape?.selected ? "1" : "0"}>
              <Card.Body>
                <Row>
                  {/* <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Opacity</Form.Label>
                      <Form.Range
                        type="range"
                        min={0}
                        max={1}
                        name="opacity"
                        step={0.1}
                        value={String(props.shape?.opacity)}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            Number(e.target.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}
                  {/* {props.shape.shapeType === "circle" &&
                    props.shape.type === "shape" && (
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>radius</Form.Label>
                          <Form.Control
                            type="number"
                            name="radius"
                            min={0}
                            step={1}
                            value={props.shape.radius}
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                Number(e.target.value)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                    )} */}

                  {/* <Col md={6}>
                    <Form.Group>
                      <Form.Label>rotation</Form.Label>
                      <Form.Control
                        type="number"
                        name="rotation"
                        value={props.shape.rotation}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            Number(e.target.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}
                  {/* {props.shape.type !== "image" &&
                    props.shape.shapeType === "rect" && (
                      <>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>TopLeft</Form.Label>
                            <Form.Control
                              type="number"
                              name="topLeft"
                              min={0}
                              max={50}
                              step={1}
                              value={props.shape.topLeft}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>TopRight</Form.Label>
                            <Form.Control
                              type="number"
                              name="topRight"
                              min={0}
                              max={50}
                              step={1}
                              value={props.shape.topRight}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>bottomLeft</Form.Label>
                            <Form.Control
                              type="number"
                              name="bottomLeft"
                              min={0}
                              max={50}
                              step={1}
                              value={props.shape.bottomLeft}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>bottomRight</Form.Label>
                            <Form.Control
                              type="number"
                              name="bottomRight"
                              min={0}
                              max={50}
                              step={1}
                              value={props.shape.bottomRight}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )} */}
                  {/* {props.shape.type === "shape" &&
                    props.shape.shapeType === "star" && (
                      <>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label> inner Radius</Form.Label>
                            <Form.Control
                              type="number"
                              name="innerRadius"
                              min={0}
                              step={1}
                              value={props.shape.innerRadius}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label> outer Radius</Form.Label>
                            <Form.Control
                              type="number"
                              name="outerRadius"
                              min={0}
                              step={1}
                              value={props.shape.outerRadius}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>num Points</Form.Label>
                            <Form.Control
                              type="number"
                              name="numPoints"
                              min={0}
                              step={1}
                              value={props.shape.numPoints}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )} */}
                  {/* {props.shape.type === "text" && (
                    <>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Font </Form.Label>
                          <Form.Control
                            type="number"
                            name="fontSize"
                            value={props.shape.fontSize}
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                Number(e.target.value)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Family </Form.Label>
                          <Form.Control
                            as="select"
                            value={props.shape.fontFamily}
                            name="fontFamily"
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                e.target.value
                              )
                            }
                          >
                            <option></option>
                            {fontFamilies.map((font) => (
                              <option value={font} key={font}>
                                {font}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </>
                  )} */}
                  {props.shape.type === "shape" &&
                    props.shape.shapeType === "triangle" && (
                      <>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>height </Form.Label>
                            <Form.Control
                              type="number"
                              name="height"
                              value={Number(props.shape.height).toFixed(2)}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>width </Form.Label>
                            <Form.Control
                              type="number"
                              name="width"
                              value={Number(props.shape.width).toFixed(2)}
                              onChange={(e) =>
                                props.handleShapeProperties(
                                  e.target.name,
                                  Number(e.target.value)
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )}
                  {props.shape.type === "image" && (
                    <>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>height </Form.Label>
                          <Form.Control
                            type="number"
                            name="height"
                            value={Number(props.shape.height).toFixed(2)}
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                Number(e.target.value)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>width </Form.Label>
                          <Form.Control
                            type="number"
                            name="width"
                            value={Number(props.shape.width).toFixed(2)}
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                Number(e.target.value)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )}
                  {/* {props.shape.type === "text" && (
                    <>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Width </Form.Label>
                          <Form.Control
                            type="number"
                            name="scaleX"
                            step={0.01}
                            defaultValue={1}
                            value={props.shape.scaleX}
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                Number(e.target.value).toFixed(2)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Height</Form.Label>
                          <Form.Control
                            type="number"
                            name="scaleY"
                            step={0.01}
                            defaultValue={1}
                            value={props.shape.scaleY}
                            onChange={(e) =>
                              props.handleShapeProperties(
                                e.target.name,
                                Number(e.target.value).toFixed(2)
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )} */}

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>X Axis</Form.Label>
                      <Form.Control
                        type="number"
                        name="x"
                        step={1}
                        value={props.shape.x}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            "x",
                            Number(e.target.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Y Axis</Form.Label>
                      <Form.Control
                        type="number"
                        name="y"
                        step={1}
                        value={props.shape.y.toFixed(0)}
                        onChange={(e) => {
                          console.log(e.target.name);
                          props.handleShapeProperties(
                            "y",
                            Number(e.target.value)
                          );
                        }}
                      />
                    </Form.Group>
                  </Col>

                  {/* <Col md={6}>
                    <Form.Group>
                      <Form.Label>Stroke</Form.Label>
                      <Form.Control
                        xs={12}
                        type="color"
                        name="stroke"
                        value={props.shape?.stroke}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}
                  {/* <Col md={6}>
                    <Form.Group>
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="color"
                        name="fill"
                        value={props.shape?.fill}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}
                  {/* <Col md={6}>
                    <Form.Group>
                      <Form.Label>Stroke Width</Form.Label>
                      <Form.Control
                        type="number"
                        step={0.1}
                        value={props.shape?.strokeWidth}
                        name="strokeWidth"
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            Number(e.target.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}
                  {/* <Col xs={6}>
                    <Form.Group>
                      <Form.Label>Shadow Blur</Form.Label>
                      <Form.Control
                        type="number"
                        name="shadowBlur"
                        value={props.shape?.shadowBlur}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            Number(e.target.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}

                  {/* <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Shadow Color</Form.Label>
                      <Form.Control
                        type="color"
                        name="shadowColor"
                        value={props.shape?.shadowColor}
                        onChange={(e) => {
                          props.handleShapeProperties(
                            e.target.name,
                            e.target.value
                          );
                        }}
                      />
                    </Form.Group>
                  </Col> */}
                  {/* <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Shadow Opacity</Form.Label>
                      <Form.Range
                        type="range"
                        min={0}
                        max={1}
                        name="shadowOpacity"
                        step={0.1}
                        value={String(props.shape?.shadowOpacity)}
                        onChange={(e) =>
                          props.handleShapeProperties(
                            e.target.name,
                            Number(e.target.value)
                          )
                        }
                      />
                    </Form.Group>
                  </Col> */}
                </Row>
              </Card.Body>
            </Accordion.Collapse>
            {/* </Card> */}
          </Accordion>
        </Col>
      </Row>
    </Form>
  );
}

ObjectsProperties.defaultProps = {
  shape: {
    strokeWidth: 0,
    scaleX: 1,
    cornerRadius: 0,
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
    opacity: 1,
    scaleY: 1,
    rotation: 0,
    height: 100,
    fontFamily: "Arial",
    width: 100,
    shadowBlur: 0,
    fill: "#b6f542",
    shadowColor: "#b6f542",
    stroke: "#b6f542",
    shadowOpacity: 1,
  },
};

export default ObjectsProperties;

// obj = {
//   'fill': {
//     button:dssdsd,
//     body:dssad
//   },
//   'color': {
//     button:sdsa,
//     body:sadads
//   }
// }

// state = ' fill'

// button={obj[state].button}
// body={obj[state].body}

// color
// setModal('show')
// setState('color')
