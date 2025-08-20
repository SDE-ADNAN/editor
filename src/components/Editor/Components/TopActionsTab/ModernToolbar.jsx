import React, { useContext, useState } from 'react';
import {
  MdUndo,
  MdRedo,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatColorText,

  MdAutoAwesome,
  MdMoreHoriz,
  MdDelete,
  MdContentCopy,
  MdOpacity
} from 'react-icons/md';
import { EditorCtx } from '../MainEditor';

const fontFamilies = [
  "Arial",
  "Helvetica", 
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Courier New",
  "Comic Sans MS",
  "Impact",
  "Trebuchet MS",
  "Arial Black",
  "Palatino",
  "Garamond",
  "Bookman",
  "Avant Garde"
];

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96, 144];

function ModernToolbar({ state, selectedObject, shape, onDeleteObject, onDuplicateObject }) {
  const Ctx = useContext(EditorCtx);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  const isTextSelected = shape?.type === 'text';
  const hasSelectedObject = selectedObject !== null;

  const handleFontChange = (font) => {
    if (isTextSelected) {
      Ctx.handleShapeProperties('fontFamily', font);
      Ctx.updateUndoRedo({
        index: selectedObject,
        object: { ...shape, fontFamily: font },
        type: 'Modified',
      });
    }
  };

  const handleFontSizeChange = (size) => {
    if (isTextSelected) {
      Ctx.handleShapeProperties('fontSize', size);
      Ctx.updateUndoRedo({
        index: selectedObject,
        object: { ...shape, fontSize: size },
        type: 'Modified',
      });
    }
  };

  const handleColorChange = (color) => {
    if (hasSelectedObject) {
      Ctx.handleShapeProperties('fill', color);
      Ctx.updateUndoRedo({
        index: selectedObject,
        object: { ...shape, fill: color },
        type: 'Modified',
      });
    }
  };

  const handleTextStyle = (style, value) => {
    if (isTextSelected) {
      Ctx.handleShapeProperties(style, value);
      Ctx.updateUndoRedo({
        index: selectedObject,
        object: { ...shape, [style]: value },
        type: 'Modified',
      });
    }
  };

  const handleAlignment = (align) => {
    if (isTextSelected) {
      Ctx.handleShapeProperties('align', align);
      Ctx.updateUndoRedo({
        index: selectedObject,
        object: { ...shape, align: align },
        type: 'Modified',
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section - Undo/Redo */}
        <div className="flex items-center space-x-2">
          <button
            onClick={Ctx.undo}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Undo"
          >
            <MdUndo className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={Ctx.redo}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Redo"
          >
            <MdRedo className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
        </div>

        {/* Center Section - Text Tools */}
        <div className="flex items-center space-x-4 flex-1 justify-center">
          {isTextSelected && (
            <>
              {/* Font Family */}
              <select
                value={shape?.fontFamily || 'Arial'}
                onChange={(e) => handleFontChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>

              {/* Font Size */}
              <select
                value={shape?.fontSize || 16}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-16"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <div className="w-px h-6 bg-gray-300"></div>

              {/* Text Style Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleTextStyle('fontStyle', shape?.fontStyle === 'bold' ? 'normal' : 'bold')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.fontStyle === 'bold' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Bold"
                >
                  <MdFormatBold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleTextStyle('fontStyle', shape?.fontStyle === 'italic' ? 'normal' : 'italic')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.fontStyle === 'italic' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Italic"
                >
                  <MdFormatItalic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleTextStyle('textDecoration', shape?.textDecoration === 'underline' ? 'none' : 'underline')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.textDecoration === 'underline' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Underline"
                >
                  <MdFormatUnderlined className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleTextStyle('textDecoration', shape?.textDecoration === 'line-through' ? 'none' : 'line-through')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.textDecoration === 'line-through' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Strikethrough"
                >
                  <MdFormatStrikethrough className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300"></div>

              {/* Alignment Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleAlignment('left')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.align === 'left' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Align Left"
                >
                  <MdFormatAlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAlignment('center')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.align === 'center' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Align Center"
                >
                  <MdFormatAlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAlignment('right')}
                  className={`p-2 rounded-md transition-colors ${
                    shape?.align === 'right' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Align Right"
                >
                  <MdFormatAlignRight className="w-4 h-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300"></div>
            </>
          )}

          {/* Color Picker */}
          {hasSelectedObject && (
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1 cursor-pointer">
                <MdFormatColorText className="w-4 h-4 text-gray-600" />
                <input
                  type="color"
                  value={shape?.fill || '#000000'}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                  title="Text Color"
                />
              </label>
            </div>
          )}

          {/* Effects Button */}
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            title="Effects"
          >
            <div className="flex items-center space-x-2">
              <MdAutoAwesome className="w-4 h-4" />
              <span>Effects</span>
            </div>
          </button>
        </div>

        {/* Right Section - Object Actions */}
        <div className="flex items-center space-x-2">
          {hasSelectedObject && (
            <>
              {/* Opacity Slider */}
              <div className="flex items-center space-x-2">
                <MdOpacity className="w-4 h-4 text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={shape?.opacity || 1}
                  onChange={(e) => {
                    const opacity = Number(e.target.value);
                    Ctx.handleShapeProperties('opacity', opacity);
                    Ctx.updateUndoRedo({
                      index: selectedObject,
                      object: { ...shape, opacity },
                      type: 'Modified',
                    });
                  }}
                  className="w-20"
                  title="Opacity"
                />
              </div>

              <div className="w-px h-6 bg-gray-300 mx-2"></div>

              {/* Duplicate Button */}
              <button
                onClick={() => onDuplicateObject && onDuplicateObject()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Duplicate"
              >
                <MdContentCopy className="w-4 h-4 text-gray-600" />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => onDeleteObject && onDeleteObject()}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                title="Delete"
              >
                <MdDelete className="w-4 h-4" />
              </button>
            </>
          )}

          {/* More Options */}
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="More Options"
          >
            <MdMoreHoriz className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* More Options Panel */}
      {showMoreOptions && hasSelectedObject && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Stroke/Border Options */}
            {shape?.type !== 'image' && (
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Border:</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={shape?.strokeWidth || 0}
                  onChange={(e) => {
                    const strokeWidth = Number(e.target.value);
                    Ctx.handleShapeProperties('strokeWidth', strokeWidth);
                    Ctx.updateUndoRedo({
                      index: selectedObject,
                      object: { ...shape, strokeWidth },
                      type: 'Modified',
                    });
                  }}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="Width"
                />
                <input
                  type="color"
                  value={shape?.stroke || '#000000'}
                  onChange={(e) => {
                    const stroke = e.target.value;
                    Ctx.handleShapeProperties('stroke', stroke);
                    Ctx.updateUndoRedo({
                      index: selectedObject,
                      object: { ...shape, stroke },
                      type: 'Modified',
                    });
                  }}
                  className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                  title="Border Color"
                />
              </div>
            )}

            {/* Shadow Options */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Shadow:</label>
              <input
                type="number"
                min="0"
                max="50"
                value={shape?.shadowBlur || 0}
                onChange={(e) => {
                  const shadowBlur = Number(e.target.value);
                  Ctx.handleShapeProperties('shadowBlur', shadowBlur);
                  Ctx.updateUndoRedo({
                    index: selectedObject,
                    object: { ...shape, shadowBlur },
                    type: 'Modified',
                  });
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Blur"
              />
              <input
                type="color"
                value={shape?.shadowColor || '#000000'}
                onChange={(e) => {
                  const shadowColor = e.target.value;
                  Ctx.handleShapeProperties('shadowColor', shadowColor);
                  Ctx.updateUndoRedo({
                    index: selectedObject,
                    object: { ...shape, shadowColor },
                    type: 'Modified',
                  });
                }}
                className="w-8 h-6 border border-gray-300 rounded cursor-pointer"
                title="Shadow Color"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModernToolbar;
