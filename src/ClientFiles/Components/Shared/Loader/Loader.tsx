"use client";
import React from "react";
import Lottie from "lottie-react";
import loader from "@/assets/loader/loader.json";

const Loader = () => {
  return (
    <div className="w-[30%] mx-auto">
      <Lottie animationData={loader} loop={true} />
    </div>
  );
};

export default Loader;
