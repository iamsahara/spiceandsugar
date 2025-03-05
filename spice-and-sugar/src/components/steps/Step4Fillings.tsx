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

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ filling: string[]; price: number }>) => void;
  orderDetails: { cakeType: string; filling: string[]; price: number };
}

// 🥜 Fillings Options
const simpleCakeFillings = [
  { name: "Apple", price: 0 },
  { name: "Cinnamon", price: 0 },
  { name: "Carrot", price: 0 },
  { name: "Walnuts", price: 3.99 },
  { name: "Pistachio", price: 7.99 },
];

const creamyCakeFillings = [
  { name: "Chocolate", price: 7.99 },
  { name: "Strawberry", price: 7.99 },
  { name: "Blueberry", price: 7.99 },
  { name: "Cherry", price: 7.99 },
  { name: "Banana", price: 7.99 },
  { name: "Raspberry", price: 7.99 },
  { name: "Kiwi", price: 7.99 },
];

const Step4Fillings: React.FC<Step4Props> = ({ updateOrder, orderDetails }) => {
  const [selectedFillings, setSelectedFillings] = useState<string[]>(orderDetails.filling || []);
  const [price, setPrice] = useState(orderDetails.price);
  
  // ✅ Choose available fillings based on cake type
  const availableFillings = orderDetails.cakeType === "simple" ? simpleCakeFillings : creamyCakeFillings;

  useEffect(() => {
    let basePrice = orderDetails.price;
    
    // ✅ Only add price for paid fillings
    let additionalCost = selectedFillings.reduce((total, fillingName) => {
      const filling = availableFillings.find((f) => f.name === fillingName);
      return total + (filling?.price || 0);
    }, 0);

    setPrice(basePrice + additionalCost);
    updateOrder({ filling: selectedFillings, price: basePrice + additionalCost });
  }, [selectedFillings]);

  // ✅ Handle selecting/unselecting fillings
  const handleSelectFilling = (event: any) => {
    setSelectedFillings(event.target.value);
  };

  return (
    <Box textAlign="center" p={1} sx={{ m: "1" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#673AB7", mb: 1 }}>
        Choose Your Fillings 🍰
      </Typography>

      {/* 🏷️ Fillings Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Fillings</InputLabel>
        <Select
          multiple
          value={selectedFillings}
          onChange={handleSelectFilling}
          renderValue={(selected) => (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {selected.map((filling) => (
                <Chip
                  key={filling}
                  label={filling}
                  sx={{ bgcolor: "#FF4081", color: "white", fontWeight: "bold" }}
                />
              ))}
            </Stack>
          )}
        >
          {availableFillings.map((filling) => (
            <MenuItem key={filling.name} value={filling.name}>
              {filling.name} {filling.price > 0 ? `(+$${filling.price.toFixed(2)})` : "(Free)"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Step4Fillings;