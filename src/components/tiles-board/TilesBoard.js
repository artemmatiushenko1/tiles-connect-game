import { useEffect, useMemo, useState } from 'react';
import { TILE_STATE, TILES_GRID_SIZE, CLOSE_TILE_DELAY } from '../../constants';
import Tile from '../tile/Tile';
import './TilesBoard.css';
import createEmptyMatrix from '../../utils/createEmptyMatrix';
import generateTilesGrid from '../../utils/generateTilesGrid';

const TilesBoard = () => {
  const tilesGrid = useMemo(() => generateTilesGrid(), []);
  const [activeTiles, setActiveTiles] = useState([]);
  const [tilesState, setTilesState] = useState(createEmptyMatrix);
  const [isAbleToClick, setIsAbleToClick] = useState(true);

  useEffect(() => {
    if (activeTiles.length === 2) {
      const [firstCardProps, secondCardProps] = activeTiles;
      const { value: firstTileValue, cords: firstTileCords } = firstCardProps;
      const { value: secondTileValue, cords: secondTileCords } =
        secondCardProps;

      if (firstTileValue !== secondTileValue) {
        handleTilesDifferent(firstTileCords, secondTileCords);
      }

      setActiveTiles([]);
    }
  }, [activeTiles]);

  const onTileClickHandler = (x, y) => {
    if (tilesState[x][y] === TILE_STATE.OPENED || !isAbleToClick) return;

    setTilesState((prevState) => {
      const newState = [...prevState];
      newState[x][y] = TILE_STATE.OPENED;
      return newState;
    });

    if (activeTiles.length === 0 || activeTiles.length === 1) {
      setActiveTiles((prevState) => {
        return [...prevState, { cords: { x, y }, value: tilesGrid[x][y] }];
      });
    }
  };

  const handleTilesDifferent = (firstCardCords, secondCardCords) => {
    setIsAbleToClick(false);
    setTimeout(() => {
      setTilesState((prevState) => {
        const newState = [...prevState];
        newState[firstCardCords.x][firstCardCords.y] = TILE_STATE.CLOSED;
        newState[secondCardCords.x][secondCardCords.y] = TILE_STATE.CLOSED;
        return newState;
      });
      setIsAbleToClick(true);
    }, CLOSE_TILE_DELAY);
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${TILES_GRID_SIZE.COLS}, 1fr)`,
        gridTemplateRows: `repeat(${TILES_GRID_SIZE.ROWS}, 1fr)`,
      }}
    >
      {tilesGrid.map((row, i) => {
        return row.map((col, j) => (
          <Tile
            visible={tilesState[i][j] === TILE_STATE.OPENED}
            key={`${i}-${j}`}
            icon={tilesGrid[i][j]}
            onClick={onTileClickHandler}
            x={i}
            y={j}
          />
        ));
      })}
    </div>
  );
};

export default TilesBoard;
