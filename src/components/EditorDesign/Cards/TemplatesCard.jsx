import React from "react";

function TemplatesCard(props) {
  return (
    <div>
      <div className="recently-used-templates">
        <div align="center">
          <img alt={props.image} src={props.image} />
        </div>

        <div>{props.text}</div>
      </div>
    </div>
  );
}

export default TemplatesCard;
