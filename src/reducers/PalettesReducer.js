import seedColors from "../seedColors";
import { ADD_PALETTE, DELETE_PALETTE, RESTORE_PALETTES } from "../constants";

export default (state, action) => {
  switch (action.type) {
    case ADD_PALETTE:
      return [...state, action.newPalette];
    case DELETE_PALETTE:
      return state.filter(p => p.id !== action.id);
    case RESTORE_PALETTES:
      return [...state, ...seedColors];
    default:
      return state;
  }
};
