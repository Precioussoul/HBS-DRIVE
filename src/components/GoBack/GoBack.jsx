import { ChevronLeft } from "@mui/icons-material";
import { Button, Card, CssBaseline, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { color } from "../../theme";
import "./GoBack.scss";

export default function GoBack({ currentFolder }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="goback-header">
        <CssBaseline />
        <Typography
          variant="p"
          color={color.textColor}
          sx={{
            alignSelf: "flex-start",
            fontSize: 20,
          }}
        >
          <p className="goback-name">{currentFolder && currentFolder.name}</p>
          <br />
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
    </>
  );
}
