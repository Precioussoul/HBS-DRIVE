import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Filter.scss";

export default function Filter({ imgUrl, count, link, type }) {
  return (
    <Link to={link} className="filter">
      <div className="filter-img">
        <img src={imgUrl} alt="" className="image" />
      </div>
      <Typography noWrap className="filter-type">
        {type}
      </Typography>
      <p className="filter-count">
        {count} <span>files</span>{" "}
      </p>
    </Link>
  );
}
