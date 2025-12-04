import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = UseAuth();
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || '/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="text-2xl font-bold text-center">Please Login</h2>
        <fieldset className="fieldset">
          {/* email  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is requred</p>
          )}
          {/* password  */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 character or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New to Zap Shift{" "}

          <Link
          
          state={location?.state}
          className="text-blue-400 underline" to="/register">
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
