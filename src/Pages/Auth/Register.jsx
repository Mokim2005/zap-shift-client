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

  const handleRegistration = async (data) => {
    try {
      setRegisterError("");
      setIsLoading(true);

      const profileImg = data.photo[0];

      // Register user
      await registerUser(data.email, data.password);

      // Upload image
      const formData = new FormData();
      formData.append("image", profileImg);

      const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const imgRes = await axios.post(imgUrl, formData);

      const photoURL = imgRes.data.data.url;

      // Save user in DB
      await axiosSecure.post("/users", {
        email: data.email,
        displayName: data.name,
        photoURL,
      });

      // Update profile
      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      navigate(location?.state || "/");
    } catch (err) {
      console.log(err);

      if (err.code === "auth/email-already-in-use") {
        setRegisterError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setRegisterError("Password is too weak.");
      } else if (err.code === "auth/invalid-email") {
        setRegisterError("Invalid email format.");
      } else {
        setRegisterError("Registration failed. Try again.");
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
      {/* Blur Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10 hover:shadow-blue-500/20 transition-all">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Join SwiftParcel
            </h1>
            <p className="text-white/80 text-sm">
              Create an account to get started
            </p>
          </div>

          {/* Error */}
          {registerError && (
            <div className="mb-5 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
              {registerError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400"
            />

            {/* Photo */}
            <input
              type="file"
              {...register("photo", { required: true })}
              className="w-full text-white"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/60"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-white/20"></div>

          <SocialLogin />

          {/* Login */}
          <p className="text-center mt-6 text-white/80 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;