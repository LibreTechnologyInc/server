import React from "react";
import { Tunnels } from "./features/tunnels/Tunnels";
import "./App.css";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Route component={Tunnels} />
      </header>
    </div>
  );
}

export default App;
