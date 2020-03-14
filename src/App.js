import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";
import Page from "./components/Page";
import { PalettesProvider } from "./context/PalettesContext";

const App = () => {
  return (
    <PalettesProvider>
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={() => (
            <Page>
              <NewPaletteForm />
            </Page>
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <Page>
              <PaletteList />
            </Page>
          )}
        />

        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Page>
              <Palette {...routeProps} />
            </Page>
          )}
        />

        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <Page>
              <SingleColorPalette {...routeProps} />
            </Page>
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <Page>
              <PaletteList />
            </Page>
          )}
        />
      </Switch>
    </PalettesProvider>
  );
};

export default App;
