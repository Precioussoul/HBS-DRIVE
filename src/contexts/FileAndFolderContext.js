import React, { useState } from "react";
export const FileAndFolderContext = React.createContext();

function FileAndFolderProvider({ children }) {
  const [folderName, setFolderName] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [upfile, setUpFile] = useState("");
  const [error, setError] = useState(false);

  const handleCloseShow = () => {
    setShow(true);
  };

  const values = {
    folderName,
    setFolderName,
    uploadingFiles,
    setUploadingFiles,
    setUpFile,
    upfile,
    show,
    setShow,
    handleCloseShow,
    error,
    setError,
  };

  return (
    <FileAndFolderContext.Provider value={values}>
      {children}
    </FileAndFolderContext.Provider>
  );
}

export default FileAndFolderProvider;
