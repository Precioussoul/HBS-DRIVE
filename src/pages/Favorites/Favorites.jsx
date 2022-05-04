import React, { useState } from "react";
import File from "../../components/File/File";
import "./favorites.scss";

export default function Favorites() {
  const [empty, setEmpty] = useState(true);
  return (
    <div>
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
