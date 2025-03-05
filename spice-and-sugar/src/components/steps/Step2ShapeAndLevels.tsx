"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack, Card, CardContent } from "@mui/material";

interface Step2Props {
  updateOrder: (updatedData: Partial<{ shape: string; levels: number; price: number }>) => void;
  orderDetails: { shape?: "round" | "square" | string; levels?: number; cakeType: string; price: number; weight: number};
}

const Step2ShapeAndLevels: React.FC<Step2Props> = ({ updateOrder, orderDetails }) => {
  const [selectedShape, setSelectedShape] = useState(orderDetails.shape || "round");
  const [cakeLevel, setCakeLevel] = useState(orderDetails.levels || 1);
  const [price, setPrice] = useState(orderDetails.price);

  useEffect(() => {
    const basePrice = orderDetails.cakeType === "simple" ? 19 : 29;
    const updatedPrice = basePrice * cakeLevel * orderDetails.weight;

    setPrice(updatedPrice);
    updateOrder({ levels: cakeLevel, price: updatedPrice });
  }, [cakeLevel, orderDetails.cakeType, orderDetails.weight]);

  return (
    <Box textAlign="center" p={2}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#8EC5C0", mb: 1 }}>
        Select Cake Shape
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2}>
        {["round", "square"].map((shape) => (
          <Card
            key={shape}
            sx={{
              width: 100,
              height: 100,
              borderRadius: shape === "round" ? "50%" : "8px",
              backgroundColor: selectedShape === shape ? "#FF4081" : "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: selectedShape === shape ? "0px 4px 10px rgba(255, 64, 129, 0.5)" : "none",
              border: selectedShape === shape ? "3px solid #FF4081" : "2px solid #E0E0E0",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => setSelectedShape(shape as "round" | "square")}
          >
            <Typography fontWeight="bold" fontSize="0.9rem" color={selectedShape === shape ? "white" : "#8EC5C0"}>
              {shape === "round" ? "Round" : "Square"}
            </Typography>
          </Card>
        ))}
      </Stack>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#8EC5C0", mt: 3, mb: 1 }}>
        Select Cake Levels
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={2}>
        {[1, 2, 3].map((level) => (
          <Button
            key={level}
            variant={cakeLevel === level ? "contained" : "outlined"}
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              minWidth: 60,
              bgcolor: cakeLevel === level ? "#8EC5C0" : "white",
              color: cakeLevel === level ? "white" : "#8EC5C0",
              border: "2px solid #8EC5C0",
              "&:hover": { bgcolor: "#8EC5C0", color: "white" },
            }}
            onClick={() => setCakeLevel(level as 1 | 2 | 3)}
          >
            {level}-Level
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Step2ShapeAndLevels;