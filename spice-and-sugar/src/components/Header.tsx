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
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:"rgba(255,255,255,0.8)",
        background:"transparent",
        backdropFilter:"blur(12px)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        top: 0,
        zIndex: 100,
        borderRadius: "0 0 12px 12px",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          style={{
            borderRadius: "50%",
            padding: "0",
          }}
        >
          <Image src="/veloralogo.png" alt="Velora" width={50} height={50} />
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
        <Box>
          <Lottie options={defaultOptions} height={70} width={70} />
        </Box>
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
              background: "var(--secondary-color)",
              color: "#fff",
              fontWeight: "600",
              fontFamily: '"Poppins", sans-serif',
              textTransform: "none",
              borderRadius: "50%",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              padding: "10px",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
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