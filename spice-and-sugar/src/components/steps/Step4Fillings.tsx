"use client";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ filling: string[]; price: number }>) => void;
  orderDetails: { cakeType: string; filling: string[]; price: number };
}

// 🥜 Fillings by Cake Type
const simpleCakeFillings = ["Apple", "Darchin", "Carrot", "Gerdou", "Pistachio"];
const creamyCakeFillings = ["Banana", "Cherry", "Blueberry", "Gerdou", "Pistachio"];

const Step4Fillings: React.FC<Step4Props> = ({ onNext, onBack, updateOrder, orderDetails }) => {
  const [selectedFillings, setSelectedFillings] = useState<string[]>(orderDetails.filling || []);
  const [price, setPrice] = useState(orderDetails.price);

  // ✅ Get available fillings based on cake type
  const availableFillings = orderDetails.cakeType === "simple" ? simpleCakeFillings : creamyCakeFillings;

  // ✅ Toggle Filling Selection
  const handleSelectFilling = (filling: string) => {
    let newFillings = selectedFillings.includes(filling)
      ? selectedFillings.filter((item) => item !== filling) // Remove
      : [...selectedFillings, filling]; // Add

    setSelectedFillings(newFillings);

    // ✅ Adjust price for Gerdou & Pistachio
    let additionalCost = 0;
    if (newFillings.includes("Gerdou")) additionalCost += 3.99;
    if (newFillings.includes("Pistachio")) additionalCost += 7.99;
    additionalCost += newFillings.length * 7.99; // ✅ Each Filling Adds +$7.99

    setPrice(orderDetails.price + additionalCost);
  };

  // ✅ Update Global Order & Go Next
  const handleNext = () => {
    updateOrder({ filling: selectedFillings, price });
    onNext();
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" color="primary">
        Choose Your Fillings
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "gray" }}>
        Select fillings based on your cake type 🍰
      </Typography>

      {/* 🍓 Filling Selection */}
      <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
        {availableFillings.map((filling) => (
          <Button
            key={filling}
            variant={selectedFillings.includes(filling) ? "contained" : "outlined"}
            onClick={() => handleSelectFilling(filling)}
            color={selectedFillings.includes(filling) ? "secondary" : "primary"}
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
              borderRadius: 3,
              px: 3,
              py: 1.5,
            }}
          >
            {filling} {["Gerdou", "Pistachio"].includes(filling) ? "(+$3.99/$7.99)" : ""}
          </Button>
        ))}
      </Stack>

      {/* 🔹 Navigation Buttons */}
      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="contained" color="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext} disabled={selectedFillings.length === 0}>
          Next
        </Button>
      </Stack>

      {/* 💰 Price Update */}
      <Typography variant="h6" color="secondary" sx={{ mt: 2 }}>
        Updated Price: ${price.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default Step4Fillings;