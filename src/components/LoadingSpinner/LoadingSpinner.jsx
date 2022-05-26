import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./LoadingSpinner.scss";

export default function LoadingSpinner() {
  const { mode } = useContext(ThemeContext);
  return (
    <div className="spinner-container">
      <div className={`loading-spinner ${mode}`}></div>
    </div>
  );
}
