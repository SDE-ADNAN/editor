import React, { Component } from "react";
import { Image, Transformer, Group } from "react-konva";
// import CloseButton from "./DeleteButton";
import { EditorCtx } from "./MainEditor";

class AddedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      selected: true,
    };
    this.imgRef = React.createRef();
    this.deleteRef = React.createRef();
    // console.log(props);
  }

  componentDidMount() {
    if (this.props.image.selected) {
      this.checkNode();
      this.loadImage();
    }
    this.loadImage();
  }

  checkNode() {
    // transormerı ayarlar
    const selectedNode = this.imgRef.current;
    // const deleteNode = this.deleteRef.current;
    // this.transformer?.add(deleteNode);
    if (this.props.image.selected) {
      this.transformer.nodes([selectedNode]);
      // deleteNode.position(this.transformer.findOne(".top-right").position());
    } else {
      this.transformer?.detach();
    }
    this.transformer?.getLayer().batchDraw();
  }

  componentDidUpdate(oldProps) {
    if (
      oldProps.src !== this.props.src &&
      oldProps.state !== this.props.state
    ) {
      this.loadImage();
      this.checkNode();
      // this.props.onTransform(
      //   this.imgRef.current.attrs,
      //   this.props.index,
      //   this.imgRef
      // );
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }

  handleSelect = () => {
    this.handleSelected();
    if (this.props.image.selected === true) {
      this.checkNode();
      this.props.selectedImage(this.props.index);
    } else {
      this.props.selectedImage(null);
    }
  };

  handleSelected = () => {
    this.props.showActionMenu();
    this.props.image.selected = !this.props.image.selected;
    this.forceUpdate();
    this.loadImage();
  };

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.crossOrigin = "anonymous";
    this.image.src = this.props.src;
    this.image.width = this.props.image.width;
    this.image.width = this.props.image.width;
    this.image.addEventListener("load", this.handleLoad);
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    this.checkNode();
  };
  // handleSelected = () => {
  //   this.setState(state => ({
  //     selected: !state.selected
  //   }))
  // }
  handleContextMenuClick = (e) => {
    if (e.type === "contextmenu") {
      console.log("Right click");
    } else if (e.type === "click") {
      console.log("Left click");
    }
  };

  render() {
    return (
      <EditorCtx.Consumer>
        {(ctx) => {
          return (
            <>
              <Image
                key={this.props.index}
                draggable={this.props.image.selected ? true : false}
                // onClick={() => {
                //   ctx.showActionMenu();
                //   console.log("from below of ctx");
                // }}
                onClick={() => {
                  this.handleSelect();
                }}
                onTouchEnd={this.handleSelect}
                onContextMenu={this.handleContextMenuClick}
                ref={this.imgRef}
                //////////////////////////////////
                onTransform={(e) => {
                  this.checkNode();
                  this.forceUpdate();
                  console.log(e.currentTarget.attrs);
                  this.props.onTransform(
                    e.currentTarget.attrs,
                    this.props.index,
                    this.imgRef
                  );
                  // this.props.handleDragEnd(
                  //   e.currentTarget.attrs,
                  //   this.props.index
                  // );
                }}
                onTransformEnd={(e) => {
                  this.props.updateUndoRedo({
                    index: this.props.index,
                    object: {
                      ...this.props.image,
                      x: e.currentTarget.attrs.x,
                      y: e.currentTarget.attrs.y,
                      width: e.currentTarget.attrs.width,
                      height: e.currentTarget.attrs.height,
                    },
                    type: "Modified",
                  });
                }}
                onDragEnd={(e) => {
                  this.props.handleDragEnd(
                    e.currentTarget.attrs,
                    this.props.index
                  );
                  this.props.updateUndoRedo({
                    index: this.props.index,
                    object: {
                      ...this.props.image,
                      x: e.currentTarget.attrs.x,
                      y: e.currentTarget.attrs.y,
                    },
                    type: "Modified",
                  });
                }}
                //////////////////////////////////
                // onDragEnd={(e) =>
                //   this.props.handleDragEnd(e.currentTarget.attrs, this.props.index)
                // }
                image={this.state.image}
                opacity={this.props.image.opacity}
                rotation={this.props.image.rotation}
                x={this.props.image.x}
                y={this.props.image.y}
                stroke={this.props.image.stroke}
                strokeWidth={this.props.image.strokeWidth}
                shadowBlur={this.props.image.shadowBlur}
                shadowColor={this.props.image.shadowColor}
                shadowOpacity={this.props.image.shadowOpacity}
                width={this.props.image.width}
                height={this.props.image.height}
                src={this.props.src}
              />
              {this.props.image.selected && (
                <Group>
                  <Transformer
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
                    rotate
                    onTransform={(e) => {
                      this.props.onTransform(
                        e.currentTarget.attrs,
                        this.props.index,
                        this.imgRef
                      );
                      this.props.handleShapeChange(
                        "scaleX",
                        e.target.attrs.scaleX
                      );
                      this.props.handleShapeChange(
                        "scaleY",
                        e.target.attrs.scaleY
                      );

                      // this.props.handleDragEnd(
                      //   e.currentTarget.attrs,
                      //   this.props.index
                      // );
                    }}
                    boundBoxFunc={(oldBox, newBox) => {
                      // limit resize
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                  {/* <CloseButton
                    deleteRef={this.deleteRef}
                    delete={this.props.deleteText}
                  /> */}
                </Group>
              )}
            </>
          );
        }}
      </EditorCtx.Consumer>
    );
  }
}

export default AddedImage;
