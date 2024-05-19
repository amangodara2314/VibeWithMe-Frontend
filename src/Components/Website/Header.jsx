import React, { useContext, useState } from "react";
import { MainContext } from "../../Context/Main";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineFavorite } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import Select from "react-select";
import { IoIosLogOut } from "react-icons/io";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logoutAction } from "../../Reducers/user";
import { BsMusicNoteBeamed } from "react-icons/bs";

import axios from "axios";

function Header(props) {
  const {
    setSearchedSongs,
    searchSongs,
    searchedSongs,
    songs,
    USER_URL,
    API_BASE_URL,
  } = useContext(MainContext);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [toggle, setToggle] = useState(false);
  const [create, setCreate] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [id, setId] = useState(null);
  const navigator = useNavigate();
  const dispatcher = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = selectedSongs.map((s) => s.value);
    const data = {
      name: playlistName,
      songs: filtered,
      user: user.email,
    };
    axios
      .put(API_BASE_URL + USER_URL + "create-playlist", data)
      .then((success) => {
        dispatcher(login({ user: success.data.updatedClient, signup: false }));
        setCreate(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className={`w-full min-h-screen ${
          create ? "flex" : "hidden"
        } items-center justify-center fixed top-0 left-0 bg-gray-900 bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Playlist</h2>
          <form onSubmit={handleSubmit} className="md:w-full">
            <div className="mb-4">
              <label
                htmlFor="playlistName"
                className="block text-gray-700 font-bold mb-2"
              >
                Playlist Name
              </label>
              <input
                type="text"
                id="playlistName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={playlistName}
                onChange={(event) => {
                  setPlaylistName(event.target.value);
                }}
                placeholder="Enter playlist name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="songs"
                className="block text-gray-700 font-bold mb-2"
              >
                Select Songs
              </label>
              <Select
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable
                value={selectedSongs}
                onChange={(option) => {
                  setSelectedSongs(option);
                }}
                options={songs.map((s) => {
                  return { label: s.name, value: s._id };
                })}
              />
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <button
                onClick={() => {
                  setCreate(false);
                }}
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-2 md:mb-0 md:w-auto"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 md:w-auto"
              >
                Create Playlist
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`fixed top-0 ${
          toggle ? "left-0" : "left-[100%]"
        } duration-500 w-full h-screen bg-opacity-50 backdrop-filter bg-[#121212] backdrop-blur-md text-black z-50`}
      >
        <div className="flex flex-col h-[84%] text-white">
          {/* Sidebar Header */}
          <div className="p-4 text-center">
            <div className="text-3xl font-semibold">
              {user ? `Hi ${user.name}` : "VibeWithMe"}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <ul className="p-2 space-y-4">
              <SidebarLink
                to="/"
                label="Home"
                onClick={() => setToggle(false)}
              />
              <SidebarLink
                to={user ? "/fav" : "/login"}
                label="Favorites"
                onClick={() => setToggle(false)}
              />
              <li className="rounded-lg cursor-pointer">
                <div
                  onClick={() => {
                    if (user) {
                      setCreate(true);
                      setToggle(false);
                      setSelectedSongs([]);
                      setPlaylistName("");
                    } else {
                      navigator("/login");
                    }
                  }}
                  className="px-4 py-2 text-white font-semibold"
                >
                  Create Playlist
                </div>
              </li>
              {user &&
                user.createdPlaylist?.map((p, i) => (
                  <li
                    className="flex items-center justify-between rounded-lg px-4 py-2 cursor-pointe text-white"
                    key={i}
                  >
                    <Link
                      to={`/playlist/${p._id}`}
                      className="flex-1"
                      onClick={() => setToggle(false)}
                    >
                      <span>{p.name}</span>
                      <span className="ml-2">( Playlist )</span>
                    </Link>
                    <IoMdCloseCircleOutline
                      className="ml-4 text-2xl text-red-500 hover:text-red-500"
                      onClick={() => setId(p._id)}
                    />
                  </li>
                ))}
            </ul>
          </div>

          {/* Login/Signup and Close Button */}
          <div className="p-4 text-center space-y-4">
            <div>
              {user ? (
                <div
                  onClick={() => dispatcher(logoutAction())}
                  className="flex items-center justify-center bg-red-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                  <span className="font-bold">Logout</span>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <button className="bg-blue-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-full">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-green-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg w-full">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setToggle(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 mt-2 px-4 rounded-lg w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-10 py-4 flex justify-between bg-[#121212] rounded items-center">
        <div className="">
          <input
            type="text"
            onChange={(e) => {
              if (e.target.value == "") {
                setSearchedSongs([]);
                navigate("/");
                return;
              }
              searchSongs(e.target.value);
              navigate("/search");
            }}
            className="bg-[#242424] px-4 py-2 rounded-full text-white w-72 md:w-82"
            placeholder="Search"
          />
        </div>
        <div className="text-2xl text-white flex items-center gap-3">
          <div className="sm:block hidden">
            {user ? `Hello ${user.name}` : "VibeWithMe"}
          </div>
          <GiHamburgerMenu
            onClick={() => {
              setToggle(true);
            }}
            className="md:hidden block text-white"
          />
        </div>
      </div>
    </>
  );
}

const SidebarLink = ({ to, label, onClick }) => (
  <li className="rounded-lg cursor-pointer">
    <Link
      to={to}
      className="block px-4 py-2 font-semibold text-white"
      onClick={onClick}
    >
      {label}
    </Link>
  </li>
);

export default Header;
