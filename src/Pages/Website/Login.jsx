import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { MainContext } from "../../Context/Main";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { store } from "../../Store";
import { favPlaylist, login } from "../../Reducers/user";

function Login(props) {
  const { setErr, err, API_BASE_URL, USER_URL } = useContext(MainContext);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post(API_BASE_URL + USER_URL + "login", data)
      .then((success) => {
        if (success.data.status == 1) {
          dispatcher(login({ user: success.data.user, signup: false }));
          dispatcher(favPlaylist({ fav: success.data.user.favoriteSongs }));
          setErr({ err: false });
          navigate("/");
        } else {
          setErr({ msg: success.data.msg, err: true });
        }
      })
      .catch((err) => {
        setErr({ msg: err.message, err: true });
      });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#121212] to-black">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
        <div className="text-3xl font-semibold text-center mb-6">Login</div>
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

          <div className="flex items-center justify-between">
            <button
              className="bg-[#121212] hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/signup"
            >
              Do Not Have An Account Yet?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
