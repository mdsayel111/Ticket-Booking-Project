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
import { useRouter } from "next/navigation";
import { setUser } from "@/ClientFiles/Slices/UserSlices";
import { useAppDispatch } from "@/ClientFiles/Hooks/ReduxHook";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn({
  values,
}: {
  values: { setSignUpOrSignIn: Function };
}) {
  const { setSignUpOrSignIn } = values;
  const router = useRouter();
  const dispatch = useAppDispatch();

  //  handle Signup function
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = await axios.post("/api/v1/user_apis/auth", userData);
    toast.success(res.data.message);
    dispatch(setUser(res.data.user));
    localStorage.setItem("user", JSON.stringify(res.data.user));
    router.push("/");
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
            <div className="flex flex-col justify-center">
              <Avatar
                className="mx-auto w-10"
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
                Sign In
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
                    New in this site?{" "}
                    <span
                      onClick={() => setSignUpOrSignIn("signUp")}
                      className="cursor-pointer text-[var(--red)]"
                    >
                      Sign Up
                    </span>
                  </p>
                  <div className="w-[90%] mt-6 mx-auto">
                    <CommonButton
                      value={{ text: "Sign In", className: "w-full" }}
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
