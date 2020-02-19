import React, { createContext, useEffect, useReducer } from "react";
import seedColors from "../seedColors";
import { SAVED_PALETTES } from "../constants";

export const PalettesContext = createContext();
export const DispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PALETTE":
      return [...state, action.newPalette];
    case "DELETE_PALETTE":
      return state.filter(p => p.id !== action.id);
    case "RESTORE_PALETTES":
      return [...state, ...seedColors];
    default:
      return state;
  }
};

export const PalettesProvider = ({ children }) => {
  const [palettes, dispatch] = useReducer(reducer, SAVED_PALETTES);
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  return (
    <PalettesContext.Provider value={palettes}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </PalettesContext.Provider>
  );
};
