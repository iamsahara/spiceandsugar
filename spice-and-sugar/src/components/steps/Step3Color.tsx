"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Grid } from "@mui/material";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ color: string }>) => void;
  orderDetails: { color: string };
}

// 🎨 Cake Colors (With Visual Previews)
const cakeColors = [
  { name: "Chocolate", value: "#5C3317" },
  { name: "Vanilla", value: "#F3E5AB" },
  { name: "Strawberry", value: "#FF4D6D" },
  { name: "Red Velvet", value: "#A52A2A" },
  { name: "Matcha", value: "#3A5311" },
  { name: "White", value: "#FFFFFF" },
  { name: "Carrot", value: "#E67E22" },
  { name: "Blueberry", value: "#4B0082" },
  { name: "Lemon", value: "#FFD700" },
  { name: "Coffee", value: "#6F4E37" },
];

const Step3Color: React.FC<Step3Props> = ({ onNext, onBack, updateOrder, orderDetails }) => {
  const [selectedColor, setSelectedColor] = useState(orderDetails.color || "#F3E5AB");

  // 🔄 Update Order State When Color Changes
  useEffect(() => {
    updateOrder({ color: selectedColor });
  }, [selectedColor]);

  return (
    <Box textAlign="center" p={2}>

      {/* 🎨 Heading */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
        Pick Your Cake Color 🎨
      </Typography>

      {/* 🎨 Color Selection Grid */}
      <Grid container spacing={1} justifyContent="center">
        {cakeColors.map((cake) => (
          <Grid item key={cake.value}>
            <Button
              onClick={() => setSelectedColor(cake.value)}
              variant={selectedColor === cake.value ? "contained" : "outlined"}
              sx={{
                width: 45,
                height: 45,
                minWidth: "unset",
                borderRadius: "50%",
                bgcolor: cake.value,
                border: selectedColor === cake.value ? "3px solid #673AB7" : "2px solid #E0E0E0",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                  border: "3px solid #512DA8",
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* 🎨 Selected Color Preview (Glassy) */}
      <Box
        mt={3}
        p={1}
        borderRadius={3}
        width={80}
        height={80}
        mx="auto"
        bgcolor={selectedColor}
        sx={{
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
          border: "2px solid white",
          backdropFilter: "blur(5px)",
        }}
      />

    </Box>
  );
};

export default Step3Color;