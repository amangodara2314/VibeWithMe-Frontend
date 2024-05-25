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
    <div className="bg-[#121212] w-full text-white flex flex-wrap justify-center sm:justify-start px-4 sm:px-8 pt-4 pb-28 rounded h-[90%] gap-y-4 sm:gap-y-0 sm:gap-x-4 lg:gap-x-6">
      {!artist ? (
        <div className="flex space-x-2 w-full justify-center items-center h-full">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-8 w-8 bg-white rounded-full animate-bounce" />
        </div>
      ) : (
        artist.map((a, index) => {
          return <Cover key={index} artist={a} />;
        })
      )}
    </div>
  );
}

export default Home;
