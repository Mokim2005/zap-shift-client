import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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
          setLoginError("Incorrect password.");
        } else {
          setLoginError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h2>

        <p className="text-center text-gray-500 mb-6">Login to continue</p>

        {loginError && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* EMAIL */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              type="email"
              placeholder="Email address"
              {...register("email", { required: "Email is required" })}
              className="w-full border pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />

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
              className="w-full border pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <SocialLogin />

        {/* REGISTER */}
        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            state={location?.state}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
