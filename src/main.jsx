import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import App from "./App.jsx";
import "./index.css";
// import { AppProvider } from "./contextApi/contaxtApi.js";
import { AppProvider } from "./contextApi/contaxtApi.jsx";
import { SnackbarProvider } from "notistack";
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);
