import { getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useContext, useEffect, useReducer } from "react";
import { databaseRef, singleRef } from "../firebase/firebase";
import rootReducer from "../reducers/rootReducer";
import ACTIONS from "../reducers/action";
import { AuthContext } from "../contexts/AuthContext";
import { FileAndFolderContext } from "../contexts/FileAndFolderContext";

export const ROOT_FOLDER = { name: "Drive", id: null, path: [] };

export default function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(rootReducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
    // initial value in a state
  });

  const { currentUser } = useContext(AuthContext);
  const { setLoading } = useContext(FileAndFolderContext);
  // when folderId and folder changes
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);
  // only changes when folderId changes

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    // get single doc
    // single doc reference

    getDoc(singleRef.folders(folderId))
      .then((doc) => {
        const folderData = databaseRef.formatDoc(doc);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: folderData },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const q = query(
      databaseRef.foldersRef,
      where("parentId", "==", folderId),
      where("isTrashed", "==", false),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );
    // setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => databaseRef.formatDoc(doc));

      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: data },
      });
      setLoading(true);
    });
  }, [folderId, currentUser]);

  useEffect(() => {
    const q = query(
      databaseRef.filesRef,
      where("folderId", "==", folderId),
      where("isTrashed", "==", false),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const filedata = querySnapshot.docs.map((doc) =>
        databaseRef.formatDoc(doc)
      );
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: filedata },
      });

      setLoading(true);
    });
  }, [folderId, currentUser]);

  return state;
}
