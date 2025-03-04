"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ filling: string[]; price: number }>) => void;
  orderDetails: { cakeType: string; filling: string[]; price: number };
}

// 🥜 **Fillings by Cake Type**
const simpleCakeFillings = ["Apple", "Cinnamon", "Carrot", "Walnuts", "Pistachio"];
const creamyCakeFillings = ["Chocolate", "Strawberry", "Blueberry", "Cherry", "Banana", "Raspberry", "Kiwi"];

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

    // ✅ Adjust price for **Walnuts & Pistachio**
    let additionalCost = 0;
    if (newFillings.includes("Walnuts")) additionalCost += 3.99;
    if (newFillings.includes("Pistachio")) additionalCost += 7.99;
    additionalCost += newFillings.length * 7.99; // ✅ Each Filling Adds +$7.99

    // ✅ Free fillings for **Simple Cake**
    if (orderDetails.cakeType === "simple") {
      additionalCost -= (["Apple", "Cinnamon", "Carrot"].filter(f => newFillings.includes(f)).length * 7.99);
    }

    setPrice(orderDetails.price + additionalCost);
  };

  // ✅ Update Global Order & Go Next
  const handleNext = () => {
    updateOrder({ filling: selectedFillings, price });
    onNext();
  };

  return (
    <Box textAlign="center" p={3}>
      {/* 🏷️ **Heading** */}
      <Typography variant="h5" fontWeight="bold" color="primary">
        Choose Your Fillings 🍰
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "gray" }}>
        Select the best fillings for your cake!
      </Typography>

      {/* 🍓 **Filling Selection** */}
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
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
              fontSize: "0.9rem",
            }}
          >
            {filling} {["Walnuts", "Pistachio"].includes(filling) ? "(+$3.99/$7.99)" : ""}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Step4Fillings;