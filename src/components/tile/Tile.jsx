import './Tile.css';

const Tile = ({ icon, onClick, x, y, visible }) => {
  return (
    <div
      className={`tile ${visible ? 'tile--active' : ''}`}
      onClick={onClick.bind(null, x, y)}
    >
      <div className="tile-inner">
        <div className="tile-front">&nbsp;</div>
        <div className="tile-back">{icon}</div>
      </div>
    </div>
  );
};

export default Tile;
