import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Admin/Sidebar";

function Main(props) {
  return (
    <div className="grid grid-cols-6">
      <Sidebar />
      <div className="col-span-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
