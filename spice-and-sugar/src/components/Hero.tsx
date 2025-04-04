"use client";
import GlobalBackground from "./GlobalBackground";
import { Box, Button, Stack } from "@mui/material";

const photosList = [
  "/IMG_6080.JPG",
  "/IMG_6091.JPG",
  "/IMG_6092.JPG",
  "/IMG_6082.JPG",
  "/IMG_6086.JPG",
  "/IMG_6087.JPG",
  "/IMG_6084.JPG",
  "/IMG_6079.JPG",
  "/IMG_6091.JPG"
];

export default function Hero() {

  return (
    <Box
      id="Hero"
      sx={{
        height: "90vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <GlobalBackground />
      
      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          zIndex: 3,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "8px",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <img
          src="/veloralogo.png"
          alt="Velora Logo"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
      sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          px: { xs: 4, sm: 6, md: 12 },
        }}
      >
        <Box sx={{ fontSize: "3rem", fontWeight: 700 }}>
          Welcome to Velora Bakery
        </Box>
        <Box sx={{ fontSize: "1.2rem", mt: 2 }}>
          Delicious moments crafted just for you 
        </Box>
        <Box sx={{ mt: 4 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
              href="tel:16473798489"
            >
              Call Us Now
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              href="login"
            >
              Order Online
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}