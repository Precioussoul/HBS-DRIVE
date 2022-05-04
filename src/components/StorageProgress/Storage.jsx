import React from "react";
import { KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import "./Storage.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Summary from "../StorageSummary/Summary";

export default function Storage() {
  return (
    <div className="Storage">
      <div className="top">
        <h1 className="title">Storage</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={70}
            text={`${70}GB used `}
            styles={buildStyles({
              textColor: "#333",
              pathColor: "#1a22fc",
              trailColor: "#a3a9df",
              textSize: "10px",
            })}
            className="circ"
            strokeWidth={12}
          />
        </div>
        <Summary
          image={"/images/google-docs.png"}
          type={"Documents"}
          length={2345}
          totalSize={2.2}
        />
        <Summary
          image={"/images/image.png"}
          type={"images"}
          length={5225}
          totalSize={6.2}
        />
        <Summary
          image={"/images/video-folder.png"}
          type={"videos"}
          length={234}
          totalSize={4.2}
        />
        <Summary
          image={"/images/mp3-file.png"}
          type={"Music"}
          length={1234}
          totalSize={0.98}
        />
        <Summary
          image={"/images/rar-file-format.png"}
          type={"Other files"}
          length={234}
          totalSize={4.2}
        />
      </div>
    </div>
  );
}
