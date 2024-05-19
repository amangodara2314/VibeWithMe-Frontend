import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { favPlaylist } from "../Reducers/user";
import { store } from "../Store";
export const MainContext = createContext();

function Main(props) {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const SONG_URL = process.env.REACT_APP_SONG_URL;
  const ARTIST_URL = process.env.REACT_APP_PLAYLIST_URL;
  const USER_URL = process.env.REACT_APP_USER_URL;

  const [coverUrl, setCoverUrl] = useState(null);
  const [songUrl, setSongUrl] = useState(null);
  const [songs, setSongs] = useState([]);
  const [artistCoverUrl, setArtistCoverUrl] = useState(null);
  const [artist, setArtist] = useState(null);
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currSong, setCurrSong] = useState(null);
  const [currSongIndex, setCurrSongIndex] = useState(null);
  const [artistSongs, setArtistSongs] = useState(null);
  const [pause, setPause] = useState(false);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [err, setErr] = useState({ msg: "", err: false });
  const dispatcher = useDispatch();
  const { user, fav } = useSelector((store) => store.user);

  const fetchSongs = () => {
    axios
      .get(API_BASE_URL + SONG_URL)
      .then((success) => {
        setSongs(success.data.data);
        setCoverUrl(success.data.imageBaseUrl);
        setSongUrl(success.data.songBaseUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateFavSong = (data) => {
    axios
      .put(API_BASE_URL + USER_URL + "update-fav", data)
      .then((success) => {
        if (success.data.status == 1) {
          dispatcher(
            favPlaylist({ fav: success.data.curr_user.favoriteSongs })
          );
        } else {
          console.log(success.data.msg);
        }
      })
      .catch((err) => {
        setErr({ msg: err.message, err: true });
      });
  };

  const checkFavSong = (song) => {
    if (!user) {
      return;
    }
    let check = fav.map((s) => s._id);
    if (check.includes(song._id)) {
      return (
        <div
          onClick={() => {
            updateFavSong({
              user: user.email,
              song_id: song._id,
              flag: false,
            });
          }}
          className="text-red-500 text-left text-xl"
        >
          <IoIosHeart />
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            updateFavSong({
              user: user.email,
              song_id: song._id,
              flag: true,
            });
          }}
          className="text-black-400 text-left text-xl"
        >
          <IoMdHeartEmpty />
        </div>
      );
    }
  };
  const fetchArtist = () => {
    axios
      .get(API_BASE_URL + ARTIST_URL)
      .then((success) => {
        setArtist(success.data.data);
        setArtistCoverUrl(success.data.imageBaseUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchSongs = (query) => {
    axios
      .get(API_BASE_URL + SONG_URL + "/search/" + query)
      .then((success) => {
        if (success.data.data.length != undefined) {
          setSearchedSongs(success.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSongs();
    fetchArtist();
  }, []);

  return (
    <MainContext.Provider
      value={{
        API_BASE_URL,
        SONG_URL,
        songs,
        checkFavSong,
        coverUrl,
        songUrl,
        fetchSongs,
        ARTIST_URL,
        artistCoverUrl,
        artist,
        fetchArtist,
        setCurrPlaylist,
        currPlaylist,
        currSong,
        setCurrSong,
        artistSongs,
        setArtistSongs,
        setCurrSongIndex,
        currSongIndex,
        setPause,
        pause,
        searchedSongs,
        searchSongs,
        setSearchedSongs,
        setErr,
        err,
        USER_URL,
        dispatcher,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}

export default Main;
