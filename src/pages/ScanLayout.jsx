import React from "react";

export const GlowingCards = ({ children, gap = "2.5rem", maxWidth = "75rem", padding = "3rem 1.5rem", backgroundColor = "#f9fafb" }) => {
  return (
    <div
      className="relative flex flex-wrap justify-center items-center"
      style={{
        gap,
        maxWidth,
        padding,
        backgroundColor,
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};

export const GlowingCard = ({ children, glowColor = "#10b981", className = "" }) => {
  return (
    <div
      className={`relative p-6 m-4 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-300 group ${className}`}
    >
      <div
        className="absolute inset-0 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const ScanLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans py-12 px-6">
      <GlowingCards>
        {children}
      </GlowingCards>
    </div>
  );
};

export default ScanLayout;