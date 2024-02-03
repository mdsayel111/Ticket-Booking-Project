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
      <div className="flex justify-between w-[90%]">
        <Logo />
        <LogoGroup />
      </div>
      <hr className="border-gray-400 w-[90%] mt-8" />
      <div className="flex justify-between w-[90%] mt-8 text-white">
        <p>
          Copyright © 2020.All Rights Reserved By{" "}
          <span className="text-[var(--tertiary)]">TicketBD</span>
        </p>
        <ul className="flex footer-menu">
          <li>About</li>
          <li>Terms Of Use</li>
          <li>Privacy Policy</li>
          <li>FAQ</li>
          <li>Feedback</li>
        </ul>
      </div>
    </BackgroundImage>
  );
};

export default Footer;
