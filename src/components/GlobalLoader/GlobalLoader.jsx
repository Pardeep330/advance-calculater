import React from "react";
import "./GlobalLoader.css";

const GlobalLoader = ({ show }) => {
  if (!show) return null;

  return (
    <div className="global-loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default GlobalLoader;
