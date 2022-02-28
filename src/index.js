import { AppProvider } from "./AppContext.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'mapbox-gl/dist/mapbox-gl.css';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
