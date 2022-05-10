import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import File from "../../components/File/File";
import Filter from "../../components/Filter/Filter";
import Folder from "../../components/Folders/Folder";
import "./Dashboard.scss";
import useFolder from "../../hooks/useFolder";

export default function Dashboard() {
  const { folder_Id } = useParams();
  const { childFolders, folder, childFiles } = useFolder(folder_Id);

  console.log("childFolder", childFolders);
  console.log("params", folder_Id);
  console.log("main folder", folder);
  console.log("CHILD FILES", childFiles);

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
        {childFolders.length > 0 && (
          <div className="folders-view">
            {childFolders.map((childFolder) => (
              <Folder key={childFolder.id} folder={childFolder} />
            ))}
          </div>
        )}
      </div>
      <div className="file-info">
        <h4>Files</h4>
      </div>
      {childFiles.length > 0 && (
        <div className="file-view">
          {childFiles.map((childFile) => (
            <File key={childFile.id} file={childFile} />
          ))}
        </div>
      )}
    </div>
  );
}
