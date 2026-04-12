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

  const handleLogin = async (data) => {
    try {
      setLoginError("");
      setIsLoading(true);

      await signInUser(data.email, data.password);
      navigate(location?.state || "/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setLoginError("Email not found. Register first.");
      } else if (err.code === "auth/wrong-password") {
        setLoginError("Incorrect password.");
      } else {
        setLoginError("Login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.75)), url('https://thumbs.dreamstime.com/b/delivery-man-delivering-holding-parcel-box-to-customer-144632660.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/80 text-sm">
              Sign in to your SwiftParcel account
            </p>
          </div>

          {/* Error */}
          {loginError && (
            <p className="text-red-300 text-center mb-4">{loginError}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-white/50" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full pl-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-white/50" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-white/50"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="my-6 border-t border-white/20"></div>

          <SocialLogin />

          <p className="text-center mt-6 text-white/80 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-300 underline">
              Create one
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;