import * as React from "react";

const shapes = [
  { name: "Rectangle", action: "addRects" },
  { name: "Circle", action: "addCircle" },
  { name: "Star", action: "addStar" }
];

function AddShapesButton(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleShapeClick = (actionName) => {
    if (props[actionName]) {
      props[actionName]();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        onClick={toggleDropdown}
      >
        ADD SHAPES
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
          <div className="py-1">
            {shapes.map((shape, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleShapeClick(shape.action)}
              >
                {shape.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddShapesButton;
