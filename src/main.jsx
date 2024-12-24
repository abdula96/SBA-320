// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import App from "./App";
import CharactersPage from "./pages/CharactersPage";
import LocationsPage from "./pages/LocationsPage";
import EpisodesPage from "./pages/EpisodesPage";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/SBA320" element={<App />}>
          <Route path="/SBA320/characters" element={<CharactersPage />} />
          <Route path="/SBA320/locations" element={<LocationsPage />} />
          <Route path="/SBA320/episodes" element={<EpisodesPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
