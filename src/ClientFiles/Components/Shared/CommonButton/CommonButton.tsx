"use client";
import React, { MouseEventHandler } from "react";
import "./CommonButton.css";
import { motion } from "framer-motion";

const CommonButton = ({
  value,
}: {
  value: {
    text: String;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };
}) => {
  const { text, className, onClick } = value;

  const blankFun = () => {};
  return (
    <motion.button
      onClick={onClick || blankFun}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`common-btn ${className}`}
      style={{
        backgroundImage:
          "-webkit-linear-gradient(169deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%)",
        padding: "4px 10px",
        borderRadius: "8px",
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "white",
      }}
    >
      {text}
    </motion.button>
  );
};

export default CommonButton;
