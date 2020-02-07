import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteFrom from "./NewPaletteForm";
import Page from "./Page";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

const App = () => {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const findPalette = id => palettes.find(palette => palette.id === id);
  const savePalette = newPalette => setPalettes([...palettes, newPalette]);
  const deletePalette = id =>
    setPalettes(palettes => palettes.filter(palette => palette.id !== id));

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);
  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <Page {...routeProps}>
            <NewPaletteFrom
              {...routeProps}
              palettes={palettes}
              savePalette={savePalette}
            />
          </Page>
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <Page {...routeProps}>
            <PaletteList
              {...routeProps}
              palettes={palettes}
              deletePalette={deletePalette}
            />
          </Page>
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
    </Switch>
  );
};

export default App;
