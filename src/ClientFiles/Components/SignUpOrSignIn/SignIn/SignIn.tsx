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
import Input from "../../Shared/Input/Input";
import Form from "../../Shared/Form/Form";

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
    if (res.data.user) {
      toast.success(res.data.message);
      dispatch(setUser(res.data.user));
      console.log(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return router.push("/");
    }
    toast.error(res.data.message);
  };

  return (
    <Form
      values={{
        handleSubmit: handleSubmit,
        icon: <FaLock />,
        title: "Sign In",
        btnText: "sing in",
      }}
    >
      <Grid container spacing={2} sx={{ margin: "0 auto" }}>
        <div className="box-border space-y-4">
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
        New in this site?{" "}
        <span
          onClick={() => setSignUpOrSignIn("signUp")}
          className="cursor-pointer text-[var(--red)]"
        >
          Sign Up
        </span>
      </p>
    </Form>
  );
}
