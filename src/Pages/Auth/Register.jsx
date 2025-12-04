import React from "react";
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
  const axiosSecure = UseAxiosSecure()

  const handleRegistation = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {

        //store the image and get the photo ulr
        const formData = new FormData();
        formData.append("image", profileImg);
        const imgulr = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(imgulr, formData).then((res) => {
          const photoURL = res.data.data.url

          //create user in database
          const userInfo ={
            email: data.email,
            displayName: data.name,
            photoURL: photoURL
          }
          axiosSecure.post('/users', userInfo)
          .then(res=>{
            if(res.data.insertedId){
              console.log('user created in the database')
            }
          })


          //update user profile to the firebase
          const userProfile = {
            displayName: data.name,
            photoURL:photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
            
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleRegistation)}>
        <h2 className="text-2xl fotn-bold text-center">Please Register</h2>
        <fieldset className="fieldset">
          {/* name  */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is requred</p>
          )}

          {/* image  */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Yout Photo"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Photo is requred</p>
          )}

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
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is requred</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 character or longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already have an account
          <Link
            state={location?.state}
            className="text-blue-400 underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
