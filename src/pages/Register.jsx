import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserAuth } from "../context/AuthContext";

function Register() {
  const [errors, setErrors] = React.useState({});
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
    fullname: "",
    checkPassword: "",
  });

  useEffect(() => {
    if (userInfo.password !== userInfo.checkPassword) {
      setErrors({
        checkPassword: "Password and Confirm Password must be the same",
      });
    } else {
      setErrors({});
    }
  }, [userInfo.password, userInfo.checkPassword]);

  const navigate = useNavigate();

  const { signUp, user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(userInfo.email, userInfo.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            onChange={(e) => {
              setUserInfo({ ...userInfo, fullname: e.target.value });
            }}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) => {
              setUserInfo({ ...userInfo, checkPassword: e.target.value });
            }}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full text-center py-3 rounded bg-gradient-to-tr bg-green-400  text-white hover:bg-green-dark disabled:bg-gray-500 focus:outline-none my-1"
            disabled={errors.checkPassword}
            onClick={handleSubmit}
          >
            Create Account
          </motion.button>

          {errors.checkPassword && (
            <div className="text-red-500 text-center mt-2">
              {errors.checkPassword}
            </div>
          )}

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link to="/login">
            <a className="no-underline border-b border-blue text-blue">
              Log in
            </a>
            .
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
