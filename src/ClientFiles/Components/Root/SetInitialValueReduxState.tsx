"use client";
import { useAppDispatch } from "@/ClientFiles/Hooks/ReduxHook";
import { setUser } from "@/ClientFiles/Slices/UserSlices";
import React, { ReactNode, useEffect } from "react";

// set initial value in redux state
const SetInitialValueReduxState = ({ children }: { children: ReactNode }) => {
  const AppDispatch = useAppDispatch();
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    console.log(typeof userDataString);
    AppDispatch(setUser(userDataString ? JSON.parse(userDataString) : {}));
  }, []);
  return <>{children}</>;
};

export default SetInitialValueReduxState;
