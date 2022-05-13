import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./FilterMobile.scss";

export default function FilterMobile({ count, type, imgUrl, totalSize, link }) {
  return (
    <Link to={link}>
      <div className="f-Mobile">
        <div className="f-Mobile-img">
          <img src={imgUrl} alt={type} className="image" />
        </div>
        <p className="f-Mobile-name">{type}</p>
        <p className="f-Mobile-count-mb"> {`${totalSize} MB (${count})`} </p>
      </div>
    </Link>
  );
}
