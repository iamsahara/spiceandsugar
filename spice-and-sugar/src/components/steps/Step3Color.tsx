"use client";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Grid, Tooltip } from "@mui/material";

interface Step3Props {
  onNext: () => void;
  updateOrder: (updatedData: Partial<{ baseFlavor: string; color?: string }>) => void;
  orderDetails: { cakeType: string; baseFlavor?: string; color?: string };
}

// 🍫 Base Flavors (Only for Creamy Cakes)
const baseFlavors = [
  { name: "Vanilla", value: "vanilla", image: "/vanilla-cake.png" },
  { name: "Chocolate", value: "chocolate", image: "/chocolate-cake.png" },
];

// 🎨 Cake Colors
const cakeColors = {
  vanilla: [
    { name: "White", value: "#FDFBF6" },
    { name: "Strawberry", value: "#FF6B81" },
    { name: "Lemon", value: "#F4D03F" },
    { name: "Blueberry", value: "#5A3B9C" },
    { name: "Matcha", value: "#597D35" },
  ],
  chocolate: [
    { name: "Chocolate", value: "#4E342E" },
    { name: "Carrot", value: "#E56B2D" },
    { name: "Coffee", value: "#7B5B3A" },
    { name: "Red Velvet", value: "#C41E3A" },
  ],
};

const Step3Color: React.FC<Step3Props> = ({ onNext, updateOrder, orderDetails }) => {
  const [selectedBase, setSelectedBase] = useState(orderDetails.baseFlavor || "vanilla");
  const [selectedColor, setSelectedColor] = useState(orderDetails.color || "#FDFBF6");

  // 🔄 Update Order State When Base Flavor or Color Changes
  useEffect(() => {
    const updatedData: Partial<{ baseFlavor: string; color?: string }> = { baseFlavor: selectedBase };
    if (orderDetails.cakeType === "creamy") {
      updatedData.color = selectedColor;
    }
    updateOrder(updatedData);
  }, [selectedBase, selectedColor]);

  return (
    <Box textAlign="center" p={2}>
      {orderDetails.cakeType === "simple" ? (
        // 🟢 **Simple Cake Message (Skip Color Selection)**
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#888", mb: 2 }}>
            🎨 Color selection is only for creamy cakes.
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
            You can proceed to the next step.
          </Typography>
        </Box>
      ) : (
        // 🟣 **Creamy Cake - Choose Base Flavor & Color**
        <>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
            Choose Your Base Flavor 🍫
          </Typography>

          {/* 🍫 Base Flavor Selection */}
          <Stack direction="row" justifyContent="center" spacing={2} mb={2}>
            {baseFlavors.map((flavor) => (
              <Button
                key={flavor.value}
                onClick={() => setSelectedBase(flavor.value)}
                variant={selectedBase === flavor.value ? "contained" : "outlined"}
                sx={{
                  fontWeight: "bold",
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  bgcolor: selectedBase === flavor.value ? "#FF4081" : "white",
                  color: selectedBase === flavor.value ? "white" : "#673AB7",
                  border: "2px solid #673AB7",
                  "&:hover": { bgcolor: "#512DA8", color: "white" },
                }}
              >
                {flavor.name}
              </Button>
            ))}
          </Stack>

          {/* 🎨 Cake Color Selection */}
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
            Pick Your Cake Color 🎨
          </Typography>

          <Grid container spacing={1} justifyContent="center">
            {cakeColors[selectedBase].map((cake) => (
              <Grid item key={cake.value}>
                <Tooltip title={cake.name} arrow>
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
                </Tooltip>
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
              transition: "all 0.3s ease-in-out",
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Step3Color;