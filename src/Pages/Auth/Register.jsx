import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistation = (data) => {
    setRegisterError("");
    setIsLoading(true);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        //store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImg);
        const imgUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(imgUrl, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user in database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          //update user profile to the firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              setIsLoading(false);
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
              setRegisterError("Failed to update profile. Please try again.");
            });
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // Display user-friendly error messages
        if (err.code === "auth/email-already-in-use") {
          setRegisterError(
            "This email is already registered. Please login instead.",
          );
        } else if (err.code === "auth/weak-password") {
          setRegisterError(
            "Password is too weak. Please use a stronger password.",
          );
        } else if (err.code === "auth/invalid-email") {
          setRegisterError("Invalid email format. Please check and try again.");
        } else {
          setRegisterError("Registration failed. Please try again later.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Glass Card Container */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-black/10 rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
              Join SwiftParcel
            </h1>
            <p className="text-gray-600">Create an account to get started</p>
          </div>

          {/* Register Error Alert */}
          {registerError && (
            <div className="mb-6 p-4 bg-red-50/80 border border-red-200/50 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-700">{registerError}</p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(handleRegistation)}
            className="space-y-5"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Full name is required" })}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 focus:bg-white/70 transition-all duration-200 placeholder-gray-400 text-gray-900"
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586 7.313 11.899a1 1 0 00-1.414 1.414l3.536 3.536a1 1 0 001.414 0l7.071-7.071z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo Upload Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                {...register("photo", {
                  required: "Profile photo is required",
                })}
                accept="image/*"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 focus:bg-white/70 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
              {errors.photo && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586 7.313 11.899a1 1 0 00-1.414 1.414l3.536 3.536a1 1 0 001.414 0l7.071-7.071z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 focus:bg-white/70 transition-all duration-200 placeholder-gray-400 text-gray-900"
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586 7.313 11.899a1 1 0 00-1.414 1.414l3.536 3.536a1 1 0 001.414 0l7.071-7.071z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 focus:bg-white/70 transition-all duration-200 placeholder-gray-400 text-gray-900"
                />
                {/* Password Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-3.368A9.945 9.945 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.079 10.079 0 01-9.542 7-9.9 9.9 0 01-1.563-4.803m5.604-3.368L9.172 9.172m0 0a3 3 0 105.656 3.656m-5.656-3.656l3.536 3.536"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.101 12.93a1 1 0 00-1.414-1.414L10 14.586 7.313 11.899a1 1 0 00-1.414 1.414l3.536 3.536a1 1 0 001.414 0l7.071-7.071z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-300 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white/60 text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location?.state}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
