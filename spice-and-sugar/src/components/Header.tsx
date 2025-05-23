"use client";
import { Box, Stack, Button, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 0,
        py: 0,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "transparent",
        boxShadow: "none",
        backdropFilter: "none",
        pointerEvents: "none", 
  
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ pointerEvents: "auto", px: 2, py: 1 }}>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -3, 0], scale: [1, 1, 1, 1] }}
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
          <Image src="/veloralogo.png" alt="Velora" width={80} height={70} />
        </motion.div>

        {userName && (
          <Typography
            variant="h6"
            sx={{
              px: 2,
              py: 2,
              borderRadius: "50%",
              fontWeight: "bold",
              color: "#6D6875",
              fontSize: { xs: "0.85rem", md: "1rem" },
              fontFamily: '"Poppins", "sans-serif"',
            }}
          >
            Welcome to Velora, {userName}!
          </Typography>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ pointerEvents: "auto", px: 2, py: 1 }}>
    
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
              // background: "#fff0f5",
              color: "var(--primary-color)",
              fontWeight: "600",
              fontFamily: '"Poppins", sans-serif',
              textTransform: "none",
              borderRadius: "50%",
              // boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              padding: "10px",
              "&:hover": {
                // backgroundColor: "#f8d7e8",
                transform: "scale(1.05)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <HomeRoundedIcon fontSize="large" />
          </Button>
        </motion.div>
      </Stack>
    </Box>
  );
}