import { Dot, Clock } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useState } from "react";
import { assets } from "../assets/assets.js";

function DisplayAlbum({ album }) {
  console.log("album details : ", album);
  const { id } = useParams();
  const { albumsData, songsData } = useContext(PlayerContext);

  console.log(albumsData);

  return albumsData ? (
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={album?.imageUrl} alt="album image" className="w-48 rounded" />
        <div className="flex flex-col ">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album?.name}</h2>
          <h4>{album?.description}</h4>
          <p className="mt-1">
            <img
              src={assets.logo}
              alt="logo"
              className="inline-block w-5 mr-1"
            />
            <b>Musify</b> <Dot className="inline-block  " /> 1,23,456 likes{" "}
            <Dot className="inline-block  " /> <b>6 songs</b>{" "}
            <Dot className="inline-block  " /> about 2 hrs 30 min.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <Clock className=" w-4" />
      </div>
      <hr />
      {songsData
        .filter((song) => {
          return song?.album === album?.name;
        })
        .map((item, index) => {
          return (
            <div
              className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center hover:bg-[#ffffff2b] cursor-pointer text-[#e7e7e7] "
              key={index}
            >
              <p className="text-white">
                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>{" "}
                <img
                  src={item.imageUrl}
                  alt="album image"
                  className="inline w-10 mr-5"
                />
                {item.name}
              </p>
              <p className="text-[15px]">{album.name}</p>
              <p className="text-[15px] hidden sm:block"> 5 days ago</p>
              <p className="text-[15px] hidden sm:block">{"            "} {item.duration}</p>
            </div>
          );
        })}
    </>
  ) : null;
}

export default DisplayAlbum;
