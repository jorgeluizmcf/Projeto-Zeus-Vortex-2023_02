// src/App.js

import React from "react";
import { ToastProvider } from "./contexts/ToastContext";
import AppRouter from "./Router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={"en-gb"}
        >
          <AppRouter />
        </LocalizationProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
