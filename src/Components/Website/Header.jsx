import React, { useContext, useState } from "react";
import { MainContext } from "../../Context/Main";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineFavorite } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(props) {
  const { setSearchedSongs, searchSongs, searchedSongs } =
    useContext(MainContext);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        className={`fixed top-0 ${
          toggle ? "left-0" : "left-[100%]"
        } duration-500 min-w-full min-h-screen glass-bg text-black`}
        // style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <div className="flex flex-col text-white h-full justify-center">
          {/* Sidebar Header */}
          <div className="p-4 text-center">
            <div className="text-2xl font-semibold">
              {user ? `Hi ${user.name}` : "VibeWithMe"}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <ul className="p-2">
              <li className="mb-2">
                <Link
                  to="/"
                  className="flex items-center px-4 gap-3 py-2 text-gray-400 rounded-lg"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <TiHome className="text-xl text-blue-500 duration-100" />
                  <span className="text-2xl font-bold text-black">Home</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white group"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <MdOutlineFavorite className="text-xl text-red-500 duration-100" />
                  <span className="text-2xl font-bold text-black">
                    Favorites
                  </span>
                </Link>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
          <div className="flex justify-center">
            <IoMdClose
              className="text-3xl text-red font-bold"
              onClick={() => {
                setToggle(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-10 py-4 flex justify-between bg-[#121212] rounded items-center">
        <div className="">
          <input
            type="text"
            onChange={(e) => {
              if (e.target.value == "") {
                setSearchedSongs([]);
                navigate("/");
                return;
              }
              searchSongs(e.target.value);
              navigate("/search");
            }}
            className="bg-[#242424] px-4 py-2 rounded-full text-white md:w-72"
            placeholder="Search"
          />
        </div>
        <div className="text-2xl text-white flex items-center gap-3">
          <div className="sm:block hidden">
            {user ? `Hello ${user.name}` : "VibeWithMe"}
          </div>
          <GiHamburgerMenu
            onClick={() => {
              setToggle(true);
            }}
            className="md:hidden block text-blue-400 "
          />
        </div>
      </div>
    </>
  );
}

export default Header;
