import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import LibarayPlayList from "./LibarayPlayList";

const LibarayList = ({
  setCurrentsong,
  songs,
  audioRef,
  isPlay,
  setSongs,
  libaryStatus,
  setLibaryStatus,
}) => {
  return (
    <div
      className={`LibarayList-container  ${
        libaryStatus ? "active-libary" : ""
      }`}
    >
      <div className="felx-head">
        <h1>Libaray</h1>
        <button onClick={() => setLibaryStatus(!libaryStatus)}>
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: "2rem" }} />
        </button>
      </div>

      <div className="libarary-player">
        {songs.map((song) => (
          <LibarayPlayList
            song={song}
            songs={songs}
            setCurrentsong={setCurrentsong}
            key={song.id}
            id={song.id}
            audioRef={audioRef}
            isPlay={isPlay}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default LibarayList;
