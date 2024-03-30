import React, { useContext, useEffect, useRef, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MainContext } from "../../../Context/Main";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
function Playlist(props) {
  const {
    API_BASE_URL,
    songs,
    coverUrl,
    fetchSongs,
    ARTIST_URL,
    fetchArtist,
    artistCoverUrl,
    artist,
  } = useContext(MainContext);
  const [toggle, setToggle] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [editSong, setEditSong] = useState(null);
  const nameRef = useRef();
  const slugRef = useRef();

  const deleteSong = (id) => {
    console.log(API_BASE_URL + ARTIST_URL + "delete/" + id);
    axios
      .delete(API_BASE_URL + ARTIST_URL + "delete/" + id)
      .then((success) => {
        fetchArtist();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("slug", e.target.slug.value);
    formData.append("cover", e.target.cover.files[0]);
    if (isUpdate) {
      formData.append("oldName", editSong.cover);
      axios
        .put(API_BASE_URL + ARTIST_URL + "update/" + editSong._id, formData)
        .then((success) => {
          e.target.reset();
          setToggle(false);
          fetchArtist();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .post(API_BASE_URL + ARTIST_URL + "create", formData)
        .then((success) => {
          e.target.reset();
          setToggle(false);
          fetchArtist();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    if (editSong != null) {
      nameRef.current.value = editSong.name;
      slugRef.current.value = editSong.slug;
    } else {
      nameRef.current.value = "";
      slugRef.current.value = "";
    }
  }, [editSong]);

  const titleToSlug = () => {
    const slug = nameRef.current.value
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("'", "")
      .toLowerCase();
    slugRef.current.value = slug;
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen z-10 justify-center items-center ${
          toggle ? "flex" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="w-[45%] p-6 bg-white rounded-2xl">
          <div className="text-lg font-semibold flex justify-between items-center">
            {isUpdate ? "Edit" : "Add"} Artist
            <RxCross2
              onClick={() => {
                setEditSong(null);
                setToggle(false);
              }}
              className="cursor-pointer text-2xl font-extrabold bg-white text-black rounded-full"
            />
          </div>
          <form
            encType="multipart/form-data"
            action=""
            onSubmit={submitHandler}
          >
            <div className="my-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Artist Name
              </label>
              <input
                onChange={titleToSlug}
                type="text"
                id="name"
                name="name"
                ref={nameRef}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700"
              >
                Slug
              </label>
              <input
                readOnly
                type="text"
                id="slug"
                name="slug"
                ref={slugRef}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cover
              </label>
              <input
                type="file"
                id="cover"
                name="cover"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md">
        <div className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex justify-between items-center">
          Songs Listing
          <IoAddSharp
            className="cursor-pointer text-2xl bg-white font-extrabold text-black rounded-full"
            onClick={() => {
              setToggle(true);
              setUpdate(false);
            }}
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                slug
              </th>
              <th scope="col" className="px-6 py-3">
                Cover
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {artist &&
              artist.map((a, index) => {
                return (
                  <tr className="bg-white" key={index}>
                    <td className="px-6 py-4">{index + 1}.</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-black whitespace-nowrap"
                    >
                      {a.name}
                    </th>
                    <td className="px-6 py-4">{a.slug}</td>
                    <td className="px-6 py-4">
                      <img
                        className="w-28"
                        alt=""
                        src={API_BASE_URL + artistCoverUrl + a.cover}
                      />
                    </td>
                    <td className="px-6 py-4 flex items-center gap-5 text-lg">
                      <MdDelete
                        onClick={() => {
                          deleteSong(a._id);
                        }}
                        className="text-black cursor-pointer hover:scale-125 hover:text-red-600 duration-150"
                      />
                      <CiEdit
                        className="text-xl text-black cursor-pointer hover:scale-125 hover:text-blue-600 duration-150"
                        onClick={() => {
                          setEditSong(a);
                          setUpdate(true);
                          setToggle(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Playlist;
