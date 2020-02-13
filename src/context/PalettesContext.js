import React, { createContext, useEffect, useReducer } from "react";
import SAVED_PALETTES from "../constants";

export const PalettesContext = createContext();
export const PalettesDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PALETTE":
      return [...state, action.newPalette];
    case "DELETE_PALETTE":
      return state.filter(p => p.id !== action.id);
    case "RESTORE_PALETTES":
      return [...state, SAVED_PALETTES];
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
      <PalettesDispatchContext.Provider value={dispatch}>
        {children}
      </PalettesDispatchContext.Provider>
    </PalettesContext.Provider>
  );
};
