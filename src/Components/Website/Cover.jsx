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
      className="flex flex-col gap-2 items-center group w-56 h-[255px] hover:bg-[#212121] py-4 rounded cursor-pointer"
    >
      <div className="w-48 h-48 rounded overflow-hidden duration-300">
        <img
          src={API_BASE_URL + artistCoverUrl + artist.cover}
          className="w-full h-full duration-300 group-hover:scale-105"
          alt=""
        />
      </div>
      <div className="">{artist.name}</div>
    </div>
  );
}

export default Cover;
