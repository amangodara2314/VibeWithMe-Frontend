import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../Context/Main";
import { IoIosPause } from "react-icons/io";
import { IoMdSkipForward, IoMdSkipBackward, IoMdPlay } from "react-icons/io";
import ReactPlayer from "react-player";

function Player(props) {
  const {
    currSong,
    API_BASE_URL,
    coverUrl,
    songUrl,
    artistSongs,
    setCurrSong,
    currSongIndex,
    setCurrSongIndex,
    pause,
    setPause,
  } = useContext(MainContext);
  const playerRef = useRef();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const nextSong = () => {
    if (currSongIndex == artistSongs.length - 1) {
      setCurrSong(artistSongs[0]);
      setCurrSongIndex(0);
    } else {
      setCurrSong(artistSongs[currSongIndex + 1]);
      setCurrSongIndex(currSongIndex + 1);
    }
    setPause(false);
    setCurrentTime(0);
  };

  return (
    <div
      className={`bg-black w-full text-white fixed bottom-0 p-4 flex justify-center sm:gap-2 md:gap-20 items-center`}
    >
      {currSong == null ? (
        <>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4 items-center">
              <IoMdSkipBackward className=" text-gray-500 cursor-pointer" />
              {pause ? (
                <IoMdPlay className="text-gray-500 rounded-full cursor-pointer text-2xl" />
              ) : (
                <IoIosPause className="text-gray-500 rounded-full cursor-pointer text-2xl" />
              )}
              <IoMdSkipForward className="text-gray-500 cursor-pointer" />
            </div>
            <div className="text-gray-500 flex items-center gap-2 text-[10px] h-[20px]">
              <span>0:00</span>
              <input
                type="range"
                name=""
                id="song-duration"
                readOnly
                defaultValue={0}
                className="w-[200px] sm:w-[300px] md:w-[400px] h-[3px]"
              />
              <span>0:00</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" sm:flex hidden gap-4">
            <div className="">
              <img
                src={API_BASE_URL + coverUrl + currSong.cover}
                className="h-[50px] min-w-[50px]"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-[white]">
                {currSong.name}
              </span>
              <div className="text-[12px] text-[gray]">{currSong.artist}</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="sm:hidden block font-semibold">{currSong.name}</div>
            <div className="flex gap-4 items-center">
              <IoMdSkipBackward
                onClick={() => {
                  if (currSongIndex == 0) {
                    setCurrSong(artistSongs[artistSongs.length - 1]);
                    setCurrSongIndex(artistSongs.length - 1);
                  } else {
                    setCurrSong(artistSongs[currSongIndex - 1]);
                    setCurrSongIndex(currSongIndex - 1);
                  }
                  setPause(false);
                }}
                className=" text-gray-200 cursor-pointer"
              />
              {pause ? (
                <IoMdPlay
                  className="text-red rounded-full cursor-pointer text-2xl"
                  onClick={() => {
                    setPause(false);
                  }}
                />
              ) : (
                <IoIosPause
                  className="text-red rounded-full cursor-pointer text-2xl"
                  onClick={() => {
                    setPause(true);
                  }}
                />
              )}
              <IoMdSkipForward
                onClick={() => {
                  if (currSongIndex == artistSongs.length - 1) {
                    setCurrSong(artistSongs[0]);
                    setCurrSongIndex(0);
                  } else {
                    setCurrSong(artistSongs[currSongIndex + 1]);
                    setCurrSongIndex(currSongIndex + 1);
                  }
                  setPause(false);
                }}
                className="text-gray-200 cursor-pointer"
              />
            </div>
            <div className="text-white flex items-center gap-2 text-[10px] h-[20px]">
              <span>{formatTime(currentTime)}</span>
              <input
                onChange={(e) => {
                  setCurrentTime(parseFloat(e.target.value));
                  playerRef.current.seekTo(parseFloat(e.target.value));
                }}
                type="range"
                name=""
                id="song-duration"
                defaultValue={0}
                value={currentTime}
                max={duration}
                className="w-[200px] sm:w-[300px] md:w-[400px] h-[3px]"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <ReactPlayer
            url={API_BASE_URL + songUrl + currSong.audio}
            playing={!pause}
            ref={playerRef}
            onEnded={nextSong}
            className="hidden w-4"
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
        </>
      )}
    </div>
  );
}

export default Player;
