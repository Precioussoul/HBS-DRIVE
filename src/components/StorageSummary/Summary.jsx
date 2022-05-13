import React from "react";
import "./Summary.scss";
export default function Summary({ image, type, length, totalSize }) {
  return (
    <div className="summary">
      <div className="summary-info">
        <div className="summary-img">
          <img src={image} alt="" />
        </div>
        <div className="summary-type">
          <h4>{type}</h4>
          <small>{length} files</small>
        </div>
      </div>
      <span className="summary-size">{totalSize} MB</span>
    </div>
  );
}
