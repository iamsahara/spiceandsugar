import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6b81", // Vibrant pink (Birthday vibe)
    },
    secondary: {
      main: "#ffbe76", // Warm yellow (Cheerful)
    },
    background: {
      default: "#fffaf0", // Soft pastel background
    },
    text: {
      primary: "#333", // Dark gray for readability
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: { fontWeight: 700 },
    button: { textTransform: "none", fontSize: "1rem", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Rounded buttons for fun look
          padding: "10px 20px",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});

export default theme;