import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { EditorCtx } from "../MainEditor";
import "./ModalComponent.css";

function ModalComponent(props) {
  const [show, setShow] = useState(props.open);
  const Ctx = useContext(EditorCtx);

  const openModal = () => {
    setShow(!show);
  };

  // const getVariant = () => {
  //   if (
  //     window.innerWidth > 601 ||
  //     props.heading === "Fill" ||
  //     props.heading === "Opacity" ||
  //     props.heading === "Stroke" ||
  //     props.heading === "Border" ||
  //     props.heading === "Edit Text" ||
  //     props.heading === "Position"
  //   ) {
  //     return "";
  //   } else {
  //     return "white";
  //   }
  // };

  return (
    <>
      <div className="modal-btn" onClick={() => openModal()}>
        {props.button}
      </div>
      {props.open && (
        <Modal
          backdrop={false}
          className={`
          
          ${props.heading !== "Save File" ? "modal2" : ""}
          ${props.heading === "Save File" ? "modal-download" : ""}
          ${props.heading === "Templates" ? "templates-position" : ""}
          ${props.heading === "Save File" ? "absolute-position" : ""}
          ${props.heading === "Shapes" ? "shapes-position" : ""}
          ${props.heading === "Text" ? "text-position" : ""}
          ${props.heading === "Import" ? "import-position" : ""}
          ${props.heading === "Fill" ? "fill-position" : ""}
          ${props.heading === "Opacity" ? "opacity-position" : ""} 
          ${props.heading === "Stroke" ? "stroke-position" : ""} 
          ${props.heading === "Border" ? "border-position" : ""}
          ${props.heading === "Font Styles" ? "text-position" : ""}
          ${props.heading === "Position" ? "position-position" : ""}
          ${
            props.heading === "Import" ||
            props.heading === "Templates" ||
            props.heading === "Shapes" ||
            props.heading === "Text" ||
            props.heading === "Styles"
              ? "modal-for-sideBar-Items"
              : ""
          }
        `}
          show={show}
          onHide={() => {
            setShow(!show);
            Ctx.setSubModalType("");
          }}
          size="xl"
        >
          <Modal.Header
            closeButton
            closeVariant="white"
            className={`
            ${
              props.heading === "Fill" ||
              props.heading === "Opacity" ||
              props.heading === "Stroke" ||
              props.heading === "Text" ||
              props.heading === "Styles" ||
              props.heading === "Import" ||
              props.heading === "Templates" ||
              props.heading === "Shapes" ||
              props.heading === "Edit Text" ||
              props.heading === "Position" ||
              props.heading === "Font Styles" ||
              props.heading === "Font Styles" ||
              props.heading === "Replace"
                ? "modal-heading"
                : ""
            }`}
          >
            <Modal.Title>
              {props.heading === "Border" ? "Border Radius" : props.heading}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={`modal-body ${
              props.heading === "Import" ||
              props.heading === "Templates" ||
              props.heading === "Shapes" ||
              props.heading === "Text" ||
              props.heading === "Styles"
                ? "theme-bg"
                : ""
            }`}
            style={{ backgroundColor: "#EAF3FF", overflow: "scroll" }}
          >
            {props.body}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default ModalComponent;
