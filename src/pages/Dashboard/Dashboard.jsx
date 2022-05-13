import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import File from "../../components/File/File";
import Filter from "../../components/Filter/Filter";
import Folder from "../../components/Folders/Folder";
import "./Dashboard.scss";
import useFolder from "../../hooks/useFolder";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import FilterMobile from "../../components/FilterMobile/FilterMobile";
import {
  audioTotal,
  availableSpace,
  docTotal,
  imageTotal,
  otherFileTotal,
  totalSize,
  totalStorageProgress,
  vidTotal,
} from "../../components/StorageProgress/Storage";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { folder_Id } = useParams();
  const { childFolders, childFiles } = useFolder(folder_Id);
  const { documents, audios, videos, images, otherFiles, allFiles } =
    useContext(FileAndFolderContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Dashboard">
      <div className="filter-view">
        <Filter
          imgUrl={"/images/documents.png"}
          count={documents.length}
          type={"Documents"}
          link={"/documents"}
        />
        <Filter
          imgUrl={"/images/image.png"}
          count={images.length}
          type={"Images"}
          link={"images"}
        />
        <Filter
          imgUrl={"/images/video-folder.png"}
          count={videos.length}
          type={"videos"}
          link={"videos"}
        />
        <Filter
          imgUrl={"/images/mp3.png"}
          count={audios.length}
          type="audio"
          link={"audios"}
        />
        <Filter
          imgUrl={"/images/otherFile.png"}
          count={otherFiles.length}
          type={"others"}
          link={"others"}
        />
      </div>
      <div className="filterMobile">
        <div className="m-greeting">
          <span className="m-greeting-time">Welcome Back</span>
          <p className="m-greeting-name">
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
          </p>
        </div>
        <div className="m-storage-dashboard">
          <div className="m-storage-icon">
            <img src="images/server.png" alt="storage" />
          </div>
          <div className="m-storage-details">
            <div className="m-storage-space">
              <p className="space-name">Available Space</p>
              <span className="space-count">{allFiles.length} files</span>
            </div>
            <p className="space-metric">{`${totalSize}MB of ${availableSpace}MB used`}</p>
            <div className="space-progress">
              <div
                style={{
                  width: `${
                    totalStorageProgress > 0 ? totalStorageProgress : 0
                  }%`,
                }}
                className="space-progress-bar"
              ></div>
            </div>
          </div>
        </div>
        <div className="categories">
          <FilterMobile
            count={documents.length}
            type={"Documents"}
            imgUrl={"images/documents.png"}
            totalSize={docTotal}
            link={"documents"}
          />
          <FilterMobile
            count={images.length}
            type={"images"}
            imgUrl={"images/image.png"}
            totalSize={imageTotal}
            link={"images"}
          />
          <FilterMobile
            count={videos.length}
            type={"videos"}
            imgUrl={"images/video-folder.png"}
            totalSize={vidTotal}
            link={"videos"}
          />
          <FilterMobile
            count={audios.length}
            type={"audio"}
            imgUrl={"images/mp3.png"}
            totalSize={audioTotal}
            link={"audios"}
          />
          <FilterMobile
            count={otherFiles.length}
            type={"others"}
            imgUrl={"images/otherFile.png"}
            totalSize={otherFileTotal}
            link={"others"}
          />
        </div>
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
          {childFiles.map((childFile, index) => (
            <File key={childFile.id} file={childFile} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
