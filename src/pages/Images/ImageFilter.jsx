import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import File from "../../components/File/File";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import { color } from "../../theme";

export default function ImageFilter() {
  const navigate = useNavigate();
  const { images } = useContext(FileAndFolderContext);
  return (
    <div>
      <div className="acc-header">
        <Typography
          variant="p"
          color={color.textColor}
          sx={{
            alignSelf: "flex-start",
            marginBottom: "20px",
            fontSize: 20,
          }}
        >
          <p>Images -</p>
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            // bgcolor:
            padding: "5px",
            borderRadius: 5,
            fontSize: 12,
            alignSelf: "flex-start",
          }}
        >
          <ChevronLeft />
        </Button>{" "}
      </div>
      <Divider />
      <div className="recents-view">
        {images.map((file, index) => (
          <File key={file.id} file={file} index={index} />
        ))}
      </div>
    </div>
  );
}
