import React, { useState, useRef } from "react";
import "./Styles/App.scss";
import Songs from "./Componant/Songs";
import Player from "./Componant/Player";
import data from "./data";
import LibarayList from "./Componant/LibarayList";
import Navbar from "./Componant/Navbar";
function App() {
  const [songs, setSongs] = useState(data());
  const [currentsong, setCurrentsong] = useState(songs[0]);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef(null);
  const [songInf, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libaryStatus, setLibaryStatus] = useState(false);

  // handler for time on state
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInf, currentTime: current, duration });
  };

  //handel when song feinsh work the next
  const songEndedHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentsong.id);
    await setCurrentsong(songs[(currentIndex + 1) % songs.length]);
    if (isPlay) audioRef.current.play();
  };

  return (
    <div className={`App ${libaryStatus ? "libray-active" : ""}`}>
      <Navbar libaryStatus={libaryStatus} setLibaryStatus={setLibaryStatus} />
      <Player currentsong={currentsong} />
      <Songs
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        currentsong={currentsong}
        songInf={songInf}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentsong={setCurrentsong}
      />
      <LibarayList
        songs={songs}
        setCurrentsong={setCurrentsong}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlay={isPlay}
        libaryStatus={libaryStatus}
        setLibaryStatus={setLibaryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentsong.audio}
        ref={audioRef}
        onEnded={songEndedHandler}
        preload="auto"
      />
    </div>
  );
}
export default App;
