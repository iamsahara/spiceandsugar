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
} from "@mui/material";

interface Step2Props {
  onNext: () => void;
  updateOrder: (
    updatedData: Partial<{
      baseFlavor: string;
      filling: string[];
      toppings: string[];
      price: number;
    }>
  ) => void;
  orderDetails: {
    cakeType: string;
    baseFlavor?: string;
    filling: string[];
    toppings: string[];
    price: number;
  };
}
const baseFlavors = [
  { name: "Vanilla", value: "Vanilla" },
  { name: "Chocolate", value: "Chocolate" },
];
const SpongeCakeFillings = ["Apple", "Cinnamon", "Carrot", "Walnuts", "Pistachio"];
const ButterCakeFillings = ["Chocolate", "Strawberry", "Blueberry", "Cherry", "Banana", "Raspberry", "Kiwi"];
const availableToppings = [
  "🍫 Chocolate",
  "🍓 Strawberry",
  "🫐 Blueberry",
  "🍒 Cherry",
  "🍌 Banana",
  "🍍 Pineapple",
  "🥝 Kiwi",
  "🍇 Grape",
];

const Step2FillingsToppings: React.FC<Step2Props> = ({ updateOrder, orderDetails }) => {
  const [selectedFlavor, setSelectedFlavor] = useState(orderDetails.baseFlavor || "Vanilla");
  const [selectedFillings, setSelectedFillings] = useState<string[]>(orderDetails.filling ?? []);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(orderDetails.toppings ?? []);
  const [price, setPrice] = useState(orderDetails.price);

  const availableFillings = orderDetails.cakeType === "Sponge Cake" ? SpongeCakeFillings : ButterCakeFillings;
  useEffect(() => {
    let basePrice = orderDetails.price;
    let newTotalPrice = basePrice;
  
    if (selectedFillings.length > 0) {
      newTotalPrice += 4.99;
    }
  
    if (selectedToppings.length > 0) {
      newTotalPrice += 4.99;
    }
  
    if (selectedFillings.length === 0 && newTotalPrice > basePrice) {
      newTotalPrice -= 4.99;
    }
  
    if (selectedToppings.length === 0 && newTotalPrice > basePrice) {
      newTotalPrice -= 4.99;
    }
  
    if ( newTotalPrice !== basePrice ) {
      setPrice(newTotalPrice);
      updateOrder({
        baseFlavor: selectedFlavor,
        filling: selectedFillings,
        toppings: selectedToppings,
        price: newTotalPrice,
      });
    }
  }, [selectedFlavor, selectedFillings.length, selectedToppings.length]); // ✅ Track only `length` changes for efficiency

  return (
    <Box p={3}>
      <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var( --secondary-color)", mb: 1 }}>
        ⑤ Flavor
      </Typography>
      <FormControl fullWidth variant="outlined">
        <Select value={selectedFlavor} onChange={(e) => setSelectedFlavor(e.target.value)}>
          {baseFlavors.map((flavor) => (
            <MenuItem key={flavor.value} value={flavor.value}>
              {flavor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var( --secondary-color)", mt: 3, mb: 1 }}>
        ⑥ Fillings
      </Typography>
      <FormControl fullWidth variant="outlined">

  <Select
    multiple
    value={selectedFillings}
    onChange={(e) => setSelectedFillings(e.target.value as string[])}
    renderValue={(selected) => (
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {selected.map((filling) => (
          <Chip key={filling} label={filling} sx={{ bgcolor: "var( --secondary-color)", color: "white", fontWeight: "bold" }} />
        ))}
      </Stack>
    )}
  >
    {availableFillings.map((filling) => (
      <MenuItem key={filling} value={filling}>
        {filling}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var( --secondary-color)", mt: 3, mb: 1 }}>
        ⑦ Toppings (One-Time charge $4.99)
      </Typography>
      <FormControl fullWidth variant="outlined">
        <Select
          multiple
          value={selectedToppings}
          onChange={(e) => setSelectedToppings(e.target.value as string[])}
          renderValue={(selected) => (
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {selected.map((topping) => (
                <Chip key={topping} label={topping} sx={{ bgcolor: "var( --secondary-color)", color: "white", fontWeight: "bold" }} />
              ))}
            </Stack>
          )}
        >
          {availableToppings.map((topping) => (
            <MenuItem key={topping} value={topping}>
              {topping}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Step2FillingsToppings;