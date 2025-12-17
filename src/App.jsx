import Display from "./components/Display";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import AuthWrapper from "./components/AuthWrapper";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { useContext } from "react";
import { Play } from "lucide-react";
import { PlayerContext } from "./context/PlayerContext";
function App() {
 const {audioRef,track}= useContext(PlayerContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AuthWrapper>
        <div className="h-screen bg-black">
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          {/* Player compoent */}
          <Player />
          <audio 
          ref={audioRef}
          src={track?track.fileUrl:""}

          preload="auto"
          ></audio>
        </div>
      </AuthWrapper>
    </>
  );
}

export default App;
