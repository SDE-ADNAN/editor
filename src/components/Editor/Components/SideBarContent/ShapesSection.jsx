import React, { useContext } from "react";
import { 
  FaSquare, 
  FaCircle, 
  FaStar, 
  FaPlay 
} from "react-icons/fa";
import { EditorCtx } from "../MainEditor";

const ShapesSection = ({ addObject, state }) => {
  const Ctx = useContext(EditorCtx);

  const addShape = (shapeType, additionalProps = {}) => {
    const baseObject = {
      type: "shape",
      x: 34,
      y: 50,
      selected: false,
      cornerRadius: 10,
      topLeft: 0,
      topRight: 0,
      bottomLeft: 0,
      bottomRight: 0,
      fill: "white",
      strokeWidth: 1.5,
      stroke: "#000000",
      shadowColor: "black",
      align: "center",
      opacity: 1,
      shadowOpacity: 1,
      shadowBlur: 0,
      width: 100,
      height: 100,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      shapeType,
      ...additionalProps
    };

    Ctx.updateUndoRedo({
      index: state.objects.length,
      object: baseObject,
      type: "Modified",
    });

    Ctx.showActionMenu();
    addObject({
      type: "shape",
      shapeType,
      index: state.selectedObject,
    });
  };

  return (
    <div className="h-full bg-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shapes</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Square */}
        <div 
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex items-center justify-center h-20"
          onClick={() => addShape("rect")}
        >
          <FaSquare className="w-8 h-8 text-gray-600" />
        </div>

        {/* Circle */}
        <div 
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex items-center justify-center h-20"
          onClick={() => addShape("circle", { radius: 50 })}
        >
          <FaCircle className="w-8 h-8 text-gray-600" />
        </div>

        {/* Star */}
        <div 
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex items-center justify-center h-20"
          onClick={() => addShape("star", { 
            innerRadius: 15,
            outerRadius: 40,
            numPoints: 5,
            points: [92, 50, 150, 150, 34, 150]
          })}
        >
          <FaStar className="w-8 h-8 text-gray-600" />
        </div>

        {/* Triangle */}
        <div 
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex items-center justify-center h-20"
          onClick={() => addShape("triangle")}
        >
          <FaPlay className="w-8 h-8 text-gray-600 rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default ShapesSection;
