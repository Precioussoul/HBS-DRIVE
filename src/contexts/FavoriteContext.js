import React, { createContext, useEffect, useReducer } from "react";
import { favoritesReducer } from "../reducers/favoritesReducer";

export const FavoritesContext = createContext();

export default function FavoriteContextProvider({ children }) {
  const [favoredFiles, dispatch] = useReducer(favoritesReducer, [], () => {
    const localdata = localStorage.getItem("favorites");

    return localdata ? JSON.parse(localdata) : [];
  });

  return (
    <FavoritesContext.Provider value={{ favoredFiles, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}
