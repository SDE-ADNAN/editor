/* eslint-disable no-unused-vars */
import React, {Component } from "react";
import { Text, Transformer, Group } from "react-konva";
// const CanvasText = props => {

//   const [isHide, setIsHide] = useState(true);
//   const deleteRef = useRef();
//   const transformerRef = useRef();
//   const textRef = useRef();

//   useEffect(()=>{
//     if(props.input.selected){
//       checkNode();
//     }
//   },[]);

//   const textFieldOnDblClick = (e) => {
//     // Assigns the index of the selected text
//     const textNode = e.currentTarget.attrs;
//     const absolutePosition = e.currentTarget.absolutePosition();

//     setIsHide(false);

//     let areaPosition = {
//       x: absolutePosition.x + 20,
//       y: absolutePosition.y + 63,
//     };

//     var textarea = document.createElement("textarea");
//     document.getElementById("canvasDiv").appendChild(textarea);

//     textarea.value = textNode.text;
//     textarea.style.position = "absolute";
//     textarea.style.top = areaPosition.y + "px";
//     textarea.style.left = areaPosition.x + "px";
//     textarea.style.fontSize = textNode.fontSize + "px";
//     textarea.style.width = textNode.width - textNode.padding * 2 + "px";
//     textarea.style.height = textNode.height - textNode.padding * 2 + 5 + "px";
//     textarea.style.fontSize = textNode.fontSize + "px";
//     textarea.style.border = "none";
//     textarea.style.padding = "0px";
//     textarea.style.margin = "0px";
//     textarea.style.overflow = "hidden";
//     textarea.style.background = "none";
//     textarea.style.outline = "none";
//     textarea.style.resize = "none";
//     textarea.style.lineHeight = textNode.lineHeight;
//     textarea.style.fontFamily = textNode.fontFamily;
//     textarea.style.transformOrigin = "left top";
//     textarea.style.textAlign = textNode.align;
//     textarea.style.color = "black";
//     const rotation = textNode.rotation;
//     var transform = "";

//     if (rotation) {
//       transform += "rotateZ(" + rotation + "deg)";
//     }

//     var px = 0;

//     // also we need to slightly move textarea on firefox
//     // because it jumps a bit
//     var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
//     if (isFirefox) {
//       px += 2 + Math.round(textNode.fontSize / 20);
//     }
//     transform += "translateY(-" + px + "px)";

//     textarea.style.transform = transform;
//     // reset height
//     textarea.style.height = "auto";
//     // after browsers resized it we can set actual value
//     textarea.style.height = textarea.scrollHeight + 3 + "px";
//     textarea.focus();

//     textarea.onblur = () => {
//       props.handleTextChange("text", textarea.value);

//       document.getElementById("canvasDiv").removeChild(textarea);

//       setIsHide(true);
//     };

//     textarea.onTouchStart = () => {
//       props.handleTextChange("text", textarea.value);

//       document.getElementById("canvasDiv").removeChild(textarea);

//       setIsHide(true);
//     };

//     if (transformerRef.current) transformerRef.current.detach(textarea);

//     // Assigns the node to be deleted
//     props.selectedText(props.index, textarea);
//   };

//   const textFieldOnClick = (e) => {
//     if (props.input.selected === true) {
//       checkNode();
//       props.selectedText(props.index, null);
//     } else {
//       props.selectedText(null);
//     }
//   };

//   const checkNode = () => {
//     const selectedNode = textRef.current;
//     const deleteNode = deleteRef.current;
//     const transformer = transformerRef.current;
//     transformer.add(deleteNode);

//     if (props.input.selected) {
//       transformer.nodes([selectedNode]);
//       deleteNode.position(transformer.findOne(".top-right").position());
//     } else {
//       transformer.detach();
//     }

//     transformer.getLayer().batchDraw();
//   }

//   return (
//     <>
//       <Text
//         draggable
//         ref={textRef}
//         onClick={ textFieldOnClick}
//         onTouchStart={ textFieldOnClick}
//         visible={isHide}
//         {...props.input}
//         onDblClick={ textFieldOnDblClick}
//         onDblTap={ textFieldOnDblClick}
//         onDragEnd={(e) =>
//           props.handleDragEnd(e.currentTarget.attrs, props.index)
//         }
//       />

//       {props.input.selected && (
//         <Group>
//           <Transformer
//           ref={transformerRef}

//             onTransform={(e) => {
//               deleteRef.current.position(
//                 e.currentTarget.findOne(".top-right").position()
//               );
//             }}
//             onTransformEnd={(e) => {
//               props.handleTextChange("scaleX", e.target.attrs.scaleX);
//               props.handleTextChange("scaleY", e.target.attrs.scaleY);
//             }}
//           />
//           <CloseButton
//             deleteRef={deleteRef}
//             delete={props.deleteText}
//           />
//         </Group>
//       )}
//     </>
//   );
// }
// export default CanvasText;

class CanvasText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: true,
      MIN_WIDTH: 20,
    };
    this.setState = this.setState.bind(this);

    // this.deleteRef = React.createRef();
  }
  componentDidMount() {
    if (this.props.input.selected) {
      this.checkNode();
    }
  }

  textFieldOnDblClick = (e) => {
    // Assigns the index of the selected text
    const textNode = e.currentTarget.attrs;
    function transform() {
      // reset scale, so only width is changing by transformer
      textNode.setAttrs({
        width: textNode.width,
        scaleX: -1,
      });
    }
    const absolutePosition = e.currentTarget.absolutePosition();
    this.setState({
      isHide: false,
    });
    let areaPosition = {
      x: this.props.stageRefParent.current.offsetLeft + absolutePosition.x,
      y: this.props.stageRefParent.current.offsetTop + absolutePosition.y,
    };

    var textarea = document.createElement("textarea");
    document.getElementById("canvasDiv").appendChild(textarea);

    textarea.value = textNode.text;
    // console.log(textNode.x)
    textarea.style.position = "absolute";
    if (window.innerWidth < 600 && this.props.input?.isTemplateText) {
      textarea.style.fontSize = textNode.fontSize * 0.457 + "px";
      textarea.style.top = areaPosition.y + "px";
    } else {
      textarea.style.fontSize = textNode.fontSize + "px";
      textarea.style.top = areaPosition.y + "px";
    }
    textarea.style.left = areaPosition.x + "px";
    // textarea.style.fontSize = textNode.fontSize + "px";
    textarea.style.width = "-webkit-fill-available";
    textarea.style.height = textNode.fontSize + "px";
    // textarea.style.height = textNode.height - textNode.padding * 2 + 5 + "px";
    // textarea.style.height = textarea.scrollHeight + 3 + "px";
    textarea.style.border = "none";
    textarea.style.paddingLeft = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.stroke = textNode.stroke;
    textarea.style.strokeWidth = textNode.strokeWidth;
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight;
    textarea.style.fontFamily = textNode.fontFamily;
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = "left";
    textarea.style.color = textNode.fill;
    // textarea.style.scaleX = textNode.scaleX;
    // textarea.style.scaleY = textNode.scaleY;
    const rotation = textNode.rotation;

    // var transform = "";
    // if (rotation) {
    //   transform += "rotateZ(" + rotation + "deg)";
    // }
    var px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize / 20);
    }
    // transform += "translateY(-" + px + "px)";

    textarea.style.transform = transform;
    // reset height
    textarea.style.height = "auto";
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + "px";
    textarea.focus();

    // textarea.onblur = () => {
    //   this.props.handleTextChange("text", textarea.value);
    //   document.getElementById("canvasDiv").removeChild(textarea);
    //   this.setState({
    //     isHide: true,
    //   });
    // };
    textarea.addEventListener("click", (e) => {
      handleOutsideClick(e);
    });
    const handleOutsideClick = (e) => {
      if (
        e.target === textarea ||
        e.target !== textarea ||
        e.target === null ||
        e.target === undefined
      ) {
        // console.log(e.target);
        // console.log(textarea);

        this.props.handleTextChange("text", textarea.value);
        removeTextarea();
        this.props.selectedText(null);
      }
    };
    const removeTextarea = () => {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", (e) => handleOutsideClick(e));
      this.setState({
        isHide: true,
      });
      this.textNode.show();
    };
    textarea.addEventListener("keydown", (e) => {
      // hide on enter
      // but don't hide on shift + enter
      if (e.key === "Enter" && !e.shiftKey) {
        this.props.handleTextChange("text", textarea.value);
        removeTextarea();
        // console.log(this.props.state, "text");

        this.props.deSelectObject(this.props.index);
      }
      // on esc do not set value back to node
      if (e.key === "Escape") {
        removeTextarea();
        // console.log(this.props.state);
        this.props.deSelectObject(this.props.index);
      }
    });

    // textarea.onTouchStart = () => {
    //   this.props.handleTextChange("text", textarea.value);
    //   document.getElementById("canvasDiv").removeChild(textarea);
    //   this.setState({
    //     isHide: true,
    //   });
    // };
    if (this.transformer) this.transformer.detach(textarea);
    // Assigns the node to be deleted
    this.props.selectedText(this.props.index);
  };
  textFieldOnClick = (e) => {
    // console.log(this.props.state);
    // console.log(this.props.state.objects[this.props.index]);
    this.handleSelected();
    if (this.props.input.selected === true) {
      this.checkNode();
      this.props.selectedText(this.props.index);
    } else {
      this.props.selectedText(null);
    }
  };
  checkNode() {
    const selectedNode = this.textNode;
    // const deleteNode = this.deleteRef.current;
    // this.transformer.add(deleteNode);
    // console.log(this.props.input.selected)
    if (this.props.input.selected) {
      this.transformer.nodes([selectedNode]);
      // deleteNode.position(this.transformer.findOne(".top-right").position());
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  handleSelected = () => {
    this.props.showActionMenu();

    this.props.input.selected = !this.props.input.selected;
    this.forceUpdate();
  };

  render() {
    return (
      <React.Fragment>
        <Text
          key={this.props.index}
          scaleX={this.props.scaleX}
          scaleY={this.props.scaleY}
          // offsetX={this.props.input.width / 2}
          // offsetY={this.props.input.height / 2}
          // scale={this.props.scale}
          draggable={this.props.input.selected ? true : false}
          ref={(node) => {
            this.textNode = node;
          }}
          fontFamily={this.props.input.fontFamily}
          width={this.props.input.width}
          // height={this.props.input.height}
          onClick={(e) => {
            this.textFieldOnClick(e);
            console.log(e.currentTarget.attrs);
          }}
          onTouchEnd={(e) => this.textFieldOnClick(e)}
          visible={this.state.isHide}
          {...this.props.input}
          onDblClick={(e) => this.textFieldOnDblClick(e)}
          onDblTap={(e) => this.textFieldOnDblClick(e)}
          onTransform={(e) => {
            this.props.onTransform(
              e.currentTarget.attrs,
              this.props.index,
              this.textNode
            );
            this.props.handleDragEnd(e.currentTarget.attrs, this.props.index);
          }}
          onTransformEnd={(e) => {
            this.props.updateUndoRedo({
              index: this.props.index,
              object: {
                ...this.props.input,
                width: e.currentTarget.attrs.width,
                height: e.currentTarget.attrs.height,
              },
              type: "Modified",
            });
          }}
          onDragEnd={(e) => {
            this.props.handleDragEnd(e.currentTarget.attrs, this.props.index);
            this.props.updateUndoRedo({
              index: this.props.index,
              object: {
                ...this.props.input,
                x: e.currentTarget.attrs.x,
                y: e.currentTarget.attrs.y,
              },
              type: "Modified",
            });
          }}
        />

        {this.props.input.selected && (
          <Group>
            <Transformer
              enabledAnchors={[
                "top-left",
                "top-center",
                "top-right",
                "middle-right",
                "middle-left",
                "bottom-left",
                "bottom-center",
                "bottom-right",
              ]}
              resizeEnabled={true}
              anchorStroke="#084e99"
              anchorCornerRadius={5}
              anchorFill="#49c7f5"
              anchorSize={6}
              borderStroke="black"
              borderDash={[3, 3]}
              ref={(node) => {
                this.transformer = node;
              }}
              boundBoxFunc={(oldBox, newBox) => {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
              }}
              keepRatio={false}
              rotationSnaps={[0, 90, 180, 270]}
              onTransformEnd={(e) => {
                this.props.handleTextChange("scaleX", e.target.attrs.scaleX);

                this.props.handleTextChange("scaleY", e.target.attrs.scaleY);
              }}
            />
          </Group>
        )}
      </React.Fragment>
    );
  }
}

export default CanvasText;
