"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const TextAnimation = ({
  value,
  className,
}: {
  value: {
    staticText?: string;
    sameText: string;
    dainamicText: string[];
    subTitle?: string;
  };
  className?: string;
}) => {
  const { staticText, dainamicText, sameText, subTitle } = value;
  return (
    <div
      className={`flex flex-col gap-4 text-center absolute z-10 ${className}`}
    >
      <span className="text-[32px] font-bold text-white">{staticText}</span>
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
        <span className="text-[32px] font-bold text-white">{sameText}</span>
        <TypeAnimation
          className="text-[var(--tertiary)] font-bold"
          sequence={[
            // Same substring at the start will only be typed out once, initially
            dainamicText[0],
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            dainamicText[1],
            1000,
            dainamicText[2],
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
      <p className="text-white">{subTitle}</p>
    </div>
  );
};

export default TextAnimation;
