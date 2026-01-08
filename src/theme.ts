import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

// Dark Theme Options
export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#D0BCFF",
      light: "#EADDFF",
      dark: "#381E72",
      contrastText: "#381E72",
    },
    secondary: {
      main: "#CCC2DC",
      light: "#E8DEF8",
      dark: "#332D41",
      contrastText: "#332D41",
    },
    background: {
      default: "#000000",
      paper: "#141218",
    },
    text: {
      primary: "#E6E1E5",
      secondary: "#CAC4D0",
    },
    divider: "#49454F",
  },
  typography: {
    fontFamily: ["'Roboto Flex'", "'Inter'", "sans-serif"].join(","),
  },
  shape: { borderRadius: 24 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(20, 18, 24, 0.7)",
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(73, 69, 79, 0.5)",
          color: "#E6E1E5",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 100 },
        contained: { backgroundColor: "#D0BCFF", color: "#381E72" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundColor: "#2B2930", borderRadius: 24 },
      },
    },
  },
};

// Light Theme Options
export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6750A4", // MD3 Primary Key
      light: "#EADDFF",
      dark: "#21005D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#625B71",
      light: "#E8DEF8",
      dark: "#1D192B",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFBFE",
      paper: "#F7F2FA",
    },
    text: {
      primary: "#1D1B20",
      secondary: "#49454E",
    },
    divider: "#CAC4D0",
  },
  typography: {
    fontFamily: ["'Roboto Flex'", "'Inter'", "sans-serif"].join(","),
  },
  shape: { borderRadius: 24 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 251, 254, 0.8)",
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          color: "#1D1B20",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 100 },
        contained: { backgroundColor: "#6750A4", color: "#FFFFFF" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundColor: "#FFFFFF", borderRadius: 24 },
      },
    },
  },
};

export const darkTheme = responsiveFontSizes(createTheme(darkThemeOptions));
export const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions));

export default darkTheme;
