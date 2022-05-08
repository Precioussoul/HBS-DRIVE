import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

console.log(firebaseConfig);

// init services
export const database = getFirestore(app);
export const auth = getAuth(app);

export const storage = getStorage(app);

export const databaseRef = {
  foldersRef: collection(database, "folders"),
  filesRef: collection(database, "files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  timestamp: serverTimestamp(),
};

export const colRef = {
  folders: "folders",
  files: "files",
};

export const singleRef = {
  folders: (id) => {
    doc(database, colRef.folders, id);
  },
  files: (id) => {
    doc(database, colRef.files, id);
  },
};

const storageRef = ref(storage);
const filesRef = ref(storage, "files/");
export let result;

export function avatarURL(
  file,
  currentUser,
  setError,
  setMessage,
  setLoading,
  setFile
) {
  const fileRef = ref(storage, `avatar/${currentUser.uid}/${file.name}`);
  getDownloadURL(fileRef)
    .then((url) => {
      result = url;
      setMessage("your changes has been saved");
      setLoading(true);
      setMessage("");
      setFile("");

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })
    .catch(() => {
      setError("please resave changes");
      setTimeout(() => {
        setLoading(false);
        setMessage("");
      }, 2000);
    });

  // return result;
}

export function uploadAvatar(file, currentUser) {
  const avatarRef = ref(storage, `avatar/${currentUser.uid}/${file.name}`);

  uploadBytes(avatarRef, file);
}

export const deleteFolder = (currentUser) => {
  const deleteFolderRef = ref(storage, `avatar/${currentUser.uid}`);
  deleteFolderRef
    .listAll()
    .then((dir) => {
      dir.items.forEach((fileRef) =>
        deleteFile(fileRef.fullPath, fileRef.name)
      );
      dir.prefixes.forEach((folderRef) => deleteFolder(folderRef.fullPath));
    })
    .catch((error) => console.log(error));
};

const deleteFile = (pathToFile, fileName) => {
  const ref = ref(storage, pathToFile);
  const childRef = ref(storage, fileName);
  childRef.delete();
};
