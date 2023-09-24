import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Songs = ({
  setIsPlay,
  isPlay,
  setSongInfo,
  songInf,
  audioRef,
  currentsong,
  songs,
  setSongs,
  setCurrentsong,
}) => {
  //Useffect

  const activeLIbrayHandler = (nextPrev) => {
    // Update the active state of songs
    const checkedSong = songs.map((song) =>
      song.id === currentsong.id
        ? { ...song, active: true }
        : { ...song, active: false }
    );
    setSongs(checkedSong);
    //check if song is playing
    if (isPlay) audioRef.current.play();
  };

  // handler of play current
  const playHandler = () => {
    if (isPlay) {
      audioRef.current.pause();
      setIsPlay(!isPlay);
    } else {
      audioRef.current.play();
      setIsPlay(!isPlay);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // change the current song value in input
  const changeInputHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInf, currentTime: e.target.value });
  };

  // handel to change songe with icon back or forward
  const skipSongHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentsong.id);
    // Skip forward to the next song
    if (direction === "skip-forward") {
      await setCurrentsong(songs[(currentIndex + 1) % songs.length]);
      activeLIbrayHandler(songs[(currentIndex + 1) % songs.length]);
    }
    // Skip back to the previous song
    if (direction === "skip-back") {
      // If the current index is 0, wrap around to the last song in the list
      if (currentIndex === 0) {
        await setCurrentsong(songs[songs.length - 1]);
        activeLIbrayHandler(songs[songs.length - 1]);
      } else {
        await setCurrentsong(songs[(currentIndex - 1) % songs.length]);
        activeLIbrayHandler(songs[(currentIndex - 1) % songs.length]);
      }
    }
  };
  return (
    <div className="Songs-container">
      <div className="time-control">
        <p>{getTime(songInf.currentTime)}</p>
        <input
          min={0}
          max={songInf.duration || 0}
          value={songInf.currentTime}
          onChange={changeInputHandler}
          type="range"
        />
        <p>{songInf.duration ? getTime(songInf.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleDoubleLeft}
          onClick={() => {
            skipSongHandler("skip-back");
          }}
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className="play"
          size="2x"
          icon={isPlay ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleDoubleRight}
          onClick={() => {
            skipSongHandler("skip-forward");
          }}
        />
      </div>
    </div>
  );
};

export default Songs;
