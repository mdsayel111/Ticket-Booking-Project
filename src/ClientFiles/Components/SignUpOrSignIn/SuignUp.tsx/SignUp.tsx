"use client";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Form from "../../Shared/Form/Form";
import Input from "../../Shared/Input/Input";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp({
  values,
}: {
  values: { setSignUpOrSignIn: Function };
}) {
  const { setSignUpOrSignIn } = values;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      name: data.get("userName"),
      password: data.get("password"),
    };
    try {
      const res = await axios.post("/api/v1/public_apis/user", userData);
      if (res.status == 200) {
        toast.success(res.data.message);
        return setSignUpOrSignIn("signIn");
      }
      toast.error(res.data.message);
    } catch (error) {
      toast.error("This email already use");
    }
  };

  return (
    <Form
      values={{
        handleSubmit: handleSubmit,
        icon: <FaLock />,
        title: "Sign Up",
        btnText: "sign up"
      }}
    >
      <Grid container spacing={2} sx={{ margin: "0 auto" }}>
        <div className="box-border space-y-4">
          <Input
            values={{
              title: "User Name",
              name: "userName",
              type: "text",
              placeholder: "User Name",
              icon: (
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              ),
            }}
          />
          <Input
            values={{
              title: "Email",
              name: "email",
              type: "email",
              placeholder: "Email",
              icon: <MdEmail />,
            }}
          />
          <Input
            values={{
              title: "Password",
              name: "password",
              type: "password",
              placeholder: "password",
              icon: <RiLockPasswordFill />,
            }}
          />
        </div>
      </Grid>
      <p className="text-white mt-4">
        Already have an account?{" "}
        <span
          onClick={() => setSignUpOrSignIn("signIn")}
          className="cursor-pointer text-[var(--red)]"
        >
          Sign In
        </span>
      </p>
    </Form>
  );
}
