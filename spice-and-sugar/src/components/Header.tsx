"use client";
import { Container, Typography, Box } from "@mui/material";
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
        textAlign: "start",
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        margin: 2,
      }}
    >
      <Box sx={{ display: { xs: "flex", md: "block" }, justifyContent: "center", alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.05, 1], 
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 15px rgba(173, 216, 230, 0.6)",
              "0 0 0px rgba(255,255,255,0)"
            ]
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            opacity: { duration: 3 },
          }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          style={{
            position: "fixed",
            top: "20px",
            left: "20px",
            zIndex: 999,
            borderRadius: "50%"
          }}
        >
          <Image src="/veloralogo.png" alt="Velora" width={100} height={100} />
        </motion.div>
      </Box>
      <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
        <Lottie options={defaultOptions} height={200} width={200} />
      </Box>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      ></motion.div>
      {userName && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
        ></motion.div>
      )}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
        <Box sx={{ mt: { xs: 4, md: 8 }, ml: { xs: 0, md: 6 } }}>
          <Typography
            variant="h5"
            sx={{
              backgroundColor: "rgba(255, 245, 250, 0.85)",
              backdropFilter: "blur(1px)",
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              color: "#6D6875",
              letterSpacing: "1px",
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontFamily: '"Poppins", "sans-serif"',
            }}
          >
            call us at{" "}
            <Box component="span" sx={{
                      backgroundColor: "rgba(255, 245, 250, 0.85)",
                      backdropFilter: "blur(10px)",
              color: "#ff69b4",
              textShadow: "0 0 8px rgba(255, 105, 180, 0.6)",
              fontWeight: 700,
            }}>
              1-647-379-8489
            </Box>{" "}
            or take 2 minutes to order your Cake
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
