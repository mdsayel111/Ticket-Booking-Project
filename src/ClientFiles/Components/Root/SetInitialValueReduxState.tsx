"use client";
import { useAppDispatch } from "@/ClientFiles/Hooks/ReduxHook";
import { setUser } from "@/ClientFiles/Slices/UserSlices";
import React, { ReactNode, useEffect } from "react";

// set initial value in redux state
const SetInitialValueReduxState = ({ children }: { children: ReactNode }) => {
  const AppDispatch = useAppDispatch();
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user") || "{}"));
    AppDispatch(setUser(JSON.parse(localStorage.getItem("user") || "{}")));
  }, []);
  return <>{children}</>;
};

export default SetInitialValueReduxState;
