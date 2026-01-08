import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

// Dark Theme - "Midnight Violet"
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
      default: "#141218", // MD3 Dark Background
      paper: "#1D1B20", // MD3 Dark Surface
    },
    text: {
      primary: "#E6E1E5",
      secondary: "#CAC4D0",
    },
    divider: "rgba(147, 143, 153, 0.25)",
  },
  typography: {
    fontFamily: ["'Outfit'", "'Inter'", "sans-serif"].join(","),
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
  },
  shape: { borderRadius: 28 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(20, 18, 24, 0.8)",
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, textTransform: "none", fontWeight: 600 },
        contained: { boxShadow: "none", "&:hover": { boxShadow: "0 4px 12px rgba(208, 188, 255, 0.3)" } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 28,
        },
      },
    },
  },
};

// Light Theme - "Soft Lavender"
export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6750A4",
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
      default: "#FDFBFF", // Ultra clean white with purple tint
      paper: "#F4F2F7", // Soft tinted surface
    },
    text: {
      primary: "#1C1B1F",
      secondary: "#49454F",
    },
    divider: "rgba(121, 116, 126, 0.15)",
  },
  typography: {
    fontFamily: ["'Outfit'", "'Inter'", "sans-serif"].join(","),
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
  },
  shape: { borderRadius: 28 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(253, 251, 255, 0.8)",
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          color: "#1C1B1F",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, textTransform: "none", fontWeight: 600 },
        contained: { boxShadow: "none", "&:hover": { boxShadow: "0 4px 12px rgba(103, 80, 164, 0.2)" } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          borderRadius: 28,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        },
      },
    },
  },
};

export const darkTheme = responsiveFontSizes(createTheme(darkThemeOptions));
export const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions));

export default darkTheme;
