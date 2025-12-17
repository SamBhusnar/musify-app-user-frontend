import React from "react";
import { useAuth } from "../context/AuthContext";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";

import { useContext } from "react";
import SongItem from "./SongItem";


function DisplayHome() {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl ">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => {
            return (
              <AlbumItem
                key={index}
                name={item.name}
                desc={item.description}
                id={item._id}
                image={item.imageUrl}
              />
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl ">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {/* songs data */}

          {songsData?.map((item, index) => {
            return (
              <SongItem
                key={index}
                name={item.name}
                desc={item.description}
                id={item._id}
                image={item.imageUrl}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DisplayHome;
