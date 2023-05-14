import { Image } from "react-konva";

import React, { Component } from "react";

// import { useEffect, useState,useRef } from "react";

// function CanvasImage(props) {
//   const [image, setImage] = useState(null);
//   // let imgRef=useRef();

//   function  handleLoad  (){
//     // after setState react-konva will update canvas and redraw the layer
//     // because "image" property is changed
//     setImage(image);
//     // if you keep same image object during source updates
//     // you will have to update layer manually:
//     // this.imageNode.getLayer().batchDraw();
//   };

//   function loadImage  ()  {
//     // save to "this" to remove "load" handler on unmount
//     let image2 = new window.Image();
//     let src = props.src;

//     image2.src = src;
//     image2.sameSite = "None";
//     image2.crossOrigin = "anonymous";
//     image2.width = props.width;
//     image2.height = props.height;
//     image2.addEventListener("load", handleLoad);
//   };

//   useEffect(()=>{
//         if (!props.src) {
//           setImage(null);
//         } else {
//           loadImage();
//         }
//       return () => {
//         if(props.src){
//           image.removeEventListener("load", handleLoad);
//         }
//       };
//     },
//     []
//   );

//   return (
//     <Image
//       x={props.x}
//       y={props.y}
//       image={image}
//     />
//   );
// }

// export default CanvasImage;

class CanvasImage extends Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    const { props } = this;
    if (
      oldProps.src !== props.src ||
      oldProps.width !== props.width ||
      oldProps.height !== props.height
    ) {
      if (!this.props.src) {
        this.setState({
          image: null,
        });
      } else {
        this.loadImage();
      }
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  //image will load at last
  async loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    let src = this.props.src;
    this.image.src = src;
    this.image.sameSite = "None";
    this.image.crossOrigin = "anonymous";
    this.image.width = this.props.width;
    this.image.height = this.props.height;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      // <EditorCtx.Consumer>
      //   {(ctx) => {
      //     return (
      //       <>
      <Image
        // onClick={() => {
        //   ctx.showActionMenu();
        //   console.log("from below of ctx");
        // }}
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
      //       </>
      //     );
      //   }}
      // </EditorCtx.Consumer>
    );
  }
}

export default CanvasImage;
