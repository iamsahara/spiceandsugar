"use client";
import {Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function Header({ userName }: { userName: string }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        zIndex:3
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
            background: "linear-gradient(90deg, #FF3366, #FF69B4, #FF6B81)", 
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
            mb:10,
            background: "linear-gradient(90deg, #FF5E78, #FF82A9)", 
            WebkitBackgroundClip: "text", 
            textShadow: "0px 0px 12px rgba(255, 94, 120, 0.5)",
          }}
        >
          🍰 Fresh, Healthy & Custom-Made Cakes!
        </Typography>
      </motion.div>
    </Container>
  );
}