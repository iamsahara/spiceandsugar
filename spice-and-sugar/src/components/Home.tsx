"use client";
import { Box, Container, Typography } from "@mui/material";
import CakeOrderStepper from "@/components/CakeOrderStepper";
import { motion } from "framer-motion";

export default function Home({ userName }: { userName: string }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "left",
        py: 3,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ position: "relative" }}
      >
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "3.2rem",
            display: "inline-block",
            padding: "10px 0px",
            background: "linear-gradient(90deg, #FF3366, #FF69B4, #FF6B81)", // ✅ Fixed
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            textShadow: `
              2px 2px 8px rgba(255, 51, 102, 0.4),
              0px 0px 12px rgba(255, 105, 180, 0.4)
            `,
          }}
        >
          Velora Cake
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: "500",
            letterSpacing: "1px",
            background: "linear-gradient(90deg, #FF5E78, #FF82A9)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            textShadow: "0px 0px 12px rgba(255, 94, 120, 0.5)",
          }}
        >
          🍰 Fresh, Healthy & Custom-Made Cakes!
        </Typography>
      </motion.div>
      <Box
        sx={{
          mt: 4,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CakeOrderStepper userName={userName} />
      </Box>
    </Container>
  );
}