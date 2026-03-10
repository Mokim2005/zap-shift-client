import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (data) => {
    setLoginError("");
    setIsLoading(true);

    signInUser(data.email, data.password)
      .then(() => {
        setIsLoading(false);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.code === "auth/user-not-found") {
          setLoginError("Email address not found. Please register first.");
        } else if (err.code === "auth/wrong-password") {
          setLoginError("Incorrect password. Please try again.");
        } else {
          setLoginError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {loginError && (
          <p className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
            {loginError}
          </p>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right text-sm text-blue-500 cursor-pointer">
            Forgot password?
          </div>

          {/* LOGIN BUTTON */}
          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-400">OR</div>

        <SocialLogin />

        {/* REGISTER */}
        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            state={location?.state}
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;