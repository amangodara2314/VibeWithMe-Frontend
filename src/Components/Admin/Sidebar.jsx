import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <div className="col-span-1 bg-[#232E3C] text-white pt-4 px-4 min-h-screen">
      <div className="text-xl font-semibold uppercase text-center">
        Admin Panel
      </div>
      <div className="mt-4">
        <ul>
          <Link to="/admin/335524">
            <li className="py-2 hover:bg-slate-700 duration-150 cursor-pointer rounded-lg px-3">
              Songs
            </li>
          </Link>
          <Link to="/admin/335524/playlist">
            <li className="py-2 hover:bg-slate-700 duration-150 cursor-pointer rounded-lg px-3 mt-2">
              Playlists
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
