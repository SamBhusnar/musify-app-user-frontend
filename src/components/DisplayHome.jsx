import React from "react";
import { useAuth } from "../context/AuthContext";

function DisplayHome() {
  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl ">Featured Charts</h1>
        <div className="flex overflow-auto">Displaying the albums</div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl ">Today's biggest hits</h1>
        <div className="flex overflow-auto">Displaying the Songs</div>
      </div>
    </>
  );
}

export default DisplayHome;
