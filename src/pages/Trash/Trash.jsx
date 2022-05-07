import React from "react";
import "./trash.scss";
import File from "../../components/File/File";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

export default function Trash() {
  const [empty, setEmpty] = React.useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <div className="recent-header">
        <p>Recycle bin</p>
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
        <div className="trash">
          <img src="/images/trash.png" alt="" />
          <h3>Trash is Empty</h3>
          <p>there is no file or folder in your trash currently</p>
        </div>
      ) : (
        <File fileUrl={"images/zip.png"} fileName={"movie.zip"} />
      )}
    </div>
  );
}
