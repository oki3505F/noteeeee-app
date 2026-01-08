import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material/styles";

// Material Design 3 Tone-mapping simulation for "Premium" Dark Mode
// Primary: Violet/Purple (Typical MD3 default)
// Background: Deep OLED Black
// Surface: Dark Grey with blue tint

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#D0BCFF", // MD3 Primary Key
      light: "#EADDFF",
      dark: "#381E72",
      contrastText: "#381E72",
    },
    secondary: {
      main: "#CCC2DC", // MD3 Secondary Key
      light: "#E8DEF8",
      dark: "#332D41",
      contrastText: "#332D41",
    },
    error: {
      main: "#F2B8B5",
      light: "#F9DEDC",
      dark: "#601410",
      contrastText: "#601410",
    },
    background: {
      default: "#000000", // Neural OLED Black
      paper: "#141218", // MD3 Surface Level 1
    },
    text: {
      primary: "#E6E1E5",
      secondary: "#CAC4D0",
      disabled: "rgba(230, 225, 229, 0.38)",
    },
    divider: "#49454F",
    action: {
      active: "#E8DEF8",
      hover: "rgba(208, 188, 255, 0.08)",
      selected: "rgba(208, 188, 255, 0.12)",
      disabled: "rgba(230, 225, 229, 0.12)",
      disabledBackground: "rgba(230, 225, 229, 0.12)",
    },
  },
  typography: {
    fontFamily: [
      "'Roboto Flex'",
      "'Inter'",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: { fontSize: "3.5rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontSize: "2rem", fontWeight: 600, letterSpacing: "0em" },
    h4: { fontSize: "1.75rem", fontWeight: 500, letterSpacing: "0em" },
    h5: { fontSize: "1.5rem", fontWeight: 500 },
    h6: { fontSize: "1.25rem", fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.01em" },
  },
  shape: {
    borderRadius: 24, // MD3 uses larger radii
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#49454F #141218",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#141218",
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#49454F",
            minHeight: 24,
            border: "2px solid #141218",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(20, 18, 24, 0.7)", // Glassmorphism
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(73, 69, 79, 0.5)",
          color: "#E6E1E5",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1D1B20", // Surface Container
        },
        elevation1: { boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)" },
        elevation2: { boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // Full pill shape like MD3
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "none",
          backgroundColor: "#D0BCFF",
          color: "#381E72",
          "&:hover": {
            boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#EADDFF",
          },
        },
        outlined: {
          borderColor: "#938F99",
          color: "#D0BCFF",
          "&:hover": {
            backgroundColor: "rgba(208, 188, 255, 0.08)",
            borderColor: "#D0BCFF",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 16, // MD3 FAB is slightly squarer than pill
          backgroundColor: "#D0BCFF", // Primary Container
          color: "#381E72", // On Primary Container
          boxShadow: "0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            backgroundColor: "#EADDFF",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundColor: "#2B2930", // Surface Container High
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": { borderColor: "#938F99" },
            "&:hover fieldset": { borderColor: "#E6E1E5" },
            "&.Mui-focused fieldset": { borderColor: "#D0BCFF" },
          },
        },
      },
    },
  },
};

let theme = createTheme(themeOptions);

theme = responsiveFontSizes(theme);

export default theme;
