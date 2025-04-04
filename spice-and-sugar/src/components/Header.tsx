"use client";
import { Container, Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import welcomeAnimation from "../../public/animations/2.json";

interface HeaderProps {
  userName?: string;
}

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: welcomeAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Header({ userName }: HeaderProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        py: 1,
        px: 2,
        mt: 0,
        textAlign: { xs: "center", md: "left" },
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderRadius: "0 0 12px 12px",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        style={{
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          padding: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Image src="/veloralogo.png" alt="Velora" width={60} height={60} />
      </motion.div>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box>
          <Lottie options={defaultOptions} height={60} width={60} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(4px)",
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            fontWeight: "bold",
            color: "#6D6875",
            letterSpacing: "1px",
            fontSize: { xs: "0.85rem", md: "1rem" },
            fontFamily: '"Poppins", "sans-serif"',
          }}
        >
        Just 5 Minutes to Submit!
        </Typography>
      </Box>
    </Container>
  );
}