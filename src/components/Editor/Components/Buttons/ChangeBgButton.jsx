import React from "react";
import { Form } from "react-bootstrap";
import "./ChangeBgButton.css";

function ChangeBgButton(props) {
  return (
    <div>
      <label title="adc" className="btn1">
        Bg
        <Form.Control type="file" onChange={props.addBackground} hidden />
      </label>
    </div>
  );
}

export default ChangeBgButton;
