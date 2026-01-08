import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC", // Vibrant purple
      light: "#E1BEE7",
      dark: "#8B5FDB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#03DAC6", // Teal accent
      light: "#66FFF0",
      dark: "#00A896",
      contrastText: "#000000",
    },
    error: {
      main: "#CF6679",
      light: "#FF9AA2",
      dark: "#B00020",
    },
    warning: {
      main: "#FFB74D",
      light: "#FFCC80",
      dark: "#FF8F00",
    },
    info: {
      main: "#81D4FA",
      light: "#B3E5FC",
      dark: "#0288D1",
    },
    success: {
      main: "#A5D6A7",
      light: "#C8E6C9",
      dark: "#388E3C",
    },
    background: {
      default: "#0D1117", // GitHub dark background
      paper: "#161B22", // Slightly lighter for surfaces
    },
    text: {
      primary: "#F0F6FC", // High contrast white
      secondary: "#8B949E", // Medium gray
      disabled: "#484F58", // Darker gray for disabled state
    },
    divider: "rgba(139, 148, 158, 0.12)",
    action: {
      active: "#F0F6FC",
      hover: "rgba(187, 134, 252, 0.08)",
      selected: "rgba(187, 134, 252, 0.12)",
      disabled: "rgba(139, 148, 158, 0.3)",
      disabledBackground: "rgba(139, 148, 158, 0.12)",
    },
  },
  typography: {
    fontFamily: [
      "'Inter'",
      "'SF Pro Display'",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.01071em",
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "none",
      letterSpacing: "0.02em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.08333em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },
        body: {
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(139, 148, 158, 0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(187, 134, 252, 0.3)",
            borderRadius: 4,
            "&:hover": {
              background: "rgba(187, 134, 252, 0.5)",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(22, 27, 34, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(139, 148, 158, 0.12)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(22, 27, 34, 0.8)",
          backgroundImage: "none",
          borderRadius: 16,
          border: "1px solid rgba(139, 148, 158, 0.12)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        },
        elevation2: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        },
        elevation4: {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontSize: "0.9rem",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #BB86FC 0%, #8B5FDB 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #C48BFC 0%, #9564E2 100%)",
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
            transform: "translateY(-1px)",
          },
        },
        sizeLarge: {
          padding: "14px 32px",
          fontSize: "1rem",
        },
        sizeSmall: {
          padding: "6px 16px",
          fontSize: "0.8rem",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #BB86FC 0%, #8B5FDB 100%)",
          boxShadow: "0 4px 15px rgba(187, 134, 252, 0.4)",
          "&:hover": {
            background: "linear-gradient(135deg, #C48BFC 0%, #9564E2 100%)",
            boxShadow: "0 6px 20px rgba(187, 134, 252, 0.5)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            borderRadius: 12,
            backgroundColor: "rgba(139, 148, 158, 0.1)",
            border: "1px solid rgba(139, 148, 158, 0.2)",
            "&:before, &:after": {
              display: "none",
            },
            "&:hover": {
              backgroundColor: "rgba(139, 148, 158, 0.15)",
              borderColor: "rgba(187, 134, 252, 0.3)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(187, 134, 252, 0.1)",
              borderColor: "#BB86FC",
              boxShadow: "0 0 0 2px rgba(187, 134, 252, 0.2)",
            },
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "& fieldset": {
              borderColor: "rgba(139, 148, 158, 0.3)",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderColor: "rgba(187, 134, 252, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#BB86FC",
              boxShadow: "0 0 0 2px rgba(187, 134, 252, 0.2)",
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(187, 134, 252, 0.1)",
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.75rem",
        },
        outlined: {
          borderColor: "rgba(139, 148, 158, 0.3)",
          "&:hover": {
            borderColor: "rgba(187, 134, 252, 0.5)",
            backgroundColor: "rgba(187, 134, 252, 0.05)",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 3,
          backgroundColor: "rgba(139, 148, 158, 0.2)",
        },
        bar: {
          borderRadius: 4,
          background: "linear-gradient(90deg, #BB86FC 0%, #03DAC6 100%)",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          marginBottom: 4,
          "&.MuiListItem-button": {
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "rgba(187, 134, 252, 0.08)",
              transform: "translateX(4px)",
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        filledSuccess: {
          background: "linear-gradient(135deg, #A5D6A7 0%, #66BB6A 100%)",
          color: "#1B5E20",
        },
        filledError: {
          background: "linear-gradient(135deg, #EF5350 0%, #D32F2F 100%)",
        },
        filledWarning: {
          background: "linear-gradient(135deg, #FFB74D 0%, #FF9800 100%)",
          color: "#E65100",
        },
        filledInfo: {
          background: "linear-gradient(135deg, #64B5F6 0%, #2196F3 100%)",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiSnackbarContent-root": {
            borderRadius: 12,
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width: 600px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
  },
});

// Make the theme responsive
theme = responsiveFontSizes(theme, {
  breakpoints: ["xs", "sm", "md", "lg"],
  factor: 2,
});

export default theme;
