"use client";
import { Box, Typography, Container } from "@mui/material";
import CakeOrderStepper from "@/components/CakeOrderStepper";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          color: "#6D214F",
          mb: 1,
        }}
      >
        Velora Cake 🎂
      </Typography>
      <Box
        sx={{
          padding: 3,
        }}
      >
        <CakeOrderStepper />
      </Box>
    </Container>
  );
}