import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

// create a useContext api for data carriage without passing props down manually
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
// useContext api creation ends here

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //signing up users
  async function signup(email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  //logging in users
  async function login(email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  //logging out users
  function logout() {
    return auth.signOut();
  }
  // reset password
  async function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  // update Email
  async function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  // update Password
  async function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // using UseEffect to run function when application load
  useEffect(() => {
    // firebase auto detect current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
