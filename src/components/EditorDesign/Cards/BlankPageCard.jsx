import React from "react";
import addIcon from "./addIcon.png";

function BlankPageCard() {
  return (
    <div className="blank-page-card">
      <div>
        <div align="center">
          <img alt="abc" src={addIcon} />
        </div>

        <div>Blank Page</div>
      </div>
    </div>
  );
}

export default BlankPageCard;
