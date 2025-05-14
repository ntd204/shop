import React, { useEffect, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useHandleChange from "../../hooks/useHandleChange";

const Login = () => {
  const dispatch = useDispatch();
  const [stateEyes, setStateEyes] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const { formData, handleChange } = useHandleChange({
    email: "",
    password: "",
  });
  const handleLogin = () => {
    dispatch(doLogin(formData));
  };
  useEffect(() => {
    if (isLogin) {
      toast.success("Success login", {
        autoClose: 500,
      });
      navigate("/");
    }
  });
  return (
    <>
      <div className="flex flex-col justify-center items-center m-15">
        <span className="text-3xl font-semibold">Account</span>
        <div className="container w-xl ">
          <div className="text-2xl font-semibold ">Sign in</div>
          <div className="flex-col flex border-gray-300 rounded-xl bg-gray-100 justify-center items-center p-5 gap-3">
            <div className="w-full">
              <input
                className="h-10 w-full pl-2 border rounded-sm bg-white "
                type="text"
                name="email"
                placeholder="Email*"
                onChange={handleChange}
              />
            </div>
            <div className="relative w-full">
              {stateEyes ? (
                <div className="flex justify-center items-center border rounded-sm bg-white ">
                  <input
                    type="text"
                    name="password"
                    placeholder="Password*"
                    className=" h-10 border-none w-full pl-2"
                    onChange={handleChange}
                  />
                  <IoIosEye
                    className="absolute top-2 right-3 size-6 cursor-pointer"
                    onClick={() => setStateEyes((prev) => !prev)}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center border rounded-sm bg-white">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password*"
                    className="h-10 border-none w-full pl-2"
                    onChange={handleChange}
                  />
                  <IoIosEyeOff
                    className="absolute top-2 right-3 size-6 cursor-pointer"
                    onClick={() => setStateEyes((prev) => !prev)}
                  />
                </div>
              )}
            </div>
            <a href="#" className="cursor-pointer hover:underline">
              Forgot password?
            </a>
            <button
              className="font-semibold text-xl border rounded-xl w-full bg-black text-white p-1 hover:bg-white hover:text-black cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
