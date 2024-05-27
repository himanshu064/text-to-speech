import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import AppProvider from "./contextApi/contextApi.jsx";
import { SnackbarProvider } from "notistack";

// Define your theme object
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Pass the theme object to the ThemeProvider */}
    <ThemeProvider theme={theme}>
      <AppProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
