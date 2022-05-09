import React, { useState } from "react";
export const FolderContext = React.createContext();

function FolderProvider({ children }) {
  const [folderName, setFolderName] = useState("");

  const values = {
    folderName,
    setFolderName,
  };

  return (
    <FolderContext.Provider value={values}>{children}</FolderContext.Provider>
  );
}

export default FolderProvider;
