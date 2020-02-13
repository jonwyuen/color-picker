import seedColors from "./seedColors";

export const DRAWER_WIDTH = 400;
export const SAVED_PALETTES =
  JSON.parse(window.localStorage.getItem("palettes")) || seedColors;
