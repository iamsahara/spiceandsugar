"use client";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, Stack } from "@mui/material";

interface Step1Props {
  onNext: () => void;
  updateOrder: (updatedData: Partial<{ cakeType: string; weight: number; price: number }>) => void;
  orderDetails?: { cakeType?: "simple" | "creamy"; weight?: number; price?: number };
}

const Step1CakeTypeAndSize: React.FC<Step1Props> = ({ onNext, updateOrder, orderDetails = {} }) => {
  const [selectedCakeType, setSelectedCakeType] = useState<"simple" | "creamy">(orderDetails.cakeType || "simple");
  const [selectedWeight, setSelectedWeight] = useState<number>(orderDetails.weight || 1);
  const [price, setPrice] = useState(orderDetails.price || 18.65);

  useEffect(() => {
    const basePrice = selectedCakeType === "simple" ? 18.65 : 27.99 ;
    setPrice(basePrice * selectedWeight);
    updateOrder({ cakeType: selectedCakeType, weight: selectedWeight, price: basePrice * selectedWeight });
  }, [selectedCakeType, selectedWeight, updateOrder]);

  return (
    <Box textAlign="center" p={1}>
      <Typography variant="h6" sx={{ color: "#673AB7", fontWeight: "bold", mb: 1 }}>
        Choose Your Cake Type
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={1}>
        {["simple", "creamy"].map((type) => (
          <Card
            key={type}
            sx={{
              width: 180,
              borderRadius: "12px",
              boxShadow: selectedCakeType === type ? "0px 4px 15px rgba(255, 64, 129, 0.4)" : "none",
              border: selectedCakeType === type ? "3px solid #FF4081" : "2px solid #E0E0E0",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0px 4px 20px rgba(255, 64, 129, 0.5)" },
            }}
            onClick={() => setSelectedCakeType(type as "simple" | "creamy")}
          >
            <CardContent>
            <img src={`/cake-${type}.png`} alt={`${type} cake`} width="100%" />
              <Typography fontWeight="bold" mt={1}>{type === "simple" ? "Simple Cake 🍞" : "Creamy Cake 🎂"}</Typography>
              <Typography color="secondary">${type === "simple" ? "18.65/kg" : "27.99/kg"}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Typography variant="h6" sx={{ color: "#673AB7", fontWeight: "bold", mt: 2, mb: 1 }}>
        Select Cake Size (kg)
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={1}>
        {[1, 1.5, 2, 2.5, 3, 4, 5].map((weight) => (
          <Button
            key={weight}
            variant={selectedWeight === weight ? "contained" : "outlined"}
            sx={{
              fontWeight: "bold",
              bgcolor: selectedWeight === weight ? "#673AB7" : "white",
              color: selectedWeight === weight ? "white" : "#673AB7",
              border: "1px solid #673AB7",
              "&:hover": { bgcolor: "#512DA8", color: "white" },
            }}
            onClick={() => setSelectedWeight(weight)}
          >
            {weight} kg
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Step1CakeTypeAndSize;