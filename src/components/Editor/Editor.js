import { Box, Breadcrumbs, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import NavBar from "../EditorDesign/NavBar/NavBar";
import Home from "./home.png";
import downloadIcon from "./DownloadIcon.png";
import Navbar from "../Header/Navbar/Navbar";
import CustomLink from "../UI/CustomLink";

import MainEditor from "./Components/MainEditor";

function Editor() {
  return (
    <>
      <MainEditor style={{ overflow: "hidden" }} />
    </>
  );
}

export default Editor;
