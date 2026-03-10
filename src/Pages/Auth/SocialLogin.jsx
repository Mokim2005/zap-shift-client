import { useLocation, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useState } from "react";

const SocialLogin = () => {
  const { signInGoogle } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoadingGoogle(true);
    signInGoogle()
      .then((res) => {
        console.log(res.user);

        //create user in database
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
          setIsLoadingGoogle(false);
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingGoogle(false);
      });
  };

  return (
    <div className="space-y-4">
      {/* Google Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoadingGoogle}
        className="w-full py-3 px-4 bg-white/60 hover:bg-white/80 disabled:bg-gray-200 border border-white/40 rounded-xl transition-all duration-200 font-semibold text-gray-700 hover:text-gray-900 disabled:text-gray-500 flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
      >
        {isLoadingGoogle ? (
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
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
