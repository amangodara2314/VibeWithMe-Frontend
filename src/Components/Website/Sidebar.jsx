import React, { useContext, useState } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { login, logoutAction } from "../../Reducers/user";
import { GoPlus } from "react-icons/go";
import { MainContext } from "../../Context/Main";
import Select from "react-select";
import axios from "axios";
import { store } from "../../Store";

const Sidebar = () => {
  const { user } = useSelector((store) => store.user);
  const {
    songs,
    USER_URL,
    API_BASE_URL,
    setCurrSong,
    setCurrSongIndex,
    setPause,
    song,
    index,
  } = useContext(MainContext);
  const [logout, setLogout] = useState(false);
  const [create, setCreate] = useState(false);
  const dispatcher = useDispatch();
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
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
  const deletePlaylist = () => {
    axios
      .delete(API_BASE_URL + USER_URL + `delete-playlist/${user.email}/${id}`)
      .then((success) => {
        dispatcher(login({ user: success.data.updatedClient, signup: false }));
        navigate("/");
        setConfirm(false);
        setId(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className={`w-full min-h-screen ${
          logout ? "flex" : "hidden"
        } items-center justify-center fixed top-0 left-0 bg-gray-900 bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Logout Confirmation</h2>
          <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                dispatcher(logoutAction());
                setLogout(false);
                setCurrSong(song);
                setCurrSongIndex(index);
                setPause(false);
              }}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Yes, Logout
            </button>
            <button
              onClick={() => {
                setLogout(false);
              }}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className={`w-full min-h-screen ${
          confirm ? "flex" : "hidden"
        } items-center justify-center fixed top-0 left-0 bg-gray-900 bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Delete Confirmation</h2>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this playlist?
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                deletePlaylist();
              }}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => {
                setConfirm(false);
                setId(null);
              }}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        className={`w-full min-h-screen ${
          create ? "flex" : "hidden"
        } items-center justify-center fixed top-0 left-0 bg-gray-900 bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Playlist</h2>
          <form onSubmit={handleSubmit}>
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
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setCreate(false);
                }}
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Create Playlist
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col bg-[#121212] text-white h-full">
        {/* Sidebar Header */}
        <div className="p-4">
          <div className="text-2xl font-semibold">VibeWithMe</div>
          <hr className="mt-3 text-gray-400" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="p-2">
            <li className="mb-2">
              <Link
                to="/"
                className="flex items-center cursor-pointer px-4 gap-3 py-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white group"
              >
                <TiHome className="text-xl text-white group-hover:text-blue-500 duration-100" />
                <span className="text-lg">Home</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to={user ? "/fav" : "/login"}
                className="flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white group"
              >
                <MdOutlineFavorite className="text-xl text-white group-hover:text-red-500 duration-100" />
                <span className="text-lg">Favorites</span>
              </Link>
            </li>
            <li
              className="mb-2"
              onClick={() => {
                setCreate(true);
                setSelectedSongs([]);
                setPlaylistName("");
              }}
            >
              <Link
                to={user ? "/" : "/login"}
                className="flex items-center cursor-pointer gap-3 px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white group"
              >
                <span className="text-lg">Create Playlist</span>
                <GoPlus className="text-xl text-white group-hover:text-red-500 duration-100" />
              </Link>
            </li>
            {user &&
              user.createdPlaylist.map((p, i) => {
                return (
                  <li
                    className="mb-2 rounded-lg hover:bg-gray-800 hover:text-white flex items-center"
                    onClick={() => {}}
                    key={i}
                  >
                    <Link
                      to={user ? `/playlist/${p._id}` : "/login"}
                      className="flex items-center justify-between cursor-pointer gap-3 px-4 py-2 text-gray-400 group w-[90%]"
                    >
                      <span className="text-lg text-white">{p.name}</span>
                      <span className="text-md flex gap-2 items-center">
                        Playlist
                      </span>
                    </Link>

                    <svg
                      className="cursor-pointer hover:text-red-500 duration-100"
                      onClick={() => {
                        setConfirm(true);
                        setId(p._id);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </li>
                );
              })}
            <li className="px-2 flex gap-4">
              {user ? (
                <div
                  onClick={() => {
                    setLogout(true);
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white group"
                >
                  <span className="text-lg">Logout</span>
                  <IoIosLogOut />
                </div>
              ) : (
                <div className="flex justify-center gap-2 w-full flex-wrap">
                  <Link to="/login">
                    <button class="bg-white hover:bg-gray-300 duration-200 text-black font-bold py-2 px-4 rounded-2xl">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button class="bg-white hover:bg-gray-300 duration-200 text-black font-bold py-2 px-4 rounded-2xl">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
