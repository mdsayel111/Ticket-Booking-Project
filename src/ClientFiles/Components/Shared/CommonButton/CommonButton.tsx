"use client";
import { commonBtnProps } from "@/ClientFiles/Types/CommonTypes";
import { handlePayment } from "@/service/payment";
import { motion } from "framer-motion";
import { FC } from "react";
import "./CommonButton.css";

const CommonButton: FC<commonBtnProps> = ({ value }) => {
  const { text, className, onClick } = value;

  const blankFun = () => { };
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
