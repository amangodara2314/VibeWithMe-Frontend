import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../Context/Main";
import { IoIosPause, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoMdSkipForward, IoMdSkipBackward, IoMdPlay } from "react-icons/io";
import ReactPlayer from "react-player";
import { FastAverageColor } from "fast-average-color";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [bgColor, setBgColor] = useState("#000");

  useEffect(() => {
    if (currSong) {
      const fac = new FastAverageColor();
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = API_BASE_URL + coverUrl + currSong.cover;
      img.onload = () => {
        fac
          .getColorAsync(img)
          .then((color) => {
            setBgColor(color.hex);
          })
          .catch((e) => {
            console.error(e);
          });
      };
    }
  }, [currSong, API_BASE_URL, coverUrl]);

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
    if (currSongIndex === artistSongs.length - 1) {
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
      className={`fixed bottom-0 w-full text-white p-2 flex flex-col items-center justify-center transition-all duration-300 ${
        isExpanded ? "h-screen bg-cover bg-center" : "h-[100px] bg-black"
      }`}
      style={{ backgroundColor: isExpanded ? bgColor : "#000" }}
    >
      {currSong == null ? (
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
      ) : (
        <>
          <div
            className={`flex justify-center items-center sm:gap-16 ${
              isExpanded ? "flex-col items-center justify-center" : ""
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <div
                className={`sm:flex gap-4 w-full ${
                  isExpanded
                    ? "flex-col items-center justify-center"
                    : "items-center hidden"
                } transition-all duration-300`}
              >
                <div className="flex justify-center">
                  <img
                    src={API_BASE_URL + coverUrl + currSong.cover}
                    className={`${
                      isExpanded
                        ? "h-[300px] w-[300px] sm:h-[200px] sm:w-[200px] mb-4"
                        : "h-[80px] w-[80px]"
                    } transition-all duration-300`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col items-center ${
                isExpanded ? "gap-3 mt-4" : "gap-2"
              }`}
            >
              <div className="text-sm font-semibold text-[white]">
                {currSong.name}
              </div>
              <div className="flex gap-4 items-center">
                <IoMdSkipBackward
                  onClick={() => {
                    if (currSongIndex === 0) {
                      setCurrSong(artistSongs[artistSongs.length - 1]);
                      setCurrSongIndex(artistSongs.length - 1);
                    } else {
                      setCurrSong(artistSongs[currSongIndex - 1]);
                      setCurrSongIndex(currSongIndex - 1);
                    }
                    setPause(false);
                  }}
                  className="text-gray-200 cursor-pointer"
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
                    if (currSongIndex === artistSongs.length - 1) {
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
          </div>
          <div className="absolute right-4 bottom-8 sm:right-8">
            {isExpanded ? (
              <IoIosArrowDown
                className="text-2xl cursor-pointer"
                onClick={() => setIsExpanded(false)}
              />
            ) : (
              <IoIosArrowUp
                className="text-2xl cursor-pointer"
                onClick={() => setIsExpanded(true)}
              />
            )}
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
