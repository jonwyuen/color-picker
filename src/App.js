import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteFrom from "./NewPaletteForm";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

const App = () => {
  const [palettes, setPalettes] = useState(seedColors);
  const findPalette = id => palettes.find(palette => palette.id === id);
  const savePalette = newPalette => setPalettes([...palettes, newPalette]);

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteFrom
            {...routeProps}
            palettes={palettes}
            savePalette={savePalette}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList {...routeProps} palettes={palettes} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            {...routeProps}
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      />
    </Switch>
  );
};

export default App;
