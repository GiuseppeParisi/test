
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createRoot } from "react-dom/client"; 

const root = document.getElementById("root");


const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
