import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { MainContext } from "../../Context/Main";

import { useParams } from "react-router-dom";

function SongsListing(props) {
  const {
    songs,
    API_BASE_URL,
    USER_URL,
    coverUrl,
    setCurrSong,
    artistSongs,
    setArtistSongs,
    setCurrSongIndex,
    setPause,
    err,
    setErr,
    checkFavSong,
  } = useContext(MainContext);
  const { artist } = useParams();
  useLayoutEffect(() => {
    let tempsongs = songs?.filter((song) => song.artist == artist);
    setArtistSongs(tempsongs);
  }, [songs]);

  return (
    <div className="h-full text-white bg-[#121212] rounded pt-4 px-2 md:px-6 pb-28">
      <div className="text-center text-xl">This is {artist}</div>
      <div
        className={`text-center font-bold text-sm text-red-600 ${
          err.err ? "" : "hidden"
        }`}
      >
        {err.msg}
      </div>
      <div className="flex flex-col gap-2 items-center mt-4">
        {!artistSongs ? (
          <div className="flex space-x-2 w-full justify-center items-center h-full">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-8 w-8 bg-white rounded-full animate-bounce" />
          </div>
        ) : (
          artistSongs.map((song, index) => {
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
                  {/* <div className="text-gray-400 text-left">{artist}</div> */}
                </div>
                {checkFavSong(song)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SongsListing;
