"use client";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import { useState, useEffect } from "react";

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ toppings: string[]; price: number }>) => void;
  orderDetails: { toppings: string[]; price: number };
}

// 🍓 Available Toppings
const availableToppings = ["🍓 Strawberry", "🫐 Blueberry", "🍒 Cherry", "🍫 Chocolate"];

const Step5Toppings: React.FC<Step5Props> = ({ onNext, onBack, updateOrder, orderDetails }) => {
  const [toppings, setToppings] = useState<string[]>(orderDetails.toppings || []);
  const [price, setPrice] = useState(orderDetails.price);

  // 🔄 Update Global Order State when toppings change
  useEffect(() => {
    updateOrder({ toppings, price });
  }, [toppings, price]);

  // ✅ Toggle Topping Selection
  const handleSelectTopping = (topping: string) => {
    let newToppings = toppings.includes(topping)
      ? toppings.filter((item) => item !== topping) // Remove
      : [...toppings, topping]; // Add

    setToppings(newToppings);
    setPrice(orderDetails.price + newToppings.length * 7.99); // ✅ Each topping adds $7.99
  };

  return (
    <Box textAlign="center" p={3}>
      {/* 🍰 Heading */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
        Choose Your Toppings
      </Typography>

      {/* 🎨 Topping Selection Buttons */}
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
        {availableToppings.map((topping, index) => (
          <Button
            key={index}
            onClick={() => handleSelectTopping(topping)}
            variant={toppings.includes(topping) ? "contained" : "outlined"}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              py: 1.5,
              textTransform: "capitalize",
              bgcolor: toppings.includes(topping) ? "#FF4081" : "white",
              color: toppings.includes(topping) ? "white" : "#673AB7",
              border: "2px solid #673AB7",
              "&:hover": { bgcolor: "#512DA8", color: "white" },
            }}
          >
            {topping} (+$7.99)
          </Button>
        ))}
      </Stack>

      {/* 🏷️ Selected Toppings List */}
      {toppings.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FF4081", mb: 1 }}>
            Selected Toppings:
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {toppings.map((topping) => (
              <Chip
                key={topping}
                label={topping}
                onDelete={() => handleSelectTopping(topping)}
                sx={{
                  fontWeight: "bold",
                  bgcolor: "#673AB7",
                  color: "white",
                  "& .MuiChip-deleteIcon": { color: "white" },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* 🔹 Navigation Buttons */}
      <Stack direction="row" spacing={2} mt={4}>
        <Button variant="contained" color="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={onNext} disabled={toppings.length === 0}>
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

export default Step5Toppings;