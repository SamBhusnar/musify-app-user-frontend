import { createContext, useEffect, useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext";
import axios from "axios";

export const PlayerContext = createContext(null);
export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const { user, token, getAuthHeaders } = useAuth();

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs`, {
        headers: getAuthHeaders(),
      });
      console.log(response);
      const songs = response.data.songs || [];
      setSongsData(songs);
    } catch (e) {
      console.error(e);
      setSongsData([]);
    }
  };
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/albums`, {
        headers: getAuthHeaders(),
      });
      console.log(response);
      const albums = response.data.albums || [];
      setAlbumsData(albums);
    } catch (e) {
      console.error(e);
      setAlbumsData([]);
    }
  };
  const contextValue = {
    getSongsData,
    getAlbumsData,
    songsData,
    albumsData,
  };

  // effect hook to call getAlbumsData when user changes
  useEffect(() => {
    if(user && token){
      getAlbumsData();
      getSongsData();
    }
  }, [user, token]);
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
