"use client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CommonButton from "../../Shared/CommonButton/CommonButton";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Form({
  values,
  children,
}: {
  values: {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    icon: React.ReactNode;
    title: string;
    btnText: string;
  };
  children: React.ReactNode;
}) {
  const { handleSubmit, icon, title, btnText } = values;

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
          <div className="bg-[var(--primary)] p-6 w-full">
            <div className="flex flex-col justify-center   w-fit mx-auto">
              <Avatar
                className="mx-auto"
                sx={{ m: 1, bgcolor: "secondary.main" }}
              >
                <div>{icon}</div>
              </Avatar>
              <Typography
                className="text-white mx-auto"
                component="h1"
                variant="h5"
                sx={{ width: "fit-content" }}
              >
                {title}
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
                  {children}
                  <div className="w-[90%] mt-6 mx-auto">
                    <CommonButton
                      value={{ text: btnText, className: "w-full" }}
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
