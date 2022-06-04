import React from 'react';
import './Tile.css';

const Tile = ({ icon, onClick, x, y, visible }) => {
  // return (
  //   <div
  //     className={`grid-item ${!visible ? 'grid-item--hidden' : ''}`}
  //     onClick={onClick.bind(null, x, y)}
  //   >
  //     <div className="grid-item__icon">{icon}</div>
  //   </div>
  // );

  return (
    <div
      class={`flip-card ${visible ? 'flip-card--active' : ''}`}
      onClick={onClick.bind(null, x, y)}
    >
      <div class="flip-card-inner">
        <div class="flip-card-front">&nbsp;</div>
        <div class="flip-card-back">{icon}</div>
      </div>
    </div>
  );
};

export default Tile;
