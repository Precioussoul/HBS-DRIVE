import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAr_ZF1qt2fSS_fB49SYQX9PyPfYz901LE",
  authDomain: "auth-development-4d690.firebaseapp.com",
  projectId: "auth-development-4d690",
  storageBucket: "auth-development-4d690.appspot.com",
  messagingSenderId: "874278286540",
  appId: "1:874278286540:web:82e247be0c23e949e73e69",
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
    doc(database, colRef.folders, id);
  },
  files: (id) => {
    doc(database, colRef.files, id);
  },
};

export default app;
