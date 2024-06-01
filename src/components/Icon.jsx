import React from "react";

const Icon = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`text-4xl bg-white rounded-md !text-secondary p-2 ${className}`}
    >
      {children}
    </div>
  );
};

export default Icon;
