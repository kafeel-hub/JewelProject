// src/theme.js
import { createTheme } from "@mui/material/styles";

const getTheme = (mode, primaryColor, secondaryColor, fontFamily) =>
  createTheme({
    palette: {
      mode: mode || "light",
      primary: {
        main: primaryColor || "#1976d2",
      },
      secondary: {
        main: secondaryColor || "#9c27b0",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#f4f6f8",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
        selected:"dark" ?"inherited":"rgb(239 248 244)",
        newColor:"dark"?"#919EAB":"gray"

      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#1C252E",
        secondary: mode === "dark" ? "#919EAB" : "#000000",
        tertiary: "#ffd800",
        quaternary: "#ffffff",
        muted: "#919EAB",
        selected:"#00a76f",
        hover: mode === "dark" ? "#4b4a4a" : "#ececec",

      },
    },
    typography: {
      fontFamily: fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

export default getTheme;
