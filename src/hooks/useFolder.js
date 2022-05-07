import { doc, getDoc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useReducer } from "react";
import { colRef, database, databaseRef, singleRef } from "../firebase/firebase";
import rootReducer from "../reducers/rootReducer";
import ACTIONS from "../reducers/action";
import { AuthContext } from "../contexts/AuthContext";

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
  // when folderId and folder changes
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);
  // only changes when folderId changes
  const docSnap = getDoc(singleRef.folders(folderId));
  console.log(docSnap.data(), "doc snap");

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
        console.log(database.formatDoc(doc));
      })
      .catch((e) => {
        console.error(e);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currentUser]);

  useEffect(() => {
    return (
      database.files
        .where("folderId", "==", folderId)
        .where("userId", "==", currentUser.uid)
        // .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          dispatch({
            type: ACTIONS.SET_CHILD_FILES,
            payload: { childFiles: snapshot.docs.map(database.formatDoc) },
          });
        })
    );
  }, [folderId, currentUser]);
  console.log("this is state", state);

  return state;
}
