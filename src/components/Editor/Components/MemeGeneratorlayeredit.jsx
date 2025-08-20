// class MemeGenerator extends Component {
//   state = {
//     rects:[],
//     inputs: [],
//     images: [],
//     backgroundImageSrc: null,
//     backgroundImageName: null,
//     templateName: null,
//     show: false,
//     selectedText: null,
//     selectedRect: null,
//     selectedTextarea: null,
//     selectedImage: null,
//     src: "",
//     stageWidth,
//     stageHeight,
//     triggerCors: false,
//     defaultSelect: "",
//   };

//   componentDidMount() {
//     window.document.addEventListener("keydown", (e) => {
//       if (e.key === "Delete" && this.state.selectedText != null) {
//         this.deleteText();
//       }
//     });
//   }

//   addText = () => {
//     const inputs = this.state.inputs;
//     if (this.state.selectedText != null) {
//       inputs[this.state.selectedText].selected = false;
//     }
//     this.setState((state) => ({
//       inputs: [
//         ...inputs,
//         {
//           x: 150,
//           y: 150,
//           text: "Write something",
//           fontSize: 25,
//           selected: true,
//           fontFamily: "Impact",
//           fill: "#ffffff",
//           strokeWidth: 1.5,
//           stroke: "#000000",
//           shadowColor: "#000000",
//           align: "center",
//           padding: 5,
//           letterSpacing: 1,
//           lineHeight: 1,
//           textDecoration: "none",
//           verticalAlign: "top",
//           opacity: 1,
//           shadowOpacity: 1,
//           shadowBlur: 0,
//         },
//       ],
//       selectedText: state.inputs.length,
//     }));
//   };
//   addImage = (e) => {
//     const files = e.target.files;
//     let reader = new FileReader();
//     reader.readAsDataURL(files[0]);

//     reader.onload = (e) => {
//       this.setState((state) => ({
//         images: [
//           ...state.images,
//           {
//             properties: {
//               x: 40,
//               y: 50,
//             },
//             src: e.target.result,
//           },
//         ],
//         selectedImage: state.images.length,
//       }));
//     };
//   };

//   handleTextChange = (key, value) => {
//     if (this.state.selectedText === null) {
//       alert("please select a Object");
//       return;
//     }

//     const inputs = this.state.inputs;
//     inputs[this.state.selectedText][key] = value;
//     inputs[this.state.selectedText].selected = false;
//     this.setState({
//       inputs,
//     });
//   };
//   selectText = (index, textarea) => {
//     const inputs = this.state.inputs;
//     const oldSelected = this.state.selectedText;
//     if (oldSelected != null) {
//       inputs[oldSelected].selected = false;
//     }
//     if (index != null) {
//       inputs[index].selected = true;
//     }
//     this.setState({
//       inputs,
//       selectedText: index,
//       selectedTextarea: textarea,
//     });
//   };
//   selectImage = (index) => {
//     console.log(index)
//     this.setState({
//       selectedImage: index,
//     });
//   };
//   deleteText = (index) => {
//     const id = index;
//     if (id != null) {
//       const inputs = this.state.inputs;
//       inputs.splice(id, 1);

//       this.setState({
//         inputs,
//         selectedText: null,
//         selectedTextarea: null,
//       });
//     } else {
//       alert("please select a Object");
//     }
//   };
//   handleDragEnd = (target, index) => {
//     let inputs = this.state.inputs;
//     inputs[index].x = target.x;
//     inputs[index].y = target.y;
//     this.setState({
//       inputs,
//     });
//   };
//   deleteImage = () => {
//     const id = this.state.selectedImage;
//     if (id != null) {
//       const images = this.state.images;
//       delete images[id];
//       this.setState({
//         images,
//         selectedImage: null,
//       });
//     } else {
//       alert("please select a image");
//     }
//   };
//   addBackground = (e) => {
//     const file = e.target.files[0];
//     var fr = new FileReader();

//     var img = new Image();
//     img.onload = () => {
//       let stageWidth = img.width;
//       let stageHeight = img.height;
//       stageWidth = stageWidth > maxStageWidth ? maxStageWidth : stageWidth;
//       stageHeight = stageHeight > maxStageHeight ? maxStageHeight : stageHeight;

//       this.setState({
//         backgroundImageSrc: img.src,
//         backgroundImageName: img.name,
//         stageWidth,
//         stageHeight,
//       });
//     };
//     fr.onload = () => {
//       img.name = file.name;
//       img.src = fr.result;
//     };
//     fr.readAsDataURL(file);
//   };
//   handleSizeChange = (e) => {
//     this.setState({
//       [e.target.name]: Number(e.target.value),
//     });
//   };
//   returnDataURL = () => {
//     const dataURL = this.stageRef ? this.stageRef.getStage().toDataURL() : null;
//     //console.log(dataURL)
//     return dataURL;
//   };

//   render() {
//     const {
//       src,
//       backgroundImageSrc,
//       stageWidth,
//       stageHeight,
//       images,
//       inputs,
//       selectedText,
//       triggerCors,
//     } = this.state;
//     return (
//       <Grid container>
//         <Grid item xs={2}>
//           <TextProperties
//             handleTextChange={this.handleTextChange}
//             selectedText={selectedText}
//             text={inputs[selectedText]}
//           />
//         </Grid>
//         <Grid item xs={10}>
//           <Col id="canvasDiv" xs={12}>
//             <Row>
//               <Col xs={3}>
//                 <label className="btn btn-outline-primary  col m-2">
//                   Change Background image
//                   <Form.Control
//                     type="file"
//                     onChange={(e) => this.addBackground(e)}
//                     hidden
//                   />
//                 </label>
//               </Col>
//               <Col xs={2}>
//                 <label className="btn btn-outline-primary  col m-2 d-flex">
//                   <span className="m-auto">Add Image</span>
//                   <Form.Control
//                     type="file"
//                     onChange={(e) => this.addImage(e)}
//                     hidden
//                   />
//                 </label>
//               </Col>
//               <Col xs={2} align="center" style={{ paddingTop: "0px" }}>
//                 <Button
//                   variant="outline-primary"
//                   className={classes.bn29}
//                   onClick={() => this.addText()}
//                 >
//                   Add Text
//                 </Button>
//               </Col>
//               <Col xs={2} align="center" style={{ paddingTop: "0px" }}>
//                 <Button
//                   variant="outline-primary"
//                   onClick={() => this.addShapes()}
//                 >
//                   Add Shapes
//                 </Button>
//               </Col>
//               <Col xs={2}>
//                 <Download
//                   dataURL={() => this.returnDataURL()}
//                   width={stageWidth}
//                   height={stageHeight}
//                 />
//               </Col>
//             </Row>
//             <Row className={classes.stage}>
//               <Col className="pt-2">
//                 <Stage
//                   className={classes.canvas}
//                   width={stageWidth}
//                   // width={500}
//                   // height={707.1}
//                   height={stageHeight}
//                   ref={(node) => {
//                     this.stageRef = node;
//                   }}
//                 >
//                   <Layer
//                     ref={(node) => {
//                       this.layerRef = node;
//                     }}
//                   >
//                     <ShapesButton/>
//                     {/* <Rectangles
//                     width ={"50px"}
//                     height ={"50px"}
//                     /> */}
//                     <CanvasImage
//                       src={backgroundImageSrc ? backgroundImageSrc : src}
//                       width={stageWidth}
//                       triggerCors={triggerCors}
//                       height={stageHeight}
//                     />
//                     {images &&
//                       images.map((image, index) => {
//                         if (image === undefined) {
//                           return null;
//                         } else {
//                           return (
//                             <AddedImage
//                               src={image.src}
//                               properties={image.properties}
//                               key={index}
//                               index={index}
//                               selectedImage={this.selectImage}
//                               deleteImage={this.deleteImage}
//                             />
//                           );
//                         }
//                       })}
//                     {inputs &&
//                       inputs.map((input, index) => {
//                         return (
//                           <CanvasText
//                             input={input}
//                             handleDragEnd={this.handleDragEnd}
//                             stagePosition={() =>
//                               this.stageRef.container().getBoundingClientRect()
//                             }
//                             handleTextChange={this.handleTextChange}
//                             index={index}
//                             key={index}
//                             selectedText={this.selectText}
//                             deleteText={() => this.deleteText(index)}
//                           />
//                         );
//                       })}

//                       {/* {rects &&
//                       rects.map((rect, i) => {
//                         return (
//                           <rects
//                             input={rect}
//                             handleDragEnd={this.handleDragEnd}
//                             stagePosition={() =>
//                               this.stageRef.container().getBoundingClientRect()
//                             }
//                             handleTextChange={this.handleTextChange}
//                             index={rect}
//                             key={rect}
//                             selectedText={this.selectText}
//                             deleteText={() => this.deleteText(rect)}
//                           />
//                         );
//                       })} */}

//                   </Layer>
//                 </Stage>
//               </Col>
//             </Row>
//           </Col>
//         </Grid>
//       </Grid>
//     );
//   }
// }

// export default MemeGenerator;

import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import CanvasImage from "./CanvasImage";
import CanvasText from "./CanvasText";
import AddedImage from "./AddedImage";
import TextProperties from "./TextProperties";
import Download from "./Download";
import Size from "./Size";
// import Rectangles from "./Rectangles";

import { Button, Grid } from "@mui/material";

import {
  maxStageWidth,
  maxStageHeight,
  stageHeight,
  stageWidth,
} from "./constants";
import { Row, Col, Form } from "react-bootstrap";
import Shapes from "./Shapes";
import ShapesButton from "./ShapesButton";
import ShapesProperties from "./ShapesProperties";
import AddShapesButton from "./AddShapesButton";
import Shape from "./Shapes/Shape";
import RectangleShape from "./Shapes/RectangleShape";
import CircleShape from "./Shapes/CircleShape";
import StarShape from "./Shapes/StarShape";

const MemeGenerator = () => {
  const [state, setState] = useState({
    shapes: [],
    inputs: [],
    images: [],
    // selected:false,
    backgroundImageSrc: null,
    backgroundImageName: null,
    templateName: null,
    show: false,
    selectedText: null,

    selectedRect: null,
    selectedShape: null,
    selectedCircle: null,
    selectedStar: null,

    selectedTextarea: null,
    selectedImage: null,
    src: "",
    stageWidth: maxStageWidth,
    stageHeight: maxStageHeight,
    // triggerCors: false,
    defaultSelect: "",
  });

  const stageRef = useRef();

  const addText = () => {
    const inputs = state.inputs;
    if (state.selectedText != null) {
      inputs[state.selectedText].selected = false;
    }
    setState((state) => ({
      ...state,
      inputs: [
        ...inputs,
        {
          x: 150,
          y: 150,
          text: "Write something",
          fontSize: 25,
          selected: true,
          fontFamily: "Impact",
          fill: "#ffffff",
          strokeWidth: 1.5,
          stroke: "#000000",
          shadowColor: "#000000",
          align: "center",
          padding: 5,
          letterSpacing: 1,
          lineHeight: 1,
          textDecoration: "none",
          verticalAlign: "top",
          opacity: 1,
          shadowOpacity: 1,
          shadowBlur: 0,
        },
      ],
      selectedText: state.inputs.length,
    }));
  };
  //////////////////////////////////////////////////////////////////////////////////
  //for add shape
  const addShapes = (shapeType) => {
    const shapes = state.shapes;

    if (state.selectedShape != null) {
      shapes[state.selectedShape].selected = false;
    }

    setState((state) => ({
      ...state,
      shapes: [
        ...shapes,
        {
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          radius: 30,
          innerRadius: 20,
          outerRadius: 40,
          numPoints: 6,
          verticalAlign: "top",
          stroke: "#000000",
          strokeWidth: 1.5,
          shadowBlur: 1,
          shadowColor: "#c95555",
          shadowOpacity: 1,
          fill: "#c95555",
          align: "center",
          padding: 5,
          opacity: 1,
          type: shapeType,
          selected: true,
        },
      ],
      selectedShape: state.shapes.length,
    }));
  };

  const addImage = (e) => {
    const files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setState((state) => ({
        ...state,
        images: [
          ...state.images,
          {
            properties: {
              x: 40,
              y: 50,
            },
            src: e.target.result,
          },
        ],
        selectedImage: state.images.length,
      }));
    };
  };

  const handleTextChange = (key, value) => {
    if (state.selectedText === null) {
      alert("please select a Object");
      return;
    }

    const inputs = state.inputs;
    inputs[state.selectedText][key] = value;
    inputs[state.selectedText].selected = !false;
    setState((state) => ({
      ...state,
      inputs,
    }));
  };

  //for changes in Shape

  const handleShapeProperties = (key, value) => {
    if (state.selectedShape === null) {
      alert("please select a Shape");
      return;
    }

    const shapes = state.shapes;
    shapes[state.selectedShape][key] = value;
    shapes[state.selectedShape].selected = true;
    // console.log(shapes)
    setState((state) => ({
      ...state,
      shapes,
    }));
  };

  const selectText = (index, textarea) => {
    const inputs = state.inputs;
    const oldSelected = state.selectedText;
    // console.log(inputs.indexOf(oldSelected))    ok
    if (oldSelected != null) {
      inputs[oldSelected].selected = false;
    }
    if (index != null) {
      inputs[index].selected = true;
    }
    setState((state) => ({
      ...state,
      inputs,
      selectedText: index,
      selectedTextarea: textarea,
    }));
  };

  //for selecting Shapes

  const selectShape = (index) => {
    const shapes = state.shapes;
    const oldSelected = state.selectedShape;
    // console.log(rects.indexOf(oldSelected))   ok
    if (oldSelected != null) {
      shapes[oldSelected].selected = false;
    }
    if (index != null) {
      shapes[index].selected = true;
    }
    setState((state) => ({
      ...state,
      shapes,
      selectedShape: index,
    }));
  };

  const selectImage = (index) => {
    // console.log(index);
    setState((state) => ({
      ...state,
      selectedImage: index,
    }));
  };

  const deleteText = (index) => {
    const id = index;
    if (id != null) {
      const inputs = state.inputs;
      inputs.splice(id, 1);

      setState((state) => ({
        ...state,
        inputs,
        selectedText: null,
        selectedTextarea: null,
      }));
    } else {
      alert("please select a Object");
    }
  };

  // for deleting shapes

  function deleteShape(i) {
    // const id = i;
    // console.log(i)
    if (i != null) {
      const shapes = state.shapes;
      // console.log('Before: ',shapes);
      // console.log(shapes.map(rect=>rect));
      shapes.splice(i, 1);
      // console.log('After: ',shapes);
      setState((state) => ({
        ...state,
        shapes,
        selectedShape: null,
        // selectedTextarea: null,
      }));
    } else {
      alert("please select a shape");
    }
  }

  const handleDragStart = (index) => {
    // let index5 = key
    let shapes = state.shapes;
    const shape = shapes.find((i) => i.index === index);
    //  const index = shapes.indexOf(shape);
    // remove from the list:
    shapes.splice(index, 1);
    // add to the top
    shapes.push(shape);
    setState((state) => ({
      ...state,
      shapes,
    }));
  };

  const handleDragEndShape = (target, index) => {
    let shapes = state.shapes;
    // let key =index
    const shape = shapes.find((i) => i.index === index);

    shapes[index].x = target.x;
    shapes[index].y = target.y;
    shapes[index].rotation = target?.rotation;
    shapes[index].scaleX = target.scaleX;
    shapes[index].scaleY = target.scaleY;
    // console.log(shapes)
    // if(shapes[index].innerRadius !== null){
    //   target.innerRadius = shapes[index].innerRadius;
    // }

    // ///////////////////////////////////////////////
    // shapes = state.shapes.slice();
    // const index2 = state.shapes.indexOf(shape);
    // update item position
    // shapes[index] = {
    //   ...shape,
    //   x:target.x,
    //   y:target.y,
    // };
    // setState({ shapes });

    /////////////////////////////////////////////////////////////////

    // shapes[index].width = target.width;
    // shapes[index].height = target.height;
    setState((state) => ({
      ...state,
      shapes,
    }));
  };

  const handleDragEnd = (target, index) => {
    let inputs = state.inputs;
    inputs[index].x = target.x;
    inputs[index].y = target.y;
    setState((state) => ({
      ...state,
      inputs,
    }));
  };

  const deleteImage = () => {
    const id = state.selectedImage;
    if (id != null) {
      const images = state.images;
      delete images[id];
      setState((state) => ({
        ...state,
        images,
        selectedImage: null,
      }));
    } else {
      alert("please select a image");
    }
  };

  const addBackground = (e) => {
    const file = e.target.files[0];
    var fr = new FileReader();

    var img = new Image();
    img.onload = () => {
      let stageWidth = img.width;
      let stageHeight = img.height;
      stageWidth = stageWidth > maxStageWidth ? maxStageWidth : stageWidth;
      stageHeight = stageHeight > maxStageHeight ? maxStageHeight : stageHeight;

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

  const returnDataURL = () => {
    const dataURL = stageRef.current
      ? stageRef.current.getStage().toDataURL()
      : null;
    //console.log(dataURL)
    return dataURL;
  };

  // const getShape= (shape, index)=>{
  //   let _shape;
  //   switch(shape.type){
  //     case 'rect':
  //       _shape = <RectangleShape
  //         rect={shape}
  //         index={index}
  //         key={index}
  //         handleRectChange={handleShapeProperties}
  //         selectedRect={selectShape}
  //         selected={shapes[selectedShape]}
  //         deleteRect={() => deleteShape(index)}
  //         handleDragEndRect={handleDragEndShape}
  //       />;
  //       break;
  //     case 'circle':
  //       _shape= <CircleShape
  //         circle={shape}
  //         index={index}
  //         key={index}
  //         selectedCircle={selectShape}
  //         selected={shapes[selectedShape]}
  //         deleteCircle={() => deleteShape(index)}
  //       />
  //     break;
  //     case 'star':
  //       _shape = <StarShape
  //         star={shape}
  //         index={index}
  //         key={index}
  //         selectedRect={selectShape}
  //         deleteStar={() => deleteShape(index)}
  //       />
  //       break;
  //     default: _shape = null;
  //   }
  //   return _shape;
  // }

  const {
    shapes,
    src,
    backgroundImageSrc,
    stageWidth,
    stageHeight,
    images,
    inputs,
    selectedText,
    selectedShape,
    selectedCircle,
    triggerCors,
  } = state;

  return (
    <Grid container>
      <Grid item xs={2}>
        <TextProperties
          handleTextChange={handleTextChange}
          selectedText={selectedText}
          text={inputs[selectedText]}
        />
        <ShapesProperties
          handleShapeProperties={handleShapeProperties}
          shape={shapes[selectedShape]}
        />
      </Grid>
      <Grid item xs={10}>
        <Col id="canvasDiv" xs={12}>
          <Row>
            <Col xs={3}>
              <label className="btn btn-outline-primary  col m-2">
                Change Background image
                <Form.Control type="file" onChange={addBackground} hidden />
              </label>
            </Col>
            <Col xs={2}>
              <label className="btn btn-outline-primary  col m-2 d-flex">
                <span className="m-auto">Add Image</span>
                <Form.Control type="file" onChange={addImage} hidden />
              </label>
            </Col>
            <Col xs={2} align="center" style={{ paddingTop: "0px" }}>
              <Button
                variant="outline-primary"
                className={classes.bn29}
                onClick={addText}
              >
                Add Text
              </Button>
            </Col>
            <Col xs={2} align="center" style={{ paddingTop: "0px" }}>
              <AddShapesButton
                variant="outline-primary"
                className={classes.bn29}
                addRects={() => addShapes("rect")}
                addCircle={() => addShapes("circle")}
                addStar={() => addShapes("star")}
              />
            </Col>
            <Col xs={2}>
              <Download
                dataURL={returnDataURL}
                width={stageWidth}
                height={stageHeight}
              />
            </Col>
          </Row>
          <Row className={classes.stage}>
            <Col className="pt-2">
              <Stage
                className={classes.canvas}
                width={stageWidth}
                height={stageHeight}
                ref={stageRef}
              >
                <Layer>
                  <CanvasImage
                    // style={{ zIndex: "-9999" }}
                    src={backgroundImageSrc ? backgroundImageSrc : src}
                    width={stageWidth}
                    triggerCors={triggerCors}
                    height={stageHeight}
                  />
                  {images &&
                    images.map((image, index) => {
                      if (image === undefined) {
                        return null;
                      } else {
                        return (
                          <AddedImage
                            src={image.src}
                            properties={image.properties}
                            key={index}
                            index={index}
                            selectedImage={selectImage}
                            deleteImage={deleteImage}
                          />
                        );
                      }
                    })}
                  {inputs &&
                    inputs.map((input, index) => {
                      return (
                        <CanvasText
                          input={input}
                          handleDragEnd={handleDragEnd}
                          stagePosition={() =>
                            stageRef.container().getBoundingClientRect()
                          }
                          handleTextChange={handleTextChange}
                          index={index}
                          key={index}
                          selectedText={selectText}
                          deleteText={() => deleteText(index)}
                        />
                      );
                    })}

                  {shapes &&
                    shapes.map((shape, index) => {
                      return (
                        <Shape
                          shapes={shapes}
                          shape={shape}
                          index={index}
                          key={index}
                          handleDragStart={handleDragStart}
                          handleShapeChange={handleShapeProperties}
                          selectedShape={selectShape}
                          selected={shapes[selectedShape]}
                          deleteShape={() => deleteShape(index)}
                          handleDragEndShape={handleDragEndShape}
                        />
                      );
                    })}
                </Layer>
              </Stage>
            </Col>
          </Row>
        </Col>
      </Grid>
    </Grid>
  );
};

export default MemeGenerator;
