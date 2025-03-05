"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ toppings: string[]; price: number }>) => void;
  orderDetails: { toppings: string[]; price: number };
}

// 🍓 Available Toppings (More Fruits!)
const availableToppings = [
  "🍓 Strawberry",
  "🫐 Blueberry",
  "🍒 Cherry",
  "🍫 Chocolate",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥝 Kiwi",
  "🍊 Orange",
  "🍏 Green Apple",
  "🍇 Grape",
  "🍑 Peach",
  "🍉 Watermelon",
  "🫛 Raspberry",
];

const Step5Toppings: React.FC<Step5Props> = ({ onNext, onBack, updateOrder, orderDetails }) => {
  const [toppings, setToppings] = useState<string[]>(orderDetails.toppings || []);
  const [price, setPrice] = useState(orderDetails.price);

  // ✅ Update price and toppings
  useEffect(() => {
    const additionalCost = toppings.length > 0 ? 4.99 : 0; // Apply one-time charge for any toppings
    setPrice(orderDetails.price + additionalCost);
    updateOrder({ toppings, price: orderDetails.price + additionalCost });
  }, [toppings]);

  // ✅ Handle multiple toppings selection
  const handleSelectTopping = (event: SelectChangeEvent<string[]>) => {
    const selectedToppings = event.target.value as string[];
    setToppings(selectedToppings);
  };

  return (
    <Box textAlign="center" p={2}>
      {/* 🏷️ Title */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#8EC5C0", mb: 1 }}>
        Choose Your Toppings
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
        One-time charge: **$4.99** for unlimited toppings 🍰
      </Typography>

      {/* 🏷️ Toppings Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Toppings</InputLabel>
        <Select
          multiple
          value={toppings}
          onChange={handleSelectTopping}
          renderValue={(selected) => (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {selected.map((topping) => (
                <Chip
                  key={topping}
                  label={topping}
                  sx={{ bgcolor: "#FF4081", color: "white", fontWeight: "bold" }}
                />
              ))}
            </Stack>
          )}
        >
          {availableToppings.map((topping, index) => (
            <MenuItem key={index} value={topping}>
              {topping}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Step5Toppings;