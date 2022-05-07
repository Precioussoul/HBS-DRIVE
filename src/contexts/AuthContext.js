import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

// create a useContext api for data carriage without passing props down manually
export const AuthContext = React.createContext();

// useContext api creation ends here

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //signing up users
  function signupUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //logging in users
  function loginUser(email, password, setError, setLoading) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(true);
      })
      .catch(() => {
        setError("Failed to sign-in, check your credential or internet");
        setLoading(false);
        // setError("");
      });
  }

  //logging out users
  function logout() {
    return signOut(auth);
  }
  // delete user account
  function deleteUserAccount(currentUser) {
    return deleteUser(currentUser);
  }

  function updateUserProfile(name, photo, setError, navigate) {
    return updateProfile(currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      setError("");
      navigate("/");
    });
  }

  // reset password
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  // update Email
  function updateEmailAddress(email) {
    return updateEmail(currentUser, email);
  }
  // verify email address
  function verifyEmailAddress(User, message) {
    return sendEmailVerification(User).then(() => {
      message("please check your email address for further instruction");
    });
  }
  // update Password
  function updateCurrentPassword(password) {
    return updatePassword(currentUser, password);
  }

  // using UseEffect to run function when application load
  useEffect(() => {
    // firebase auto detect current user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signupUser,
    loginUser,
    logout,
    updateUserProfile,
    resetPassword,
    verifyEmailAddress,
    updateEmailAddress,
    updateCurrentPassword,
    deleteUserAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
