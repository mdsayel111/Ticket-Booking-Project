import React, { useState } from "react";
import SignUp from "./SuignUp.tsx/SignUp";
import SignIn from "./SignIn/SignIn";

const SignUpOrSignIn = () => {
  const [signUpOrSignIn, setSignUpOrSignIn] = useState("signUp");
  return <div>{signUpOrSignIn === "signUp" ? <SignUp /> : <SignIn />}</div>;
};

export default SignUpOrSignIn;
