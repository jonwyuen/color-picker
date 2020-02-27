import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
import Page from "./components/Page";
import { PalettesProvider } from "./context/PalettesContext";
import { HistoryProvider } from "./context/HistoryContext";

const App = () => {
  console.log("App");
  return (
    <HistoryProvider>
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
            <PalettesProvider>
              <Page {...routeProps}>
                <Palette {...routeProps} />
              </Page>
            </PalettesProvider>
          )}
        />

        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <PalettesProvider>
              <Page {...routeProps}>
                <SingleColorPalette {...routeProps} />
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
      </Switch>
    </HistoryProvider>
  );
};

export default App;
