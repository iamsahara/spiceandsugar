"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

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
    <Box textAlign="center" p={3}>
      {/* 🎨 Heading */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
        Choose Your Cake Color
      </Typography>

      {/* 🎨 Color Selection */}
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
        {cakeColors.map((cake) => (
          <Button
            key={cake.value}
            onClick={() => setSelectedColor(cake.value)}
            variant={selectedColor === cake.value ? "contained" : "outlined"}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 2,
              py: 1,
              fontWeight: "bold",
              bgcolor: selectedColor === cake.value ? cake.value : "white",
              color: selectedColor === cake.value ? "white" : "#673AB7",
              border: "2px solid #673AB7",
              "&:hover": { bgcolor: cake.value, color: "white" },
            }}
          >
            {cake.name}
          </Button>
        ))}
      </Stack>

      {/* 🎨 Selected Color Preview */}
      <Box mt={3} p={2} borderRadius={2} bgcolor={selectedColor} width={100} height={100} mx="auto" />

    </Box>
  );
};

export default Step3Color;