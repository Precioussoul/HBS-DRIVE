import { CloudUploadOutlined } from "@mui/icons-material";
import React from "react";
import "./upload.scss";

export default function UploadFiles({ handleMultipleFileUpload }) {
  return (
    <div className="upload-center">
      <label htmlFor="upload">
        <CloudUploadOutlined className="upload-icon" />
        Upload Files
      </label>
      <input
        type="file"
        id="upload"
        multiple
        className="upload-input"
        onChange={handleMultipleFileUpload}
      />
    </div>
  );
}
