import React from "react";
import "./text.css";

export const CustomText = ({ type, fade, children, style, size }) => {
  return (
    <span
      className={!fade ? `text  ${type} ${size}` : `text ${type} fade`}
      style={style}
    >
      {children}
    </span>
  );
};
