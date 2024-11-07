// src/components/Player.js

import React from 'react';

const Player = ({ audioUrl }) => {
  return (
    <div className="player-container">
      <audio controls>
        <source src={audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;
