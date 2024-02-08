"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import CommonButton from "../../Shared/CommonButton/CommonButton";

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
      userName: data.get("userName"),
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          className="p-1"
          style={{
            background:
              "linear-gradient(90deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%)",
          }}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="bg-[var(--primary)] p-6">
            <div className="flex flex-col justify-center   w-fit mx-auto">
              <Avatar
                className="mx-auto"
                sx={{ m: 1, bgcolor: "secondary.main" }}
              >
                <div>
                  <FaLock />
                </div>
              </Avatar>
              <Typography
                className="text-white mx-auto"
                component="h1"
                variant="h5"
                sx={{ width: "fit-content" }}
              >
                Sign up
              </Typography>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: "100%" }}
            >
              <div>
                <div className="bg-[var(--primary)]">
                  <Grid container spacing={2} sx={{ margin: "0 auto" }}>
                    <div className="box-border space-y-4">
                      <div>
                        <label
                          htmlFor="website-admin"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#B4B9C3]"
                        >
                          Username
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            name="userName"
                            id="website-admin"
                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#4C5884] dark:text-[#B4B9C3] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Bonnie Green"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="website-admin"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#B4B9C3]"
                        >
                          Email
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <MdEmail />
                          </span>
                          <input
                            name="email"
                            type="text"
                            id="website-admin"
                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#4C5884] dark:text-[#B4B9C3] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Example@gmail.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="website-admin"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#B4B9C3]"
                        >
                          Password
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <RiLockPasswordFill />
                          </span>
                          <input
                            name="password"
                            type="text"
                            id="website-admin"
                            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#4C5884] dark:text-[#B4B9C3] dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="aAjda23@"
                          />
                        </div>
                      </div>
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
                  <div className="w-[90%] mt-6 mx-auto">
                    <CommonButton
                      value={{ text: "Sign Up", className: "w-full" }}
                    />
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
