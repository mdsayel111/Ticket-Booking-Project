"use client";
import React, { useState } from "react";
import SignUp from "./SuignUp.tsx/SignUp";
import SignIn from "./SignIn/SignIn";
import "./SignUpOrSignIn.css";
import BackgroundImage from "../Shared/BackgroundImage/BackgroundImage";

const SignUpOrSignIn = () => {
  const [signUpOrSignIn, setSignUpOrSignIn] = useState("signUp");
  return (
    <div className="w-full h-[100vh]">
      <BackgroundImage
        values={{
          background: `url("/images/account-bg.jpg")`,
          height: "100vh",
        }}
      >
        <div className="absolute z-20">
          {signUpOrSignIn === "signUp" ? (
            <SignUp values={{ setSignUpOrSignIn: setSignUpOrSignIn }} />
          ) : (
            <SignIn values={{ setSignUpOrSignIn: setSignUpOrSignIn }} />
          )}
        </div>
      </BackgroundImage>
    </div>
  );
};

export default SignUpOrSignIn;
