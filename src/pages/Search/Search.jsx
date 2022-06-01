import React, { useContext } from "react";
import File from "../../components/File/File";
import Folder from "../../components/Folders/Folder";
import { FileAndFolderContext } from "../../contexts/FileAndFolderContext";
import "./search.scss";

export default function Search() {
  const { searchFiles, searchFolders, searchQuery } =
    useContext(FileAndFolderContext);
  return (
    <div>
      {searchQuery === "" ? (
        <div className="search">
          <img src="/images/search.png" alt="" />
          <h3>Begin typing ⌨️</h3>
          <p>Search for files, folders and Other Contents</p>
        </div>
      ) : (
        <>
          {searchFolders.length > 0 && (
            <div className="folders-view">
              {searchFolders.map((childFolder) => (
                <Folder key={childFolder.id} folder={childFolder} />
              ))}
            </div>
          )}
          {searchFiles.length > 0 && (
            <div className="file-view">
              {searchFiles.map((childFile) => (
                <File key={childFile.id} file={childFile} />
              ))}
            </div>
          )}
          {searchFiles.length < 1 && searchFolders.length < 1 && (
            <div className="search-box">
              <div className="search">
                <img src="/images/research.png" alt="" />
                <h3>No match found 🔍</h3>
                <p>Try another search with different query</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
