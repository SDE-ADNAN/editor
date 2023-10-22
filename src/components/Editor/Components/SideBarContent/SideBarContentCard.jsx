/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useRef } from "react";
import { EditorCtx } from "../MainEditor";

import "./SideBarContentItem.css";

function SideBarContentCard(props) {
  const Ctx = useContext(EditorCtx);

  var imageRef = useRef();
  // function getBase64Image(img) {
  //   var canvas = document.createElement("canvas");
  //   var ctx = canvas.getContext("2d");
  //   // //////////////////////
  //   var imgWidth = img.naturalWidth;
  //   var screenWidth = canvas.width;
  //   var scaleX = 1;
  //   if (imgWidth > screenWidth) scaleX = screenWidth / imgWidth;
  //   var imgHeight = img.naturalHeight;
  //   var screenHeight = canvas.height;
  //   var scaleY = 1;
  //   if (imgHeight > screenHeight) scaleY = screenHeight / imgHeight;
  //   var scale = scaleY;
  //   if (scaleX < scaleY) scale = scaleX;
  //   if (scale < 1) {
  //     imgHeight = imgHeight * scale;
  //     imgWidth = imgWidth * scale;
  //   }

  //   canvas.height = imgHeight;
  //   canvas.width = imgWidth;

  //   ctx.drawImage(
  //     img,
  //     0,
  //     0,
  //     img.naturalWidth,
  //     img.naturalHeight,
  //     0,
  //     0,
  //     imgWidth,
  //     imgHeight
  //   );
  //   // /////////////////////////
  //   // canvas.width = 100;
  //   // canvas.height = 150;

  //   // ctx.drawImage(img, 0, 0, 100, 100 * (img.height / img.width));
  //   var dataURL = canvas.toDataURL("image/png");
  //   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  // }

  // function getBase64Image2(img) {
  //   // Create an empty canvas element
  //   var canvas = document.createElement("canvas");
  //   canvas.width = img.width;
  //   canvas.height = img.height;

  //   // Copy the image contents to the canvas
  //   var ctx = canvas.getContext("2d");
  //   ctx.drawImage(img, 0, 0);

  //   // Get the data-URL formatted image
  //   // Firefox supports PNG and JPEG. You could check img.src to guess the
  //   // original format, but be aware the using "image/jpg" will re-encode the image.
  //   var dataURL = canvas.toDataURL("image/png");

  //   return dataURL;
  // }

  const addImgToCanvas = (event) => {
    // const dataURI = getBase64Image(event.target);

    props.addPexelImg({
      type: "image",
      event,
      dataUri: props.src,
      height: event.target.height,
      width: event.target.width,
    });
  };

  return (
    <div key={props.index}>
      {props.template && (
        <div
          key={props.index}
          crossOrigin="anonymous"
          onClick={() => {
            Ctx.addTemplate(props.templateObj);
            Ctx.checkSize();
          }}
          className="card slide-in-blurred-bottom"
        >
          <img
            // className="image"
            // width="100px"
            onClick={() => Ctx.setShowmenu(false)}
            src={props?.src}
            crossOrigin="anonymous"
          ></img>
        </div>
      )}
      {!props.template && (
        <div
          key={props.index}
          crossOrigin="anonymous"
          className="card slide-in-blurred-bottom"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              onClick={(e) => {
                addImgToCanvas(e);
                // console.log(imageRef.current.files);
                // console.log(props.src);
              }}
              // className="image"
              // width="100px"
              src={props.src}
              htmlFor={`raised-button-file${props.name}${props.index}`}
              crossOrigin="anonymous"
            ></img>
            <input
              style={{ display: "none" }}
              type="file"
              id={`raised-button-file${props.name}${props.index}`}
              ref={imageRef}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBarContentCard;
