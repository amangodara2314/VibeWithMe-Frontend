import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Main";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { store } from "../../Store";
import { login, signUp } from "../../Reducers/user";

function Signup() {
  const { setErr, err, API_BASE_URL, USER_URL } = useContext(MainContext);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.password.value != e.target.confirm.value) {
      setErr({
        msg: "Password and confirm password must be identical",
        err: true,
      });
    } else {
      setErr({
        err: false,
      });
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      axios
        .post(API_BASE_URL + USER_URL + "signup", data)
        .then((success) => {
          if (success.data.status == 1) {
            dispatcher(login({ user: data, signup: true }));
            navigate("/");
          } else {
            setErr({ msg: success.data.msg, err: true });
          }
        })
        .catch((err) => {
          setErr({ msg: err.message, err: true });
        });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#121212] to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
        <div className="text-3xl font-semibold text-center mb-6">
          Create Your Account
        </div>
        <div
          className={`text-center font-bold text-sm text-red-600 ${
            err.err ? "" : "hidden"
          }`}
        >
          {err.msg}
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="name"
              name="name"
              placeholder="Name"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required={true}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id=""
              type="password"
              name="confirm"
              placeholder="Confirm password"
              required={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#121212] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Signup
            </button>
            {/* <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
