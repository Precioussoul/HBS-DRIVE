import React, { useContext, useEffect, useState } from "react";
import { KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import "./Storage.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Summary from "../StorageSummary/Summary";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";

export let totalSize = 0;
export let availableSpace = 200;

export let docTotal = 0;
export let imageTotal = 0;
export let audioTotal = 0;
export let vidTotal = 0;
export let otherFileTotal = 0;
export let totalStorageProgress;

export default function Storage() {
  const { documents, audios, videos, images, otherFiles } =
    useContext(FileAndFolderContext);

  if (documents.length > 0)
    documents.forEach((file) => {
      docTotal = 0;
      return (docTotal += parseFloat(file.size));
    });
  if (audios.length > 0) {
    audios.forEach((file) => {
      audioTotal = 0;
      return (audioTotal += parseFloat(file.size));
    });
  }
  if (images.length > 0)
    images.forEach((file) => {
      imageTotal = 0;
      return (imageTotal += parseFloat(file.size));
    });
  if (videos.length > 0)
    videos.forEach((file) => {
      vidTotal = 0;
      return (vidTotal += parseFloat(file.size));
    });
  if (otherFiles.length > 0)
    otherFiles.forEach((file) => {
      otherFileTotal = 0;
      return (otherFileTotal += parseFloat(file.size));
    });

  const totally =
    docTotal + vidTotal + audioTotal + imageTotal + otherFileTotal;

  totalSize = `${Math.round(totally * 100) / 100}`;

  const totalP = (totalSize / availableSpace) * 100;
  totalStorageProgress = `${Math.round(totalP * 100) / 100}`;

  const dark = true;
  return (
    <div className="Storage">
      <div className="top">
        <h1 className="title">Storage</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={totalStorageProgress}
            text={`${totalSize}MB of ${availableSpace}MB `}
            styles={buildStyles({
              textColor: dark ? "#ccc" : "#333",
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
