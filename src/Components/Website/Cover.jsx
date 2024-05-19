import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../Context/Main";

function Cover({ artist }) {
  const { API_BASE_URL, artistCoverUrl } = useContext(MainContext);
  const navigater = useNavigate();
  return (
    <div
      onClick={() => {
        navigater("/songs/" + artist.name);
      }}
      className="flex flex-col gap-2 items-center group w-full max-w-xs sm:max-w-[150px] py-4 rounded cursor-pointer"
    >
      <div className="w-full aspect-w-1 aspect-h-1 rounded overflow-hidden duration-300">
        <img
          src={API_BASE_URL + artistCoverUrl + artist.cover}
          className="w-full h-full object-cover duration-300 group-hover:scale-105"
          alt=""
        />
      </div>
      <div className="">{artist.name}</div>
    </div>
  );
}

export default Cover;
