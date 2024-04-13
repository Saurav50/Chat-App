import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const onCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex items-center justify-center p-6 w-96 min-w-96 mx-auto">
      <div className="h-full w-full p-6 shadow-md bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border border-gray-100">
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-300">
          Sign Up <span className="text-blue-300"> ChatApp</span>
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text"> Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Fullname"
              className="input input-bordered w-full h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text"> Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered w-full h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text"> Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
              value={inputs.paasword}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text"> Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
            <GenderCheckbox
              onCheckBoxChange={onCheckBoxChange}
              selectedGender={inputs.gender}
            />
            <Link
              to="/login"
              className=" hover:link hover:text-blue-300  text-sm"
              href="#"
            >
              Already have an account?
            </Link>
            <button className="btn btn-block mt-2 btn-sm" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                " Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
