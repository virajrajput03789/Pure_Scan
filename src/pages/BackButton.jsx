import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
  const blockedRoutes = ["/login", "/signin"];
  if (blockedRoutes.includes(location.pathname)) {
    navigate("/"); // fallback to home or dashboard
  } else {
    navigate(-1);
  }
};

  return (
    <div className="absolute top-16 sm:top-24 md:top-28 lg:top-32 left-4 sm:left-10 md:left-20 z-10">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-white bg-gray-200 hover:bg-green-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all duration-200"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>
    </div>
  );
};

export default BackButton;