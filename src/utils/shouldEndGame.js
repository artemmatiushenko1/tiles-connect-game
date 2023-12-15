import { TILE_STATE } from '../constants';

const shouldEndGame = (tilesState) => {
  return tilesState
    .flatMap((item) => item)
    .every((item) => item === TILE_STATE.OPENED);
};

export default shouldEndGame;
