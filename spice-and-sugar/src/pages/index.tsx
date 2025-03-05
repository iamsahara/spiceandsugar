"use client";
import { Box, Typography, Container } from "@mui/material";
import CakeOrderStepper from "@/components/CakeOrderStepper";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: "relative" }}
      >
        {/* 🟠 **Background Layer for Readability** */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "fit-content",
            px: 4,
            py: 2.2,
            borderRadius: "15px",
            background: "rgba(255, 250, 250, 0.85)", // **Soft pinkish-white for readability**
            backdropFilter: "blur(10px)",
            zIndex: -1,
            boxShadow: "0px 4px 20px rgba(255, 105, 180, 0.3)", // **Pink glow**
          }}
        />

        <Typography
          variant="h2"
          fontWeight="900"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            textAlign: "center",
            letterSpacing: "2.5px",
            fontSize: "3.2rem",
            display: "inline-block",
            position: "relative",
            padding: "16px 24px",
            borderRadius: "12px",
            background: "linear-gradient(45deg, #FF4E78, #FF8243, #46C4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `
              3px 3px 2px rgba(255, 255, 255, 0.9), 
              -2px -2px 2px rgba(0, 0, 0, 0.2),
              0px 0px 15px rgba(255, 78, 120, 0.6),
              0px 0px 22px rgba(70, 196, 255, 0.5)
            `,
            animation: "glow 5s infinite alternate",
            "@keyframes glow": {
              "0%": { textShadow: "0px 0px 12px rgba(255, 78, 120, 0.5)" },
              "100%": { textShadow: "0px 0px 18px rgba(70, 196, 255, 0.7)" },
            },
          }}
        >
          🎂 Velora Cake
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "fit-content",
            px: 3,
            py: 1.5,
            borderRadius: "12px",
            background: "rgba(255, 250, 250, 0.9)",
            backdropFilter: "blur(8px)",
            zIndex: -1,
            boxShadow: "0px 3px 12px rgba(255, 105, 180, 0.3)",
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            mt: 1,
            letterSpacing: "1.2px",
            textAlign: "center",
            background: "linear-gradient(45deg, #FF69B4, #46C4FF, #FF8243)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0px 0px 12px rgba(255, 105, 180, 0.6), 0px 0px 18px rgba(70, 196, 255, 0.6)",
          }}
        >
          🍰 Freshly Baked, Beautifully Crafted, & Made Just for You! ✨
        </Typography>
      </motion.div>
      <Box sx={{ mt: 3, width: "100%" }}>
        <CakeOrderStepper />
      </Box>
    </Container>
  );
}
