import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC", // A vibrant purple
    },
    secondary: {
      main: "#03DAC6", // A teal accent
    },
    background: {
      default: "#121212", // Standard dark background
      paper: "#1E1E1E", // Slightly lighter for surfaces
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#A0A0A0",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h5: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E", // Match paper color
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#242424", // A slightly different dark shade for cards
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
