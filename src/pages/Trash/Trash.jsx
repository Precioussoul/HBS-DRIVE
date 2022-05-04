import React from "react";
import "./trash.scss";
import File from "../../components/File/File";

export default function Trash() {
  const [empty, setEmpty] = React.useState(true);
  return (
    <div>
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
