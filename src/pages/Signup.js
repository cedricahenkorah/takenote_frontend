import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { IoMdArrowRoundBack } from "react-icons/io";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/"); // Go back to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50">
      <div className="flex justify-center items-center w-full text-white px-5 lg:px-0">
        <div className="bg-white rounded-2xl shadow-lg text-black">
          <div className="px-10 lg:px-20 py-8 lg:py-10">
            <IoMdArrowRoundBack size={30} onClick={goBack} />

            <h1 className="text-lg lg:text-2xl font-bold tracking-wide mt-3">
              Sign up to take<span className="text-amber-400">Note</span>
            </h1>

            <p className="text-gray-400 text-sm lg:text-base mt-1">
              Create an account to start organizing your notes
            </p>

            {error && (
              <p className="text-red-500 mt-5 text-sm lg:text-base">{error}</p>
            )}

            <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
              <label className="text-sm lg:text-base">Email</label>
              <input
                type="email"
                placeholder="user@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 lg:mb-5 mt-2 p-2 lg:p-3 rounded-md border border-gray-200 focus:ring-offset-4 focus:ring-2"
              />

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
                  Create account
                </button>
              ) : (
                <button
                  className="w-full bg-black text-white lg:font-semibold py-1 lg:py-2 rounded-full mt-3"
                  disabled
                >
                  Ready to Take Notes? Hold on we're setting up your account...
                </button>
              )}
            </form>

            <div className="mt-10 text-sm lg:text-base">
              Already have an account?
              <Link to="/login">
                <span className="font-bold text-amber-400 cursor-pointer ml-1">
                  Sign in
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
