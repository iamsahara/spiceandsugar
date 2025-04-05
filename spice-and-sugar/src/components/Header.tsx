"use client";
import { Container, Typography, Box, Stack, Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import welcomeAnimation from "../../public/animations/2.json";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        top: 0,
        zIndex: 100,
        borderRadius: "0 0 20px 20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        px: 3,
        py: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1.05, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            borderRadius: "50%",
            padding: "4px",
            background: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Image src="/veloralogo.png" alt="Velora" width={80} height={80} />
        </motion.div>

        {/* <Typography
          variant="h6"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(4px)",
            px: 2,
            py: 0.5,
            borderRadius: "12px",
            fontWeight: "bold",
            color: "#6D6875",
            fontSize: { xs: "0.85rem", md: "1rem" },
            fontFamily: '"Poppins", "sans-serif"',
          }}
        >
         5 Minutes to Submit!
        </Typography> */}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
    
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            href="/"
            variant="contained"
            size="medium"
            sx={{
              minWidth: "48px",
              background: "#fff0f5",
              color: "#d63384",
              fontWeight: "600",
              fontFamily: '"Poppins", sans-serif',
              textTransform: "none",
              borderRadius: "50%",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#f8d7e8",
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <HomeRoundedIcon fontSize="medium" />
          </Button>
        </motion.div>
      </Stack>
    </Container>
  );
}