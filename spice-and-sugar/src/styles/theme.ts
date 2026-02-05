import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  palette: {
    primary: {
      main: "#f06f5f",
    },
    secondary: {
      main: "#7fb7a4",
    },
    background: {
      default: "#fff6ef",
      paper: "rgba(255, 255, 255, 0.92)",
    },
    text: {
      primary: "#2d2523",
      secondary: "#6c5f5b",
    },
  },
  typography: {
    fontFamily: "'Manrope', sans-serif",
    h1: { fontFamily: "'Fraunces', serif", fontWeight: 700 },
    h2: { fontFamily: "'Fraunces', serif", fontWeight: 700 },
    h3: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h4: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h5: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h6: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    button: { textTransform: "none", fontSize: "1rem", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "10px 22px",
          transition: "0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 12px 28px rgba(32, 24, 22, 0.12)",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "rgba(255,255,255,0.9)",
        },
      },
    },
  },
});

export default theme;
