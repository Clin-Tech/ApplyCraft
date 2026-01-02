import React from "react";

const CustomLoader = ({ text }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-slate-400">{text}</p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
    </div>
  );
};

export default CustomLoader;
