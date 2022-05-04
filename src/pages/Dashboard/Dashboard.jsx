import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import File from "../../components/File/File";
import Filter from "../../components/Filter/Filter";
import Folder from "../../components/Folders/Folder";
import "./Dashboard.scss";
import useFolder from "../../hooks/useFolder";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="filter-view">
        <Filter
          imgUrl={"/images/google-docs.png"}
          count={2344}
          type={"documents"}
        />
        <Filter imgUrl={"/images/image.png"} count={983} type={"images"} />
        <Filter
          imgUrl={"/images/video-folder.png"}
          count={230}
          type={"videos"}
        />
        <Filter imgUrl={"/images/mp3-file.png"} count={430} type="Musics" />
        <Filter
          imgUrl={"/images/rar-file-format.png"}
          count={1230}
          type={"Other files"}
        />
      </div>
      <div className="folders">
        <div className="folders-info">
          <h4>Folders</h4>
        </div>
        <div className="folders-view">
          <Folder />
          <Folder />
          <Folder />
          <Folder />
          {/* <Folder /> */}
        </div>
      </div>
      <div className="file-info">
        <h4>Files</h4>
      </div>
      <div className="file-view">
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/google-docs.png"} fileName={"rent.docx"} />
        <File fileUrl={"/images/project-1-2.jpg"} fileName={"fairy lady"} />
        <File fileUrl={"/images/project-1-3.jpg"} fileName={"fairy lady 2"} />
        <File fileUrl={"/images/pdf.png"} fileName={"ALX guide"} />
      </div>
    </div>
  );
}
