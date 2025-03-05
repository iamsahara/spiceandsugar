"use client";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Step1Props {
  onNext: () => void;
  updateOrder: (updatedData: Partial<{ cakeType: string; weight: number; price: number }>) => void;
  orderDetails?: { cakeType?: "simple" | "creamy"; weight?: number; price?: number };
}

const weightOptions = [
  { weight: 1, serves: "4-6 people" },
  { weight: 1.5, serves: "6-8 people" },
  { weight: 2, serves: "8-10 people" },
  { weight: 2.5, serves: "10-12 people" },
  { weight: 3, serves: "12-15 people" },
  { weight: 4, serves: "15-20 people" },
  { weight: 5, serves: "20-25 people" },
];

const Step1CakeTypeAndSize: React.FC<Step1Props> = ({ onNext, updateOrder, orderDetails = {} }) => {
  const [selectedCakeType, setSelectedCakeType] = useState<"simple" | "creamy">(orderDetails.cakeType || "simple");
  const [selectedWeight, setSelectedWeight] = useState<number>(orderDetails.weight || 1);
  const [price, setPrice] = useState(orderDetails.price || 18.65);

  useEffect(() => {
    const basePrice = selectedCakeType === "simple" ? 18.65 : 27.99;
    setPrice(basePrice * selectedWeight);
    updateOrder({ cakeType: selectedCakeType, weight: selectedWeight, price: basePrice * selectedWeight });
  }, [selectedCakeType, selectedWeight, updateOrder]);

  return (
    <Box textAlign="center" p={1}>
      <Typography variant="h6" sx={{ color: "#8EC5C0", fontSize: "1rem", fontWeight: "bold", mb: 1 }}>
        Choose Your Cake Type
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={3}>
        {["simple", "creamy"].map((type) => (
          <Card
            key={type}
            sx={{
              width: 130,
              height: 175,
              borderRadius: "8px",
              boxShadow: selectedCakeType === type ? "0px 4px 15px rgba(255, 64, 129, 0.4)" : "none",
              border: selectedCakeType === type ? "1px solid #FF4081" : "2px solid #E0E0E0",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: "0px 4px 20px rgba(255, 64, 129, 0.5)" },
            }}
            onClick={() => setSelectedCakeType(type as "simple" | "creamy")}
          >
            <CardContent>
              <img src={`/cake-${type}.png`} alt={`${type} cake`} width="100%" />
              <Typography sx={{ fontSize: "0.8rem" }} fontWeight="bold">
                {type === "simple" ? "Simple Cake" : "Creamy Cake"}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem" }} color="black">
                ${type === "simple" ? "18.65/kg" : "27.99/kg"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Typography variant="h6" sx={{ color: "#8EC5C0", fontWeight: "bold", fontSize: "1rem", mt: 3, mb: 1 }}>
        Select Cake Size (kg)
      </Typography>
      <FormControl fullWidth>
        <InputLabel></InputLabel>
        <Select
          value={selectedWeight}
          onChange={(e) => setSelectedWeight(e.target.value as number)}
          sx={{
            borderRadius: 3,
            fontWeight: "bold",
            bgcolor: "rgba(255,255,255,0.3)", 
            backdropFilter: "blur(12px)",
          }}
        >
          {weightOptions.map(({ weight, serves }) => (
            <MenuItem key={weight} value={weight}>
              {weight} kg - {serves}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Step1CakeTypeAndSize;