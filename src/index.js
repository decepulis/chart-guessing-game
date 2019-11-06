import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import * as serviceWorker from "./serviceWorker";

const WebFont = require("webfontloader");

WebFont.load({
  google: {
    families: [
      "Playfair+Display:900i&display=swap",
      "Open+Sans:600,800&display=swap"
    ]
  },
  timeout: 5000
});

const initHue = Math.random() * 360;
const initSaturation = 100;
const initLightness = 85;
const initTheme = {
  primaryColor: `hsl(${initHue}, ${initSaturation}%, ${initLightness}%)`,
  secondaryColor: `hsl(${initHue + 120}, ${initSaturation}%, ${50}%)`,
  tertiaryColor: `hsl(${initHue - 120}, ${initSaturation}%, ${50}%)`,
  black: "#333",
  gray: "#666"
};

const Index = () => (
  <ThemeProvider theme={initTheme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(<Index />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
