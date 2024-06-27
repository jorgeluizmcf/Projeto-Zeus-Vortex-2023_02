// src/App.js

import React from "react";
import { ToastProvider } from "./contexts/ToastContext";
import AppRouter from "./Router";

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </div>
  );
}

export default App;
