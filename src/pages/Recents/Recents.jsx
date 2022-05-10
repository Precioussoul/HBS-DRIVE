import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import "./recents.scss";

export default function Recents() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="recent-header">
        <p>Recent files</p>
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
      <Divider sx={{ display: { sm: "none" }, visibility: { sm: "hidden" } }} />
      <div className="recents-view">
        <p>recents files</p>
      </div>
    </div>
  );
}

// <div>
// Recents
// <Button onClick={() => navigate(-1)}>Go back</Button>
// </div>
