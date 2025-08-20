import * as React from "react";

function LayersMenu(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (type) => {
    props.layerFunc({ type, index: props.selectedObject });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        onClick={toggleDropdown}
      >
        Position
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
          <div className="py-1">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => handleAction("bottom")}
            >
              <span>↓</span>
              <span>Bottom</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => handleAction("backward")}
            >
              <span>←</span>
              <span>Backward</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => handleAction("forward")}
            >
              <span>→</span>
              <span>Forward</span>
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => handleAction("top")}
            >
              <span>↑</span>
              <span>Top</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LayersMenu;
