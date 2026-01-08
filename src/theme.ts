import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

// Custom font: "Outfit" for that premium tech look
const typography = {
  fontFamily: ["'Outfit'", "'Inter'", "sans-serif"].join(","),
  h1: { fontWeight: 800, letterSpacing: "-0.04em" },
  h2: { fontWeight: 800, letterSpacing: "-0.03em" },
  h3: { fontWeight: 700, letterSpacing: "-0.02em" },
  h4: { fontWeight: 700, letterSpacing: "-0.02em" },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { textTransform: "none", fontWeight: 700 },
};

// Dark Theme - "Deep Obsidian"
export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC",
      light: "#D0BCFF",
      dark: "#7B52AB",
      contrastText: "#000000",
    },
    background: {
      default: "#08080A",
      paper: "#111114",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
  },
  typography,
  shape: { borderRadius: 32 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(8, 8, 10, 0.75)",
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 32,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "rgba(187, 134, 252, 0.3)",
            transform: "translateY(-4px) scale(1.02)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
  },
};

// Light Theme - "Cyber Crystal"
export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#6A00FF", // Ultra vibrant violet
      light: "#9D55FF",
      dark: "#4500AB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00F2FF", // Cyber cyan
      contrastText: "#000000",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F7FF",
    },
    text: {
      primary: "#09090B",
      secondary: "#52525B",
    },
  },
  typography,
  shape: { borderRadius: 32 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(25px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03)",
          color: "#09090B",
          borderBottom: "1px solid rgba(106, 0, 255, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(106, 0, 255, 0.05)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.04)",
          borderRadius: 32,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-6px) scale(1.01)",
            boxShadow: "0 30px 60px rgba(106, 0, 255, 0.1)",
            borderColor: "rgba(106, 0, 255, 0.2)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16 },
        contained: {
          background: "linear-gradient(135deg, #6A00FF 0%, #9D55FF 100%)",
          boxShadow: "0 8px 16px rgba(106, 0, 255, 0.2)",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(106, 0, 255, 0.3)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #6A00FF 0%, #00F2FF 100%)",
          boxShadow: "0 15px 35px rgba(106, 0, 255, 0.25)",
          color: "#FFFFFF",
          "&:hover": {
            boxShadow: "0 20px 45px rgba(106, 0, 255, 0.35)",
            transform: "rotate(10deg) scale(1.1)",
          },
        },
      },
    },
  },
};

export const darkTheme = responsiveFontSizes(createTheme(darkThemeOptions));
export const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions));

export default darkTheme;
