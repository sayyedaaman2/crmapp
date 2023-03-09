import React from "react";

const ErrorMsg = ({ children }) => {
  return <div className="border-2  px-2 text-xs sm:text-sm font-semibold rounded-lg relative  text-red-500 text-center bg-slate-100 flex items-center justify-center ml-2">{children}</div>;
};

export default ErrorMsg;
