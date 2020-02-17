import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
import Page from "./components/Page";
import seedColors from "./seedColors";
import { PalettesProvider } from "./context/PalettesContext";
import { generatePalette } from "./colorHelpers";

const App = () => {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const findPalette = id => palettes.find(palette => palette.id === id);
  // const savePalette = newPalette => setPalettes([...palettes, newPalette]);

  // useEffect(() => {
  //   window.localStorage.setItem("palettes", JSON.stringify(palettes));
  // }, [palettes]);

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <PalettesProvider>
            <Page {...routeProps}>
              <NewPaletteForm {...routeProps} />
            </Page>
          </PalettesProvider>
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PalettesProvider>
            <Page {...routeProps}>
              <PaletteList {...routeProps} />
            </Page>
          </PalettesProvider>
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Page {...routeProps}>
            <Palette
              palette={generatePalette(findPalette(routeProps.match.params.id))}
            />
          </Page>
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <Page {...routeProps}>
            <SingleColorPalette
              {...routeProps}
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                findPalette(routeProps.match.params.paletteId)
              )}
            />
          </Page>
        )}
      />
      <Route
        render={routeProps => (
          <Page {...routeProps}>
            <PalettesProvider>
              <PaletteList {...routeProps} />
            </PalettesProvider>
          </Page>
        )}
      />
    </Switch>
  );
};

export default App;
