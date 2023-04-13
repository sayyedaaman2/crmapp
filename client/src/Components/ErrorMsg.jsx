import React from "react";

const ErrorMsg = ({ children }) => {
  return <div className="flex items-center justify-center text-xs bg-white text-red-500 px-3 border-2 border-gray-400 rounded-lg h-12 ">{children}</div>;
};

export default ErrorMsg;
