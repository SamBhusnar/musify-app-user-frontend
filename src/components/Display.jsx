import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

function Display() {
  return (
    <div className="w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col ">
      {/* Sticky navbar */}
      <NavBar />
      {/* scrollable content */}
      <div className="sticky top-0 z-10 bg-[#121212]/95  flex flex-col  w-full backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2">
        <div className="flex-1 px-6 py-4 overflow-auto">
          <Routes>
            <Route path="/" element={<DisplayHome />} />
            <Route path="/album" element={<DisplayAlbum />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Display;
