import seedColors from "./seedColors";

export const DRAWER_WIDTH = 400;
export const SAVED_PALETTES =
  JSON.parse(window.localStorage.getItem("palettes")) || seedColors;
export const ADD_PALETTE = "ADD_PALETTE";
export const DELETE_PALETTE = "DELETE_PALETTE";
export const RESTORE_PALETTES = "RESTORE_PALETTES";
