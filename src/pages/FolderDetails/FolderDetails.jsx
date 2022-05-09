import { Button, Divider } from "@mui/material";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import GoBack from "../../components/GoBack/GoBack";
import useFolder from "../../hooks/useFolder";

export default function FolderDetails() {
  const { folder_Id } = useParams();
  const { childFolders, folder } = useFolder(folder_Id);
  return (
    <div className="folderDetails">
      <GoBack currentFolder={folder} />
      <div className="folders">
        {childFolders.length > 0 && (
          <div className="folders-view folderDetails">
            {childFolders.map((childFolder) => (
              <Folder key={childFolder.id} folder={childFolder} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
