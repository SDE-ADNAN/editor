import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Group, Image } from "react-konva";




// USAGE
{/* <RoundedImage
            filters={[Konva.Filters.Contrast]}
            Contrast={122}
            x={10}
            y={10}
            height={250}
            width={300}
            cornerRadius={20}
            image={image}
          /> */}

const RoundedImage = ({ x, y, width, height, cornerRadius, image }) => (
  <Group
    clipFunc={ctx => {
      ctx.beginPath();
      ctx.moveTo(x + cornerRadius, y);
      ctx.lineTo(x + width - cornerRadius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
      ctx.lineTo(x + width, y + height - cornerRadius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - cornerRadius,
        y + height
      );
      ctx.lineTo(x + cornerRadius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
      ctx.lineTo(x, y + cornerRadius);
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
      ctx.closePath();
    }}
  >
    <Image x={x} y={y} width={width} height={height} image={image} />
  </Group>
);

export default RoundedImage;