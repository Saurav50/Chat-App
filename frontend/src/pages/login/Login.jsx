import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const submitHandler = async (e) => {
    e.preventDefault();
    await login({ username, password });
  };
  return (
    <div className="flex items-center justify-center p-6 w-96 min-w-96 mx-auto">
      <div className="h-full w-full p-6 shadow-md bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-300"> ChatApp</span>
        </h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text"> Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-full h-10"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text"> Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              className=" hover:link hover:text-blue-300 mt-2 text-sm"
              to="/signup"
            >
              {"Dont't"} have an account?
            </Link>
            <button className="btn btn-block mt-2 btn-sm" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
