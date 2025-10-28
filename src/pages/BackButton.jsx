import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-32 left-6 sm:left-10 md:left-20 z-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-white bg-gray-200 hover:bg-green-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;