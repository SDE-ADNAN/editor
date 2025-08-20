/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";

import { Link } from "react-router-dom";
import ButtonLarge from "./Buttons/ButtonLarge";
import TemplatesCard from "./Cards/TemplatesCard";

const templates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function EditorTemplates() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <NavBar linkText="/pamphlet/create/editor-home" />
      <div className="body">
        {/* <div className="select-sec">
          <div style={{ width: "50%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonLarge text="You Might Like" />
            </div>
          </div>
          <div style={{ width: "50%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ButtonLarge text="Categories" />
            </div>
          </div>
        </div> */}
        <div className="opt-flex">
          <div
            className={!show ? "opt-text" : "opt-text-selected"}
            onClick={() => setShow(true)}
          >
            You Might Like
          </div>
          <div
            className={show ? "opt-text" : "opt-text-selected"}
            onClick={() => setShow(false)}
          >
            Categories
          </div>
        </div>
        {show && (
          <>
            <div className="cards-flex">
              {templates.map((template, index) => {
                return <TemplatesCard />;
              })}
            </div>
          </>
        )}
        {!show && <h1>category</h1>}
      </div>
    </div>
  );
}

export default EditorTemplates;
