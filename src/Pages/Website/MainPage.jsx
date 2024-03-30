import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Website/Sidebar";
import Header from "../../Components/Website/Header";
import Player from "../../Components/Website/Player";

function MainPage(props) {
  return (
    <div className="grid grid-cols-7 lg:grid-cols-5 gap-3 min-h-screen">
      <div className="hidden md:block md:col-span-2 lg:col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-7 md:col-span-5 lg:col-span-4 flex flex-col gap-3">
        <Header />
        <Outlet />
      </div>
      <Player />
    </div>
  );
}

export default MainPage;
