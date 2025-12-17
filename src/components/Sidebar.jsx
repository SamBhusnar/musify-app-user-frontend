import { ArrowRight, Home, Library, Plus, Search, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

function Sidebar() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setIsSearchActive, clearSearch } =
    useSearch();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const handleSearchClick = () => {
    setShowSearchInput(true);
    setIsSearchActive(true);
    navigate("/search");
  };
  const handleClearSearch = () => {
    // setSearchQuery("");
    setShowSearchInput(false);
    clearSearch();
    // navigate("/");
  };
  return (
    <div className="w-[25%] p-2 h-full flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] flex flex-col justify-around rounded">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer hover:text-green-500 transition-colors"
        >
          <Home className="w-6 h-6" />
          <p>Home</p>
        </div>
        <div className="px-4 py-2">
          {!showSearchInput ? (
            <>
              <div
                onClick={handleSearchClick}
                className="flex items-center gap-3 pl-4 cursor-pointer hover:text-green-400 transition-colors"
              >
                <Search className="w-6 h-6" />
                <p className="font-bold">Search</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 pl-4 ">
                <Search className="w-5 h-5 text-green-400" />
                <input
                  type="text"
                  placeholder="What do you want to listen to?"
                  className="flex-1 bg-[#2a2a2a] text-white rounded-full px-3 py-2 placeholder-gray-400 text-sm fold focus:outline-none focus:ring-2 focus:ring-green-400"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* button */}
                <button
                  onClick={handleClearSearch}
                  className="p-1 text-gray-700 rounded-full  transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-[#121212] h-[85%]  rounded">
        <div className="p-4 flex items-center justify-between">
          <div className=" flex items-center gap-3 ">
            {/* liberary */}
            <Library className="w-8 h-8" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3 ">
            <ArrowRight className="w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
            <Plus className=" w-5 h-5 cursor-pointer hover:text-green-400 transition-colors" />
          </div>
        </div>

        <div className="p-4  bg-[#242424] rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create Your first Playlist</h1>
          <p>It's easy, we'll help you</p>
          {/* button */}
          <button className="px-4 py-1.5 bg-white  text-[15px]  bg-white text-[15px]  text-black rounded-full mt-4 cursor-pointer ">
            Create Playlist
          </button>
        </div>
        <div className="p-4 bg-[$242424] rounded font-semibold flex flex-col items-start justify-start mt-4 pl-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We will keep you update on new episodes</p>
          {/* button */}

          <button className="px-4 py-1.5 bg-white  text-[15px]  bg-white text-[15px]  text-black rounded-full mt-4 cursor-pointer ">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
