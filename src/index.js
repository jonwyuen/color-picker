import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { HistoryProvider } from "./context/HistoryContext";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
