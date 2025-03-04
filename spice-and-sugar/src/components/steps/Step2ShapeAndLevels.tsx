"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack, Card, CardContent } from "@mui/material";

interface Step2Props {
  updateOrder: (updatedData: Partial<{ shape: string; levels: number; price: number }>) => void;
  orderDetails: { shape?:  "round" | "square"; levels?: 1 | 2 | 3; cakeType?: string; price?: number; weight?: number };
}

const Step2ShapeAndLevels: React.FC<Step2Props> = ({ updateOrder, orderDetails = {} }) => {
  const initialShape: "round" | "square" = orderDetails.shape ?? "round";
  const initialLevels = orderDetails.levels ?? 1;
  const initialPrice = orderDetails.price ?? 19;
  const [selectedShape, setSelectedShape] = useState<"round" | "square">(initialShape);
  const [cakeLevel, setCakeLevel] = useState<1 | 2 | 3>(initialLevels);
  const [price, setPrice] = useState(initialPrice);
  useEffect(() => {
    if (!orderDetails.weight) return; // Ensure weight is selected in Step 1

    const basePrice = orderDetails.cakeType === "simple" ? 19 : 29;
    const updatedPrice = basePrice * cakeLevel * orderDetails.weight;
    setPrice(updatedPrice);
    updateOrder({ price: updatedPrice, levels: cakeLevel, shape: selectedShape });
  }, [cakeLevel, selectedShape, orderDetails.cakeType, orderDetails.weight, updateOrder]);

  return (
    <Box textAlign="center" p={3}>
      {/* 💰 Price Display (Always Updates) */}
      <Typography variant="h6" sx={{ color: "#FF4081", fontWeight: "bold", mb: 2 }}>
        💰 Current Price: ${price.toFixed(2)}
      </Typography>

      {/* 🏷️ Choose Cake Shape */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
        Choose Cake Shape
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={3}>
        {["round", "square"].map((shape) => (
          <Card
            key={shape}
            sx={{
              width: 180,
              borderRadius: "12px",
              boxShadow: selectedShape === shape ? "0px 4px 15px rgba(255, 64, 129, 0.4)" : "none",
              border: selectedShape === shape ? "3px solid #FF4081" : "2px solid #E0E0E0",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0px 4px 20px rgba(255, 64, 129, 0.5)" },
            }}
            onClick={() => setSelectedShape(shape as "round" | "square")}
          >
            <CardContent>
              <img src={`/cake-${shape}.png`} alt={`${shape} cake`} width="100%" />
              <Typography fontWeight="bold" mt={1}>{shape === "round" ? "Round Cake 🎂" : "Square Cake 🍰"}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* 🍰 Choose Cake Levels */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#673AB7", mt: 4, mb: 2 }}>
        Choose Cake Levels
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2}>
        {[1, 2, 3].map((level) => (
          <Button
            key={level}
            variant={cakeLevel === level ? "contained" : "outlined"}
            sx={{
              fontWeight: "bold",
              bgcolor: cakeLevel === level ? "#673AB7" : "white",
              color: cakeLevel === level ? "white" : "#673AB7",
              border: "2px solid #673AB7",
              "&:hover": { bgcolor: "#512DA8", color: "white" },
            }}
            onClick={() => setCakeLevel(level as 1 | 2 | 3)}
          >
            {level}-Level Cake
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Step2ShapeAndLevels;