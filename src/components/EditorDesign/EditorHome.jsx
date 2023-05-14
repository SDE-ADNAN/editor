/* eslint-disable no-unused-vars */
import React from "react";
import BlankPageCard from "./Cards/BlankPageCard";
import TemplatesCard from "./Cards/TemplatesCard";
import "./EditorHome.css";
import NavBar from "./NavBar/NavBar";
import allIcon from "./all.png";
import { Link } from "react-router-dom";
import ButtonLarge from "./Buttons/ButtonLarge";
import { Paper } from "@mui/material";

const templates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function EditorHome() {
  return (
    <div className="home">
      <NavBar linkText="/pamphlet/create/" />
      <div className="body">
        <div>
          {" "}
          <div className="text">Design New Pamphlet</div>
          <div className="blank-page-card2">
            <Link to="/editor">
              <BlankPageCard />
            </Link>
          </div>
        </div>

        {/* <div className="text">Recently Used Templates</div>
        <Paper elevation={0} className="templatesCard-paper">
          <div className="templateCards">
            {templates.map((template, index) => {
              return <TemplatesCard image={allIcon} />;
            })}
            <TemplatesCard image={allIcon} text="see  all" />
          </div>
        </Paper> */}
        {/* <div className="text">You Might Like</div>
        <Paper elevation={0} className="templatesCard-paper">
          <div className="templateCards">
            {templates.map((template, index) => {
              return <TemplatesCard image={allIcon} />;
            })}
          </div>
        </Paper>
        <div className="lower-sec">
          <Link to="/pamphlet/create/editor-templates">
            <ButtonLarge text="Explore Templates" />
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default EditorHome;
