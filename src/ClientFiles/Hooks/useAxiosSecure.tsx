"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const instance = axios.create({});

const useAxiosSecure = () => {
  const router = useRouter();

  useEffect(() => {
    instance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          router.push("/signup_or_signin");
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return instance;
};

export default useAxiosSecure;
