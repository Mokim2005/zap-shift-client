import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-tawny.vercel.app",
});

const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;

        // prevent crash
        config.headers = config.headers || {};

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("AXIOS ERROR:", error);

        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => navigate("/login"));
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;
