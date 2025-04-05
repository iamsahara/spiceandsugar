"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

const photosList = [
  "/IMG_6080.JPG",
  "/IMG_6091.JPG",
  "/IMG_6092.JPG",
  "/IMG_6082.JPG",
  "/IMG_6086.JPG",
  "/IMG_6087.JPG",
  "/IMG_6084.JPG",
  "/IMG_6079.JPG",
  "/IMG_6091.JPG",
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
      sx={{
        background: 'url("/output (2).jpg")',
        position: "fixed",
        top: "2.8rem",
        bottom: "1rem",
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {photosList.map((photo, index) => (
        <Box
          key={index}
          component="img"
          src={photo}
          alt={`BG Slide ${index}`}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
            filter: "brightness(1) saturate(1.1)",
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
          zIndex: 1,
        }}
      />
    </Box>
  );
}
