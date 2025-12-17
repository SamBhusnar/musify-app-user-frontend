import { createContext, useEffect, useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext";
import axios from "axios";
import { useRef } from "react";

export const PlayerContext = createContext(null);
export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const { user, token, getAuthHeaders } = useAuth();
  const [track, setTtrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState();
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };
  const playWithId = async (id) => {
    songsData.map((song) => {
      if (song._id === id) {
        setTtrack(song);
      }
    });
    await audioRef.current?.play();
    setPlayStatus(true);
  };
  const previous = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index > 0) {
        setTtrack(songsData[index - 1]);
        await audioRef.current?.play();
        setPlayStatus(true);
      }
    });
  };
  const next = async () => {
    songsData.map(async (item, index) => {
      if (track._id === item._id && index < songsData.length - 1) {
        setTtrack(songsData[index + 1]);
        await audioRef.current?.play();
        setPlayStatus(true);
      }
    });
  };
  const seekSong = async (event) => {
    audioRef.current.currentTime=(event.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current?.duration;
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs`, {
        headers: getAuthHeaders(),
      });
      console.log(response);
      const songs = response.data.songs || [];
      setSongsData(songs);
      if (songs.length > 0) {
        console.log(songs, "setting track");

        setTtrack(songs[0]);
        console.log(track);
      }
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
    track,
    setTtrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    audioRef,
    seekBg,
    seekBar,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  // effect hook to call getAlbumsData when user changes
  useEffect(() => {
    if (user && token) {
      getAlbumsData();
      getSongsData();
    }
  }, [user, token]);
  // setup adio listen lister
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    const updateSeekBar = () => {
      if (seekBar.current && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = Math.floor(progress) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };
    const handleLoadedMetadata = () => {
      if (seekBar.current) {
        seekBar.current.style.width = "0%";
      }
    };
    // add event listeners
    audio.addEventListener("timeupdate", updateSeekBar);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      // remove event listeners
      audio.removeEventListener("timeupdate", updateSeekBar);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [track]);
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
