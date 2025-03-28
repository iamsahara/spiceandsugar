"use client";
import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "start",
        position:"relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        zIndex: 0,

      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ position: "relative" }}
      >
        <Image src="/veloralogo.png" alt="Velora" width={100} height={100} />
      </motion.div>
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
    </Container>
  );
}
