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

  // 🔄 Update Global Order State when toppings change
  useEffect(() => {
    updateOrder({ toppings, price: orderDetails.price + (toppings.length > 0 ? 4.99 : 0) });
  }, [toppings]);

  const handleSelectTopping = (event: any) => {
    const value = event.target.value as string[];
    setToppings(value);
  };

  return (
    <Box textAlign="center" p={3}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#673AB7", mb: 2 }}>
        Choose Your Toppings
      </Typography>

      {/* 🏷️ Toppings Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Toppings (One-Time $4.99)</InputLabel>
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