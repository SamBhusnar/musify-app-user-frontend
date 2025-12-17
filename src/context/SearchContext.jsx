import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { PlayerContext } from "./PlayerContext";
export const SearchContext = createContext(null);
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context) {
    return context;
  }
  throw new Error("useSearch must be used within a SearchProvider");
};
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ songs: [], albums: [] }); //[{},{}]
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { songsData, albumsData } = useContext(PlayerContext);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ songs: [], albums: [] });
    }
    const query = searchQuery.toLowerCase().trim();
    const filetredSongs = songsData.filter((song) => {
      if (searchQuery.trim() === "") return false;
      return (
        song.name.toLowerCase().includes(query) ||
        song.description.toLowerCase().includes(query)
      );
    });
    // filter albums
    const filteredAlbums = albumsData.filter((album) => {
      if (searchQuery.trim() === "") return false;
      return (
        album.name.toLowerCase().includes(query) ||
        album.description.toLowerCase().includes(query)
      );
    });
    setSearchResults({ songs: filetredSongs, albums: filteredAlbums });
  }, [searchQuery, songsData, albumsData]);
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchActive(false);
    setSearchResults({ songs: [], albums: [] });
  };
  const contextValue = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchActive,
    setIsSearchActive,
    clearSearch,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
