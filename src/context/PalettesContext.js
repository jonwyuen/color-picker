import React, { createContext, useEffect, useReducer } from "react";
import { SAVED_PALETTES } from "../constants";
import PalettesReducer from "../reducers/PalettesReducer";

export const PalettesContext = createContext();
export const DispatchContext = createContext();

export const PalettesProvider = ({ children }) => {
  const [palettes, dispatch] = useReducer(PalettesReducer, SAVED_PALETTES);
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
