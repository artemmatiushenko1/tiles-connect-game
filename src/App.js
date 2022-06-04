import { useEffect, useRef, useState } from 'react';
import './App.css';
import Tile from './Tile';

const icons = [
  '🌷',
  '🥐',
  '🍟',
  '🥚',
  '😀',
  '🤩',
  '🎁',
  '🎨',
  '🎃',
  '🐱',
  '🙂',
  '😎',
  '🤗',
  '😗',
  '🏀',
];

const rowsCount = 6;
const columnsCount = 5;

const generateGrid = () => {
  const grid = [];
  const elements = [...icons, ...icons].sort(() => Math.random() - 0.5);

  for (let i = 0; i < rowsCount; i++) {
    const row = elements.splice(0, columnsCount);
    grid.push(row);
  }

  return grid;
};

const createEmptyMatrix = (rows, columns) => {
  return new Array(rows)
    .fill(0)
    .map((row) => new Array(columns).fill(0, 0, columns));
};

const CARD_STATE = {
  OPENED: 1,
  CLOSED: 0,
};

const App = () => {
  const grid = useRef(generateGrid());
  const [activeCards, setActiveCards] = useState([]);
  const [openedCards, setOpenedCards] = useState(
    createEmptyMatrix.bind(null, grid.current.length, grid.current[0].length)
  );
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (activeCards.length === 2) {
      const [firstCardCords, secondCardCords] = activeCards;
      const firstCardValue = grid.current[firstCardCords.x][firstCardCords.y];
      const secondCardValue =
        grid.current[secondCardCords.x][secondCardCords.y];

      if (firstCardValue === secondCardValue) {
        setOpenedCards((prevState) => {
          const newState = [...prevState];
          newState[firstCardCords.x][firstCardCords.y] = CARD_STATE.OPENED;
          newState[secondCardCords.x][secondCardCords.y] = CARD_STATE.OPENED;
          return newState;
        });
        setActiveCards([]);
      } else {
        setFlag(false);
        setTimeout(() => {
          setOpenedCards((prevState) => {
            const newState = [...prevState];
            newState[firstCardCords.x][firstCardCords.y] = CARD_STATE.CLOSED;
            newState[secondCardCords.x][secondCardCords.y] = CARD_STATE.CLOSED;
            setFlag(true);
            return newState;
          });
        }, 1000);
        setActiveCards([]);
      }
    }
  }, [activeCards]);

  const onCardClickHandler = (x, y) => {
    if (openedCards[x][y] === 1 || !flag) return;

    setOpenedCards((prevState) => {
      const newState = [...prevState];
      newState[x][y] = CARD_STATE.OPENED;
      return newState;
    });

    if (activeCards.length === 0) {
      setActiveCards((prevState) => {
        return [...prevState, { x, y }];
      });
    }

    if (activeCards.length === 1) {
      setActiveCards((prevState) => {
        return [...prevState, { x, y }];
      });
    }

    console.log({ x, y, value: grid.current[x][y] });
  };

  const generateTiles = () => {
    const result = grid.current.map((row, i) => {
      return row.map((item, j) => (
        <Tile
          visible={openedCards[i][j] === CARD_STATE.OPENED}
          key={`${i}-${j}`}
          icon={grid.current[i][j]}
          onClick={onCardClickHandler}
          x={i}
          y={j}
        />
      ));
    });

    return result;
  };

  return (
    <div className="App">
      <div className="grid">{generateTiles()}</div>
    </div>
  );
};

export default App;
