import React from "react";
import { useSearch } from "../context/SearchContext";
import { Music } from "lucide-react";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import { SearchIcon } from "lucide-react";

function Search() {
  const { searchQuery, searchResults, isSearchActive } = useSearch();
  const { songs, albums } = searchResults;
  const totalResults = songs.length + albums.length;
  console.log("songs : ", songs.length);
  console.log("albums : ", albums.length);
  if (totalResults === 0 && isSearchActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">Try searching for something else.</p>
      </div>
    );
  }

  if (!isSearchActive) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <SearchIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Search for Music</h2>
        <p className="text-gray-400">
          Start typing to search for songs and albums
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 ">
      {/* search results header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-2">
          <p className="text-gray-400">
            Found {totalResults} result{totalResults !== 1 ? "s" : ""} for :{" "}
            {searchQuery}
          </p>
        </h1>
      </div>
      {/* Songs section */}
      {songs.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 ">
            <Music className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Songs</h2>

            <span className="text-gray-400">{songs.length}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
            {songs.map((song, i) => {
              return (
                <SongItem
                  key={i}
                  name={song.name}
                  desc={song.description}
                  id={song._id}
                  image={song.imageUrl}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* albums section */}
      {albums.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 ">
            <Music className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Albums</h2>
            <span className="text-gray-400">{albums.length}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 ">
            {albums.map((album, i) => (
              <SongItem
                key={i}
                name={album.name}
                desc={album.description}
                id={album._id}
                image={album.imageUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
