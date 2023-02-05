import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signIn, user } = UserAuth();

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(userInfo.email, userInfo.password);

      navigate("/");
    } catch (error) {
      console.log(error);
      /* if (error.code === "auth/wrong-password") {
          notify("error", "Wrong Password Or Email!");
        }
        if (error.code === "auth/user-not-found") {
          notify("error", "User Not Found");
        } */
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-grey-dark mt-6">
          Don't have an account?
          <Link to="/register">
            <a className="no-underline border-b border-blue text-blue">
              Sign up
            </a>
            .
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
