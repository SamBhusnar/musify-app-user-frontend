import React, { use, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

function Display() {
  const displayRef = useRef();
  const { albumsData } = useContext(PlayerContext);
  const location = useLocation();
  const isAlbumPage = location.pathname.includes("album");
  const albumId = isAlbumPage ? location.pathname.split("/").pop() : null;

  const bgColor = isAlbumPage
    ? albumsData.find((x) => x._id === albumId)?.bgColour || "#ffffff"
    : "#121212";
  console.log("albmdata : ", albumsData);
  console.log(albumId);

  useEffect(() => {
    if (isAlbumPage) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [isAlbumPage, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col "
    >
      {/* Sticky navbar */}
      <div className="sticky top-0 z-10 bg-[#121212]/95  flex flex-col  w-full backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2">
        <NavBar />
      </div>
      
        {/* scrollable content */}
        <div className="flex-1 px-6 py-4 overflow-auto">
          <Routes>
            <Route path="/" element={<DisplayHome />} />
            <Route
              path="/album/:id"
              element={
                <DisplayAlbum
                  album={albumsData.find((x) => x._id === albumId)}
                />
              }
            />
            <Route path="/search" element={<Search />} />
          </Routes>
         
      </div>
    </div>
  );
}

export default Display;
