import { TILES_GRID_SIZE, ICONS, MAX_TILES_TO_REVEAL } from '../constants';

const generateTilesGrid = (
  rows = TILES_GRID_SIZE.ROWS,
  cols = TILES_GRID_SIZE.COLS,
  icons = ICONS
) => {
  const grid = [];
  const targetIconsCount = (rows * cols) / MAX_TILES_TO_REVEAL;
  const iconsSlice = icons.slice(0, targetIconsCount);
  const elements = [...iconsSlice, ...iconsSlice].sort(
    () => Math.random() - 0.5
  );

  for (let i = 0; i < rows; i++) {
    const row = elements.splice(0, cols);
    grid.push(row);
  }

  return grid;
};

export default generateTilesGrid;
