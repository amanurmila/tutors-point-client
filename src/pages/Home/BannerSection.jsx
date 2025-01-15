import React from "react";

const BannerSection = () => {
  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: `url("https://i.ibb.co.com/7bcSV7M/04-edu.jpg")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center text-center text-white px-4 md:px-8 h-full">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          Empower Your Learning Journey
        </h1>
        <p className="text-sm md:text-lg lg:text-xl font-medium">
          Discover endless possibilities with us today!
        </p>
      </div>
    </div>
  );
};

export default BannerSection;
