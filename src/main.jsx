import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store"; // make sure to import the store correctly
import App from "./App";
import "./index.css"; // or use your preferred CSS file

// Render the app, wrapping it with the Provider to pass in the Redux store
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
