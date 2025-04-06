"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
} from "@mui/material";

interface Step2Props {
  onBack: () => void;
  onNext: () => void;
  updateOrder: (
    updatedData: Partial<{
      baseFlavor: string;
      filling: string[];
      toppings: string[];
      price: number;
      color: string;
      customText: string;
    }>
  ) => void;
  orderDetails: {
    cakeType: string;
    baseFlavor?: string;
    filling: string[];
    toppings: string[];
    price: number;
    color?: string;
    customText?: string;
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

const Step2FlavorFillingToppingText: React.FC<Step2Props> = ({ updateOrder, orderDetails }) => {
  const [selectedFlavor, setSelectedFlavor] = useState(orderDetails.baseFlavor || "Vanilla");
  const [selectedFillings, setSelectedFillings] = useState<string[]>(orderDetails.filling ?? []);
  const [selectedToppings, setSelectedToppings] = useState<string[]>(orderDetails.toppings ?? []);
  const [selectedColor, setSelectedColor] = useState(orderDetails.color || "");
  const [customText, setCustomText] = useState(orderDetails.customText || "");
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

    const newTotalPrice = basePrice + extraCharge;

    setPrice(newTotalPrice);
    updateOrder({
      baseFlavor: selectedFlavor,
      filling: selectedFillings,
      toppings: selectedToppings,
      price: newTotalPrice,
      color: selectedColor,
      customText: customText,
    });
  }, [selectedFlavor, selectedFillings.length, selectedToppings.length, selectedColor, customText, basePrice]);

  return (
    <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        
      }}
    >
      <FormControl fullWidth variant="outlined" sx={{
  mt: 0,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  width:"60%"
}}>
        <InputLabel id="flavor-label"> Flavor</InputLabel>
        <Select
          labelId="flavor-label"
          value={selectedFlavor}
          onChange={(e) => setSelectedFlavor(e.target.value)}
          label=" Flavor"
        >
          {baseFlavors.map((flavor) => (
            <MenuItem key={flavor.value} value={flavor.value}>
              {flavor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" sx={{
  mt: 3,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
}}>
        <InputLabel id="filling-label"> Filling (+$7.99)</InputLabel>
        <Select
          labelId="filling-label"
          multiple
          value={selectedFillings}
          onChange={(e) => setSelectedFillings(e.target.value as string[])}
          label="Filling (+$7.99)"
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

      <FormControl fullWidth variant="outlined" sx={{
  mt: 3,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
}}>
        <InputLabel id="topping-label"> Topping (+$7.99)</InputLabel>
        <Select
          labelId="topping-label"
          multiple
          value={selectedToppings}
          onChange={(e) => setSelectedToppings(e.target.value as string[])}
          label=" Topping (+$7.99)"
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

      <FormControl fullWidth variant="outlined" sx={{
  mt: 3,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
}}>
        <InputLabel id="color-label"> Color</InputLabel>
        <Select
          labelId="color-label"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          label="⑧ Color"
        >
          <MenuItem value="Red">Red</MenuItem>
          <MenuItem value="Blue">Blue</MenuItem>
          <MenuItem value="Green">Green</MenuItem>
          <MenuItem value="Yellow">Yellow</MenuItem>
          <MenuItem value="Pink">Pink</MenuItem>
          <MenuItem value="Purple">Purple</MenuItem>
          <MenuItem value="Orange">Orange</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" sx={{
  mt: 3,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(8px)",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
}}>
        <InputLabel shrink htmlFor="custom-text" sx={{ color: "var(--secondary-color)" }}>
          Cake Text
        </InputLabel>
        <TextField
          id="custom-text"
          fullWidth
          variant="outlined"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Enter your custom text here"
          sx={{  backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"}}
        />
      </FormControl>
    </Box>
  );
};

export default Step2FlavorFillingToppingText;