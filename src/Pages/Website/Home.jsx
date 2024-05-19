import React, { useContext } from "react";
import Cover from "../../Components/Website/Cover";
import { MainContext } from "../../Context/Main";

function Home(props) {
  const {
    API_BASE_URL,
    SONG_URL,
    artist,
    songs,
    coverUrl,
    songUrl,
    fetchSongs,
  } = useContext(MainContext);
  return (
    <div className="bg-[#121212] w-full text-white justify-center sm:justify-start px-1 sm:px-8 pt-4 pb-28 rounded h-full flex flex-wrap gap-y-0 sm:gap-x-4 lg:gap-x-6">
      {artist &&
        artist.map((a, index) => {
          return <Cover key={index} artist={a} />;
        })}
    </div>
  );
}

export default Home;
