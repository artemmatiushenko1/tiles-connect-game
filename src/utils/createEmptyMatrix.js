import { TILES_GRID_SIZE, TILE_STATE } from '../constants';

const createEmptyMatrix = (
  rows = TILES_GRID_SIZE.ROWS,
  cols = TILES_GRID_SIZE.COLS
) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => TILE_STATE.CLOSED)
  );
};

export default createEmptyMatrix;
