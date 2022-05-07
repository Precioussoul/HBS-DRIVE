import { ChevronLeft } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import File from "../../components/File/File";
import "./favorites.scss";

export default function Favorites() {
  const [empty, setEmpty] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <div className="recent-header">
        <p>Favorite files</p>
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
      {empty ? (
        <div className="favorite">
          <img src="/images/starred.png" alt="" className="fav-img" />
          <h3>Nothing is starred or favoured 💕</h3>
          <p>Add a star to a file and folder</p>
        </div>
      ) : (
        <File fileUrl={"images/txt.png"} fileName={"github.txt"} />
      )}
    </div>
  );
}
