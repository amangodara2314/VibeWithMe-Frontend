import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../Store";
import { MainContext } from "../../Context/Main";
import { useNavigate } from "react-router-dom";

function Favorite(props) {
  const { user, fav } = useSelector((store) => store.user);
  const navigator = useNavigate();
  const {
    setCurrSong,
    setCurrSongIndex,
    setPause,
    API_BASE_URL,
    coverUrl,
    checkFavSong,
    setArtistSongs,
  } = useContext(MainContext);
  useEffect(() => {
    if (!user) {
      navigator("/");
      return;
    }
    setArtistSongs(fav);
  }, [user, fav]);
  return (
    <div className="h-full text-white bg-[#121212] rounded pt-4 px-2 md:px-6 pb-28">
      <div className="text-center text-xl">Favorite Songs</div>
      <div className="flex flex-col gap-2 items-center mt-4">
        {fav == null || fav.length == 0 ? (
          <div className="p-5 text-center text-2xl font-bold text-white">
            Add Songs To Favorite
          </div>
        ) : (
          fav.map((song, index) => {
            return (
              <div className="flex w-full items-center hover:bg-[#212121] px-1 md:px-4 py-2 gap-2 duration-150 rounded cursor-pointer">
                <div
                  key={index}
                  onClick={() => {
                    setCurrSong(song);
                    setCurrSongIndex(index);
                    setPause(false);
                  }}
                  className="gap-2 duration-150 rounded w-full cursor-pointer flex justify-between items-center"
                >
                  <div className="flex items-center w-[80%]">
                    <img
                      width={60}
                      className="mr-4"
                      src={API_BASE_URL + coverUrl + song?.cover}
                      alt=""
                    />
                    <span className="">{song.name}</span>
                  </div>
                  <div className="text-gray-400 text-left">{song.artist}</div>
                </div>
                {user != null ? checkFavSong(song) : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Favorite;
