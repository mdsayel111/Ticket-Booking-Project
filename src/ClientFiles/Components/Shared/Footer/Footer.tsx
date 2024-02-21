import React from "react";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import Logo from "../Logo/Logo";
import "./Footer.css";
import LogoGroup from "../LogoGroup/LogoGroup";

const Footer = () => {
  return (
    <BackgroundImage
      values={{
        background: `url("/images/footer-shape.png")`,
        marginTop: "40px",
      }}
    >
      <div className="absolute z-20 w-[90%]">
        <div className="flex lg:justify-between items-center w-[90%] justify-center flex-col lg:flex-row gap-4">
          <Logo />
          <LogoGroup />
        </div>
        <hr className="border-gray-400 w-[90%] mt-8" />
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center lg:justify-between w-[90%] mt-8 text-white">
          <p>
            Copyright © 2020.All Rights Reserved By{" "}
            <span className="text-[var(--tertiary)]">TicketBD</span>
          </p>
          <ul className="flex footer-menu flex-wrap">
            <li>About</li>
            <li>Terms Of Use</li>
            <li>Privacy Policy</li>
            <li>FAQ</li>
            <li>Feedback</li>
          </ul>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Footer;
