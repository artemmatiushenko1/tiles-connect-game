import { useEffect, useState } from 'react';
import {
  TILE_STATE,
  TILES_GRID_SIZE,
  CLOSE_TILE_DELAY,
  BASE_SCORE_MULTIPLER,
  BASE_SCORE,
  MAX_TILES_TO_REVEAL,
} from '../../constants.js';
import Tile from '../tile/Tile.jsx';
import createEmptyMatrix from '../../utils/createEmptyMatrix.js';
import generateTilesGrid from '../../utils/generateTilesGrid.js';
import shouldEndGame from '../../utils/shouldEndGame.js';
import './TilesBoard.css';

const TilesBoard = ({ gameAppEventService }) => {
  const [tilesGrid, setTilesGrid] = useState(generateTilesGrid);
  const [activeTiles, setActiveTiles] = useState([]);
  const [tilesState, setTilesState] = useState(createEmptyMatrix);
  const [isAbleToClick, setIsAbleToClick] = useState(true);
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(BASE_SCORE_MULTIPLER);

  useEffect(() => {
    if (activeTiles.length === MAX_TILES_TO_REVEAL) {
      const [firstCardProps, secondCardProps] = activeTiles;
      const { value: firstTileValue, cords: firstTileCords } = firstCardProps;
      const { value: secondTileValue, cords: secondTileCords } =
        secondCardProps;

      if (firstTileValue !== secondTileValue) {
        setScoreMultiplier(BASE_SCORE_MULTIPLER);
        handleTilesDifferent(firstTileCords, secondTileCords);
      } else {
        setScore((prevScore) => prevScore + BASE_SCORE * scoreMultiplier);
        setScoreMultiplier(
          (prevMultiplier) => prevMultiplier + BASE_SCORE_MULTIPLER
        );
      }

      setActiveTiles([]);
    }
  }, [activeTiles]);

  useEffect(() => {
    gameAppEventService?.fire(gameAppEventService.GameAppEvent.SCORE_UPDATE, {
      detail: { score },
    });
  }, [score]);

  useEffect(() => {
    const handleRestart = () => {
      setScore(0);
      setActiveTiles([]);
      setTilesGrid(generateTilesGrid());
      setTilesState(createEmptyMatrix());
      setScoreMultiplier(BASE_SCORE_MULTIPLER);
    };

    gameAppEventService?.subscribe(
      gameAppEventService.GameAppEvent.RESTART,
      handleRestart
    );

    gameAppEventService.fire(gameAppEventService.GameAppEvent.MOUNT);

    return () => {
      gameAppEventService?.unsubscribe(
        gameAppEventService.GameAppEvent.RESTART,
        handleRestart
      );

      gameAppEventService.fire(gameAppEventService.GameAppEvent.UNMOUNT);
    };
  }, []);

  useEffect(() => {
    if (shouldEndGame(tilesState)) {
      gameAppEventService?.fire(gameAppEventService.GameAppEvent.END);
    }
  }, [tilesState]);

  const handleTileClick = (x, y) => {
    if (tilesState[x][y] === TILE_STATE.OPENED || !isAbleToClick) return;

    setTilesState((prevState) => {
      const newState = [...prevState];
      newState[x][y] = TILE_STATE.OPENED;
      return newState;
    });

    if (activeTiles.length < MAX_TILES_TO_REVEAL) {
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
        gridTemplateColumns: `repeat(${TILES_GRID_SIZE.COLS}, 90px)`,
        gridTemplateRows: `repeat(${TILES_GRID_SIZE.ROWS}, 90px)`,
      }}
    >
      {tilesGrid.map((row, i) => {
        return row.map((col, j) => (
          <Tile
            x={i}
            y={j}
            icon={col}
            key={`${i}-${j}`}
            onClick={handleTileClick}
            visible={tilesState[i][j] === TILE_STATE.OPENED}
          />
        ));
      })}
    </div>
  );
};

export default TilesBoard;
