import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./Summary.scss";
export default function Summary({ image, type, length, totalSize }) {
  const { mode } = useContext(ThemeContext);
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
      <span className={`summary-size ${mode}`}>
        {Math.round(totalSize * 100) / 100} MB
      </span>
    </div>
  );
}
