"use client";
import { Container, Typography, Box, Stack, Button } from "@mui/material";
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
        justifyContent: "space-between",
        alignItems: "center",
        mt: 0,
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
        <Button
          href="/"
          variant="outlined"
          size="small"
          sx={{
            fontWeight: "bold",
            borderColor: "#6D6875",
            color: "#6D6875",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#6D687520",
            },
          }}
        >
          Home
        </Button>
      </Stack>
    </Container>
  );
}