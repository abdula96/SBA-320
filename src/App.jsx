// src/App.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Rick and Morty App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/SBA320/characters">Characters</Link>
          </li>
          <li>
            <Link to="/SBA320/locations">Locations</Link>
          </li>
          <li>
            <Link to="/SBA320/episodes">Episodes</Link>
          </li>
        </ul>
      </nav>
      {/* This is where the active route's component will be rendered */}
      <Outlet />
    </div>
  );
};

export default App;
