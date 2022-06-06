import { TILES_GRID_SIZE, ICONS } from '../constants';

const generateTilesGrid = (
  rows = TILES_GRID_SIZE.ROWS,
  cols = TILES_GRID_SIZE.COLS,
  icons = ICONS
) => {
  const grid = [];
  const elements = [...icons, ...icons].sort(() => Math.random() - 0.5);

  for (let i = 0; i < rows; i++) {
    const row = elements.splice(0, cols);
    grid.push(row);
  }

  return grid;
};

export default generateTilesGrid;
