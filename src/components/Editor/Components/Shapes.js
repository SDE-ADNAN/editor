import React from "react";
import {

  Group,
 
} 
from "react-konva";
import CircleShape from "./Shapes/CircleShape";
import EllipseShape from "./Shapes/EllipseShape";
import LineShape from "./Shapes/LineShape";
import RectangleShape from "./Shapes/RectangleShape";
import StarShape from "./Shapes/StarShape";

function Shapes() {
  return (
    <Group>
      <RectangleShape />
      <CircleShape />
      <LineShape />
      <EllipseShape />
      <StarShape />
    </Group>
  );
}

export default Shapes;
