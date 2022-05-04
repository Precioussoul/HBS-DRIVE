import React from "react";
import "./Filter.scss";

export default function Filter({ imgUrl, count }) {
  return (
    <div className="filter">
      <div className="filter-img">
        <img src={imgUrl} alt="" className="image" />
      </div>
      <p className="filter-count">
        {count} <span>files</span>{" "}
      </p>
    </div>
  );
}
