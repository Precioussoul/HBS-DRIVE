import React, { useContext, useEffect, useState } from "react";
import { KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import "./Storage.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Summary from "../StorageSummary/Summary";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import { ThemeContext } from "../../App";
import { AuthContext } from "../../contexts/AuthContext";

export let availableSpace = 200;

export let docTotal = 0;
export let imageTotal = 0;
export let audioTotal = 0;
export let vidTotal = 0;
export let otherFileTotal = 0;
// export let totalStorageProgress;

export default function Storage() {
  const {
    documents,
    audios,
    videos,
    images,
    otherFiles,
    setTotalProgress,
    totalProgress,
    totalSize,
    setTotalSize,
  } = useContext(FileAndFolderContext);

  if (documents.length > 0) {
    docTotal = 0;
    documents.forEach((file) => {
      return (docTotal += parseFloat(file.size));
    });
  }
  if (audios.length > 0) {
    audioTotal = 0;
    audios.forEach((file) => {
      return (audioTotal += parseFloat(file.size));
    });
  }
  if (images.length > 0) {
    imageTotal = 0;
    images.forEach((file) => {
      return (imageTotal += parseFloat(file.size));
    });
  }

  if (videos.length > 0) {
    vidTotal = 0;
    videos.forEach((file) => {
      return (vidTotal += parseFloat(file.size));
    });
  }

  if (otherFiles.length > 0) {
    otherFileTotal = 0;
    otherFiles.forEach((file) => {
      return (otherFileTotal += parseFloat(file.size));
    });
  }

  const totally =
    docTotal + vidTotal + audioTotal + imageTotal + otherFileTotal;

  const totalSz = Math.round(totally * 100) / 100;

  const totalP = (totalSz / availableSpace) * 100;

  useEffect(() => {
    setTotalProgress(Math.round(totalP * 100) / 100);
    setTotalSize(totalSz);
  }, [totalProgress, totalSz]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    docTotal = 0;
    imageTotal = 0;
    audioTotal = 0;
    vidTotal = 0;
    otherFileTotal = 0;
  }, [currentUser]);

  const { mode } = useContext(ThemeContext);
  return (
    <div className="Storage">
      <div className="top">
        <h1 className="title">Storage</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={totalProgress}
            text={`${totalSz}MB of ${availableSpace}MB `}
            styles={buildStyles({
              textColor: mode === "dark" ? "#ccc" : "#333",
              pathColor: "#1a22fc",
              trailColor: "#a3a9df",
              textSize: "8.5px",
            })}
            className="circ"
            strokeWidth={12}
          />
        </div>
        <Summary
          image={"/images/documents.png"}
          type={"Documents"}
          length={documents.length}
          totalSize={docTotal}
        />
        <Summary
          image={"/images/image.png"}
          type={"Images"}
          length={images.length}
          totalSize={imageTotal}
        />
        <Summary
          image={"/images/video-folder.png"}
          type={"Videos"}
          length={videos.length}
          totalSize={vidTotal}
        />
        <Summary
          image={"/images/mp3.png"}
          type={"Audio"}
          length={audios.length}
          totalSize={audioTotal}
        />
        <Summary
          image={"/images/otherFile.png"}
          type={"Other files"}
          length={otherFiles.length}
          totalSize={otherFileTotal}
        />
      </div>
    </div>
  );
}
