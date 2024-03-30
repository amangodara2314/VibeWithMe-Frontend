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
    <div className="bg-[#121212] text-white justify-center sm:justify-start px-1 lg:px-4 py-4 rounded h-full flex flex-wrap md:gap-1 lg:gap-6">
      {artist &&
        artist.map((a, index) => {
          return <Cover key={index} artist={a} />;
        })}
    </div>
  );
}

export default Home;
