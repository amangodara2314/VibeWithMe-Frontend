import React, { useContext, useEffect } from "react";
import { MainContext } from "../../Context/Main";

function Search(props) {
  const {
    searchedSongs,
    API_BASE_URL,
    setToggle,
    setCurrSong,
    setCurrSongIndex,
    setPause,
    coverUrl,
  } = useContext(MainContext);

  return (
    <div className="h-full text-white bg-[#121212] rounded pt-4 px-6 pb-28">
      <div className="flex flex-col gap-2 items-center mt-4">
        {searchedSongs.length == [] ? (
          <div className="text-center mt-8 text-2xl font-bold text-red-500">
            Song Unavailable
          </div>
        ) : (
          searchedSongs.map((song, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrSong(song);
                  setCurrSongIndex(index);
                  setPause(false);
                }}
                className="px-4 py-2 hover:bg-[#212121] duration-150 rounded w-[90%] cursor-pointer flex justify-between"
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
                <div className="text-gray-400">{song.artist}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Search;
