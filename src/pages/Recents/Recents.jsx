import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import "./recents.scss";

export default function Recents() {
  const navigate = useNavigate();
  return (
    <div className="recents-view">
      <Folder />
      <File fileName={"olumide.jpg"} fileUrl={"images/project-1-3.jpg"} />
      <Folder />
      <File fileName={"olumide.jpg"} fileUrl={"images/project-1-3.jpg"} />
      <File fileName={"olumide.jpg"} fileUrl={"images/project-1-3.jpg"} />
    </div>
  );
}

// <div>
// Recents
// <Button onClick={() => navigate(-1)}>Go back</Button>
// </div>
