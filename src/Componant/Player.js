import React from "react";

const Player = ({ currentsong: { name, cover, artist } }) => {
  return (
    <div className="player-container">
      <img src={cover} alt={name} />
      <h1> {name} </h1>
      <h3> {artist} </h3>
    </div>
  );
};

export default Player;
