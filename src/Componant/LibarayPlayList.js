import React from "react";

const LibarayPlayList = ({
  setCurrentsong,
  id,
  song,
  songs,
  audioRef,
  isPlay,
  setSongs,
}) => {
  // handel if chose the new song from libaray
  const setCurrentsongHandler = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentsong(selectedSong[0]);

    // check active or note state
    const checkedSong = songs.map((song) =>
      song.id === id ? { ...song, active: true } : { ...song, active: false }
    );
    setSongs(checkedSong);
  };
  //check if song is playing
  if (isPlay) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }
  return (
    <div
      onClick={setCurrentsongHandler}
      className={`List-container ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3> {song.name} </h3>
        <h4> {song.artist} </h4>
      </div>
    </div>
  );
};

export default LibarayPlayList;
