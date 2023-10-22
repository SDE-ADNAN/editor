import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
// import Offcanvas from "react-bootstrap/Offcanvas";
import "./ModalComponent.css";

function OffcanvasComponent(props) {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="Offcanvas-btn" onClick={() => openModal()}>
        {props.button}
      </div>
      <Offcanvas
        animation={false}
        placement="bottom"
        backdrop={false}
        className="Offcanvas Offcanvas-position"
        show={show}
        onHide={() => setShow(!show)}
        size="xl"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {props.heading === "Border" ? "Border Radius" : props.heading}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          className="Offcanvas-body"
          style={{ backgroundColor: "#EAF3FF", overflow: "scroll" }}
        >
          {props.body}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default OffcanvasComponent;
