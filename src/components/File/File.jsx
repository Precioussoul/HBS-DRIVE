import { Image, MoreVert } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import "./File.scss";

export default function File({ fileUrl, fileName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="file">
      <Card
        sx={{ maxWidth: { xs: 150, sm: 180, xl: 350 } }}
        className="file-bg"
      >
        <CardMedia
          component="img"
          height="140"
          image={fileUrl}
          alt="green iguana"
        />
        <div className="file-detail">
          <p>{fileName}</p>
          <div className="file-menu">
            <MoreVert
              id="file-menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />{" "}
            <Menu
              id="file-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Preview</MenuItem>
              <MenuItem onClick={handleClose}>Get shareable link</MenuItem>
              <MenuItem onClick={handleClose}>Add a star</MenuItem>
              <MenuItem onClick={handleClose}>Download</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
      </Card>
    </div>
  );
}
