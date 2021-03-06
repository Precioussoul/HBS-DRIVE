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
    return doc(database, colRef.folders, id);
  },
  files: (id) => {
    return doc(database, colRef.files, id);
  },
};

const storageRef = ref(storage);
const filesRef = ref(storage, "files/");

// export const deleteAccountFolder = (currentUser) => {
//   const listRef = ref(storage, `files/${currentUser.uid}`);

//   // Find all the prefixes and items.
//   listAll(listRef)
//     .then((res) => {
//       res.prefixes.forEach((folderRef) => {
//         // All the prefixes under listRef.
//         console.log("listRef", folderRef);
//         // You may call listAll() recursively on them.
//         listAll(folderRef).then((resp) => {
//           resp.prefixes.forEach((file) => {
//             console.log("file", file);
//           });
//         });
//       });
//       res.items.forEach((itemRef) => {
//         // All the items under listRef.'
//         console.log("itemRef", itemRef);
//         const newRef = ref(storage, itemRef);
//         console.log("newRef", newRef);
//       });
//     })
//     .catch((error) => {
//       // Uh-oh, an error occurred!
//     });
// };

// const deleteFile = (pathToFile, fileName) => {
//   const ref = ref(storage, pathToFile);
//   const childRef = ref(storage, fileName);
//   childRef.delete();
// };

// files upload
