import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
  ListMusic,
  Mic,
  Minimize2,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Speaker,
  Volume2,
} from "lucide-react";
import { Pause } from "lucide-react";

function Player() {
  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    next,
    seekSong,
    track,
    time,
    previous,
  } = useContext(PlayerContext);
  console.log("tracking", track);

  return track ? (
    <div className="h-[10%] bg-black flex items-center justify-between text-white p-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.imageUrl} alt="" className="w-12 " />
        <div>
          <p>{track.name}</p>
          <p>{track.description.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <Shuffle className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
          <SkipBack
            onClick={previous}
            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
          />
          {playStatus ? (
            <Pause
              className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
              onClick={pause}
            />
          ) : (
            <Play
              className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
              onClick={play}
            />
          )}
          <SkipForward
            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
            onClick={next}
          />
          <Repeat className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 w-0 bg-green-800 rounded-full    border-none "
            />
          </div>
          <p>{track.duration}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <ListMusic className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Mic className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Speaker className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Volume2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
        <Minimize2 className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors" />
      </div>
    </div>
  ) : null;
}

export default Player;
