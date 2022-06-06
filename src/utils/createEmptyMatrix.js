import { TILES_GRID_SIZE } from '../constants';

const createEmptyMatrix = (
  rows = TILES_GRID_SIZE.ROWS,
  cols = TILES_GRID_SIZE.COLS
) => {
  return new Array(rows).fill(0).map((row) => new Array(cols).fill(0, 0, cols));
};

export default createEmptyMatrix;
