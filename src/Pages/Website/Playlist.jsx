import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../Store";
import { MainContext } from "../../Context/Main";
import Select from "react-select";

import { GoPlus } from "react-icons/go";
import axios from "axios";
import { login } from "../../Reducers/user";

function PlaylistWeb(props) {
  const { user } = useSelector((store) => store.user);
  const {
    API_BASE_URL,
    coverUrl,
    setCurrSong,
    USER_URL,
    setCurrSongIndex,
    setPause,
    songs,
    setArtistSongs,
  } = useContext(MainContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const dispatcher = useDispatch();
  const removeSong = (song) => {
    const data = {
      song: song,
      user: user.email,
      playlistId: id,
    };
    axios
      .delete(API_BASE_URL + USER_URL + "remove-song", { data })
      .then((success) => {
        dispatcher(login({ user: success.data.updatedClient, signup: false }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    let song = user.createdPlaylist.filter((p) => p._id == id);

    if (!song || !song[0].songs) {
      console.log("out");
      return;
    } else {
      console.log("in");
      setPlaylistSongs(song[0]);
      setArtistSongs(song[0].songs);
    }
  }, [id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = selectedSongs.map((s) => s.value);
    if (selectedSongs.length != 0) {
      axios
        .put(API_BASE_URL + USER_URL + "add-songs", {
          songs: filtered,
          user: user.email,
          playlistId: id,
        })
        .then((success) => {
          dispatcher(
            login({ user: success.data.updatedClient, signup: false })
          );
          setCreate(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div
        className={`w-full min-h-screen ${
          create ? "flex" : "hidden"
        } items-center justify-center fixed top-0 left-0 bg-gray-900 bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">Add Songs</h2>
          <form onSubmit={handleSubmit}>
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
      <div className="h-full text-white bg-[#121212] rounded pt-4 md:px-6 pb-28 text-center">
        <div
          onClick={() => {
            setCreate(true);
          }}
          className="flex justify-center items-center gap-2 text-2xl cursor-pointer hover:text-blue-500"
        >
          Add New Songs
          <GoPlus className="text-2xl font-bold text-white hover:text-blue-500 duration-100 cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2 items-center mt-4">
          {playlistSongs.length == [] ? (
            <div className="text-center mt-8 text-2xl font-bold text-red-500">
              Song Unavailable
            </div>
          ) : (
            playlistSongs.songs.map((song, index) => {
              return (
                <div className="px-4 flex items-center w-[90%] hover:bg-[#212121] duration-150 rounded gap-2 h-[60px]">
                  <div
                    key={index}
                    onClick={() => {
                      setCurrSong(song);
                      setCurrSongIndex(index);
                      setPause(false);
                    }}
                    className="py-2 w-full cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <img
                        width={60}
                        className="mr-4"
                        src={API_BASE_URL + coverUrl + song?.cover}
                        alt=""
                      />
                      <span className="">{song.name}</span>
                    </div>
                    {/* <div className="text-gray-400">{song.artist}</div> */}
                  </div>
                  <div
                    onClick={() => {
                      removeSong(song._id);
                    }}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="#ffffff"
                    >
                      <path d="M19 13H5v-2h14v2z" />
                    </svg>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default PlaylistWeb;
