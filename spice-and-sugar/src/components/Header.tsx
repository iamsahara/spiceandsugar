"use client";
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface HeaderProps {
  userName?: string; // Optional userName to handle both logged-in and non-logged-in states
}

export default function Header({ userName }: HeaderProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        zIndex: 3,
        paddingTop: "2rem",  
        paddingBottom: "2rem",  
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: "relative" }}
      >
        <Typography
          variant="h3"
          fontWeight="900"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "4rem",  
            display: "inline-block",
            background: "linear-gradient(90deg, #FF3366, #FF69B4, #FF6B81)", 
            WebkitBackgroundClip: "text", 
            color: "transparent"
          }}
        >
          Velora
        </Typography>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
      </motion.div>
      {userName && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
        >
        </motion.div>
      )}
    </Container>
  );
}