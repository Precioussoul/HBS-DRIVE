import React, { useState } from "react";
import File from "../../components/File/File";
import "./search.scss";

export default function Search() {
  const [empty, setEmpty] = useState(true);
  return (
    <div>
      {empty ? (
        <div className="search">
          <img src="/images/search.png" alt="" />
          <h3>Begin typing or select a filter</h3>
          <p>Search for files, folders and Other Contents</p>
        </div>
      ) : (
        <File fileUrl={"images/txt.png"} fileName={"github.txt"} />
      )}
    </div>
  );
}
