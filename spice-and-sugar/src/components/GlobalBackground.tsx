"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const photosList = [
  "/IMG_6080.jpg",
  "/IMG_6091.jpg",
  "/IMG_6092.jpg",
  "/IMG_6082.jpg",
  "/IMG_6086.jpg",
  "/IMG_6087.jpg",
  "/IMG_6084.jpg",
  "/IMG_6079.jpg",
  "/IMG_6091.jpg",
];

export default function GlobalBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photosList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      id="Hero"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: -2,
      }}
    >
      {photosList.map((photo, index) => (
        <Box
          key={index}
          component="img"
          src={photo}
          alt={`Slide ${index}`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
            filter: "saturate(1.05)",
            zIndex: 0,
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,246,239,0.92) 0%, rgba(255,246,239,0.76) 35%, rgba(255,246,239,0.92) 100%)",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
