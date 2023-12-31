import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { IoMdArrowRoundBack } from "react-icons/io";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/"); // Go back to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <div className="flex justify-center items-center w-full text-white px-5 lg:px-0">
        <div className="bg-white rounded-2xl shadow-lg text-black">
          <div className="px-10 lg:px-20 py-8 lg:py-10">
            <IoMdArrowRoundBack size={30} onClick={goBack} />

            <h1 className="text-lg lg:text-2xl font-bold tracking-wide mt-3">
              Sign in to take<span className="text-amber-400">Note</span>
            </h1>

            <p className="text-gray-400 text-sm lg:text-base mt-1">
              Welcome back! Please enter your details to dive back in
            </p>

            {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )}

            <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
              <label className="text-sm lg:text-base">Username</label>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
              />

              <label className="text-sm lg:text-base">Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
              />

              {!isLoading ? (
                <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3">
                  Login
                </button>
              ) : (
                <button className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3">
                  Hold on...
                </button>
              )}
            </form>

            <div className="mt-10 text-sm lg:text-base">
              Don't have an account?
              <Link to="/signup">
                <span className="font-bold text-amber-400 cursor-pointer ml-1">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
