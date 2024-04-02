import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Pages/Website/MainPage";
import Home from "./Pages/Website/Home";
import Main from "./Pages/Admin/MainPage";
import Songs from "./Pages/Admin/Albums/Songs";
import SongsListing from "./Pages/Website/Songs";
import Playlist from "./Pages/Admin/Albums/Playlists";
import Search from "./Pages/Website/Search";
import Signup from "./Pages/Website/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { lsToState } from "./Reducers/user";
import Login from "./Pages/Website/Login";
import Favorite from "./Pages/Website/Favorite";
import PlaylistWeb from "./Pages/Website/Playlist";
const routes = createBrowserRouter([
  {
    path: "",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/songs/:artist",
        element: <SongsListing />,
      },
      ,
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/fav",
        element: <Favorite />,
      },
      ,
      {
        path: "/playlist/:id",
        element: <PlaylistWeb />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  ,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/335524",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Songs />,
      },
      {
        path: "playlist",
        element: <Playlist />,
      },
    ],
  },
]);
function App() {
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(lsToState());
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
