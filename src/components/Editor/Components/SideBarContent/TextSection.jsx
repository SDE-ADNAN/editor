import React from "react";

const TextSection = ({ addObject, updateUndoRedo, selectedObject, objectsLength }) => {
  const handleAddText = (textType, text, fontSize) => {
    addObject({
      type: "text",
      text: text,
      textType: textType,
      fontSize: fontSize,
      fontFamily: "Arial",
      strokeWidth: 0,
      index: selectedObject,
    });
    
    updateUndoRedo({
      index: objectsLength,
      object: {
        type: "text",
        x: 150,
        y: 150,
        text: text,
        textType: textType,
        fontSize: fontSize,
        selected: true,
        width: 200,
        fontFamily: "Arial",
        fill: "#000000",
        strokeWidth: 0,
        stroke: "#000000",
        shadowColor: "#000000",
        align: "center",
        padding: 5,
        letterSpacing: 1,
        lineHeight: 1,
        textDecoration: "none",
        verticalAlign: "top",
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        offsetX: 100,
        offsetY: 0,
        shadowOpacity: 1,
        shadowBlur: 0,
      },
      type: "Modified",
    });
  };

  return (
    <div className="h-full bg-white">
      {/* Text Section Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex border-b border-gray-200">
          <button className="px-4 py-3 text-blue-600 border-b-2 border-blue-600 font-medium text-sm">
            Text
          </button>
          <button className="px-4 py-3 text-gray-500 hover:text-gray-700 font-medium text-sm">
            My fonts
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Text Options */}
        <div className="space-y-3 mb-8">
          {/* Create Header */}
          <div 
            className="cursor-pointer p-4 hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-blue-500"
            onClick={() => handleAddText("title", "Create header", 56)}
          >
            <h3 className="text-2xl font-bold text-gray-900">Create header</h3>
          </div>

          {/* Create Sub Header */}
          <div 
            className="cursor-pointer p-4 hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-blue-500"
            onClick={() => handleAddText("subtitle", "Create sub header", 32)}
          >
            <h4 className="text-lg font-semibold text-gray-700">Create sub header</h4>
          </div>

          {/* Create Body Text */}
          <div 
            className="cursor-pointer p-4 hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-blue-500"
            onClick={() => handleAddText("body", "Create body text", 18)}
          >
            <p className="text-base text-gray-600">Create body text</p>
          </div>
        </div>

        {/* Font Examples Section */}
        <div className="space-y-4">
          {/* Adventure Font Example */}
          <div 
            className="cursor-pointer p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => handleAddText("title", "Life is an ADVENTURE", 36)}
          >
            <div className="text-xl font-bold" style={{fontFamily: 'serif'}}>
              Life is an <span className="italic">ADVENTURE</span>
            </div>
          </div>

          {/* Congratulations Font Example */}
          <div 
            className="cursor-pointer p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => handleAddText("title", "Congratulations!", 32)}
          >
            <div className="text-lg font-semibold text-gray-900" style={{fontFamily: 'cursive'}}>
              Congratulations!
              <div className="text-sm text-gray-600 font-normal">Here is a Big Brother</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
