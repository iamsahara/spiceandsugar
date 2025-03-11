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
const ButterAndFondantCakeFillings = ["Chocolate", "Strawberry", "Blueberry", "Cherry", "Banana", "Raspberry", "Kiwi"];

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
  const [basePrice] = useState(orderDetails.price);

  const availableFillings = (() => {
    switch (orderDetails.cakeType) {
      case "Sponge Cake":
        return SpongeCakeFillings;
      case "Butter Cake":
      case "Fondant Cake":
        return ButterAndFondantCakeFillings;
      default:
        return ButterAndFondantCakeFillings; 
    }
  })();

  useEffect(() => {
    const hasFillings = selectedFillings.length > 0;
    const hasToppings = selectedToppings.length > 0;

    let extraCharge = 0;

    if (hasFillings && hasToppings) {
      extraCharge = 15.00; 
    } else if (hasFillings || hasToppings) {
      extraCharge = 7.99;  
    }

    // ✅ Use basePrice here (stable initial price).
    const newTotalPrice = basePrice + extraCharge;

    setPrice(newTotalPrice);
    updateOrder({
      baseFlavor: selectedFlavor,
      filling: selectedFillings,
      toppings: selectedToppings,
      price: newTotalPrice,
    });
  }, [selectedFlavor, selectedFillings.length, selectedToppings.length, basePrice]);

  return (
    <Box p={3}>
      <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--secondary-color)", mb: 1 }}>
        ⑤ Choose Your Flavor
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

      <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--secondary-color)", mt: 3, mb: 1 }}>
        ⑥ Select Your Fillings
      </Typography>
      <FormControl fullWidth variant="outlined">
        <Select
          multiple
          value={selectedFillings}
          onChange={(e) => setSelectedFillings(e.target.value as string[])}
          renderValue={(selected) => (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {selected.map((filling) => (
                <Chip key={filling} label={filling} sx={{ bgcolor: "var(--secondary-color)", color: "white", fontWeight: "bold" }} />
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

      <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "var(--secondary-color)", mt: 3, mb: 1 }}>
        ⑦ Choose Toppings (One-Time charge of $7.99)
      </Typography>
      <FormControl fullWidth variant="outlined">
        <Select
          multiple
          value={selectedToppings}
          onChange={(e) => setSelectedToppings(e.target.value as string[])}
          renderValue={(selected) => (
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {selected.map((topping) => (
                <Chip key={topping} label={topping} sx={{ bgcolor: "var(--secondary-color)", color: "white", fontWeight: "bold" }} />
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