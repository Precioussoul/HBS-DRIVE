import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { databaseRef } from "../firebase/firebase";
import { AuthContext } from "./AuthContext";

export const FileAndFolderContext = React.createContext();

function FileAndFolderProvider({ children }) {
  const [folderName, setFolderName] = useState("");
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [upfile, setUpFile] = useState("");
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [mode, setMode] = useState("dark");

  const documents = allFiles.filter((file) =>
    file.type.toLowerCase().includes("application/")
  );
  const audios = allFiles.filter((file) =>
    file.type.toLowerCase().includes("audio/")
  );
  const images = allFiles.filter((file) =>
    file.type.toLowerCase().includes("image/")
  );
  const videos = allFiles.filter((file) =>
    file.type.toLowerCase().includes("video/")
  );

  useEffect(() => {
    if (currentUser) {
      const q = query(
        databaseRef.filesRef,
        where("userId", "==", currentUser.uid),
        orderBy("createdAt")
      );

      const q2 = query(
        databaseRef.foldersRef,
        where("userId", "==", currentUser.uid),
        orderBy("createdAt")
      );
      const unsubs = onSnapshot(q2, (querySnapshot) => {
        const folderdata = querySnapshot.docs.map((doc) =>
          databaseRef.formatDoc(doc)
        );
        setAllFolders(folderdata);
      });

      const unsub = onSnapshot(q, (querySnapshot) => {
        const filedata = querySnapshot.docs.map((doc) =>
          databaseRef.formatDoc(doc)
        );
        setAllFiles(filedata);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.removeItem("favorites");
  }, []);

  const otherFiles = allFiles.filter(
    (file) =>
      !file.type.toLowerCase().includes("image") &&
      !file.type.toLowerCase().includes("audio") &&
      !file.type.toLowerCase().includes("video") &&
      !file.type.toLowerCase().includes("application/")
  );
  const searchFiles = allFiles.filter(
    (file) =>
      file.type.toLowerCase().includes(searchQuery) ||
      file.name.toLowerCase().includes(searchQuery)
  );
  const searchFolders = allFolders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery)
  );

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
    documents,
    images,
    audios,
    videos,
    otherFiles,
    searchQuery,
    setSearchQuery,
    searchFiles,
    searchFolders,
    allFiles,
    allFolders,
  };

  return (
    <FileAndFolderContext.Provider value={values}>
      {children}
    </FileAndFolderContext.Provider>
  );
}

export default FileAndFolderProvider;
