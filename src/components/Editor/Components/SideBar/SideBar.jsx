/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";


import { EditorCtx } from "../MainEditor";
import { 
  MdApps, 
  MdTextFields, 
  MdCrop, 
  MdCloudUpload, 
  MdPalette,
  MdLayers,
  MdAspectRatio,
  MdFormatQuote,
  MdQrCode,
  MdVideoLibrary,
  MdAutoAwesome
} from "react-icons/md";

function SideBar(props) {
  // const [isSelected,setIsSelected ] = useState(false)\
  const Ctx = useContext(EditorCtx);

  const handleClick = (contentType) => {
    if (contentType !== " ") {
      props.setContent(contentType);
    }
    // if(!isSelected) {
    //   setIsSelected(true)
    // }else{
    //   setIsSelected(false)
    // }
  };
  // const handleRequest = () => {
  //   handleClick("elements");
  //   // props.getImagesPexels()
  // };

  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState();
  const [title, /*setTitle*/] = useState("");
  const [subtitle, /*setSubtitle*/] = useState("");
  const [body, /*setBody*/] = useState("");

  const addPexelImg = ({ type = "", e, dataUri = "" }) => {
    props.addObject({
      type: type,
      e,
      index: props.state.selectedObject,
      src: dataUri,
      imageType: "pexelsImage",
    });
  };

  return (
    <div className="h-full w-full flex flex-col items-center py-4 px-2 bg-gray-900 border-r border-gray-800">
      {/* Navigation Items */}
      <div className="flex flex-col space-y-2 w-full">
            {/* Icons Section */}
            <div 
              onClick={() => handleClick("templates")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "templates" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdApps className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Templates</span>
              {props.contentType === "templates" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Text Section */}
            <div 
              onClick={() => handleClick("text")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "text" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdTextFields className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Text</span>
              {props.contentType === "text" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Shapes Section */}
            <div 
              onClick={() => handleClick("shapes")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "shapes" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdCrop className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Shapes</span>
              {props.contentType === "shapes" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Upload Section */}
            <div 
              onClick={() => handleClick("import")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "import" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdCloudUpload className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Upload</span>
              {props.contentType === "import" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Videos Section */}
            <div 
              onClick={() => handleClick("videos")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "videos" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdVideoLibrary className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Videos</span>
              {props.contentType === "videos" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Background Section */}
            <div 
              onClick={() => handleClick("bg-color")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "bg-color" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdPalette className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Background</span>
              {props.contentType === "bg-color" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Layers Section */}
            <div 
              onClick={() => handleClick("layers")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "layers" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdLayers className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Layers</span>
              {props.contentType === "layers" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Resize Section */}
            <div 
              onClick={() => handleClick("resize")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "resize" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdAspectRatio className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Resize</span>
              {props.contentType === "resize" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* Quotes Section */}
            <div 
              onClick={() => handleClick("quotes")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "quotes" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdFormatQuote className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Quotes</span>
              {props.contentType === "quotes" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>

            {/* QR Code Section */}
            <div 
              onClick={() => handleClick("qr-code")}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
                props.contentType === "qr-code" 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <div className="mb-1">
                <MdQrCode className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">QR code</span>
              {props.contentType === "qr-code" && (
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full"></div>
              )}
            </div>
        </div>

        {/* Bottom AI Section */}
        <div className="mt-auto mb-4">
          <div 
            onClick={() => handleClick("ai-tools")}
            className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex flex-col items-center group relative ${
              props.contentType === "ai-tools" 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600"
            }`}
          >
            <div className="mb-1">
              <MdAutoAwesome className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">AI Ting</span>
            {props.contentType === "ai-tools" && (
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-pink-400 rounded-full"></div>
            )}
          </div>
        </div>
    </div>
  );
}

export default SideBar;
