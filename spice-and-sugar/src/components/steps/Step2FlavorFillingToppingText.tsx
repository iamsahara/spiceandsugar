"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
} from "@mui/material";
import { OrderDetails } from "@/types";

export interface Step2Props {
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
  orderDetails: OrderDetails;
}

const baseFlavors = [
  { name: "Vanilla", value: "Vanilla" },
  { name: "Chocolate", value: "Chocolate" },
];

const SpongeCakeFillings = [
  "Apple",
  "Cinnamon",
  "Carrot",
  "Walnuts",
  "Pistachio",
];
const ButterAndFondantCakeFillings = [
  "Chocolate",
  "Strawberry",
  "Blueberry",
  "Cherry",
  "Banana",
  "Raspberry",
  "Kiwi",
];

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

const Step2FlavorFillingToppingText: React.FC<Step2Props> = ({
  updateOrder,
  orderDetails,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState(
    orderDetails.baseFlavor || "Vanilla"
  );
  const [selectedFillings, setSelectedFillings] = useState<string[]>(
    orderDetails.filling ?? []
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>(
    orderDetails.toppings ?? []
  );
  const [selectedColor, setSelectedColor] = useState(
    orderDetails.color || "white"
  );
  const [customText, setCustomText] = useState(orderDetails.customText || "");
  const basePrice = orderDetails.price;

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
      extraCharge = 15.0;
    } else if (hasFillings || hasToppings) {
      extraCharge = 7.99;
    }

    const newTotalPrice = basePrice + extraCharge;

    updateOrder({
      baseFlavor: selectedFlavor,
      filling: selectedFillings,
      toppings: selectedToppings,
      price: newTotalPrice,
      color: selectedColor,
      customText: customText,
    });
  }, [selectedFillings.length, selectedToppings.length, customText, basePrice]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormControl
        variant="outlined"
        sx={{
          mt: 3,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          width: {
            xs: "10rem",
            sm: "10rem",
            md: "10rem",
            lg: "10rem",
            xl: "10rem",
          },
        }}
      >
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

      <FormControl
        variant="outlined"
        sx={{
          mt: 3,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          width: {
            xs: "25rem",
            sm: "95%",
            md: "90%",
            lg: "85%",
            xl: "80%",
          },
        }}
      >
        <InputLabel id="filling-label"> Filling (+$7.99)</InputLabel>
        <Select
          labelId="filling-label"
          multiple
          value={selectedFillings}
          onChange={(e) => setSelectedFillings(e.target.value as string[])}
          label="Filling (+$7.99)"
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                gap: 1,
                py: 0.5,
                minHeight: '40px',
              }}
            >
              {selected.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "white",
                    fontWeight: "bold",
                    px: 1,
                    py: 0.5,
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    whiteSpace: 'nowrap',
                  }}
                />
              ))}
            </Box>
          )}
        >
          {availableFillings.map((filling) => (
            <MenuItem key={filling} value={filling}>
              {filling}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        variant="outlined"
        sx={{
          mt: 3,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          width: {
            xs: "25rem",
            sm: "95%",
            md: "90%",
            lg: "85%",
            xl: "80%",
          },

        }}
      >
        <InputLabel id="topping-label"> Topping (+$7.99)</InputLabel>
        <Select
          labelId="topping-label"
          multiple
          value={selectedToppings}
          onChange={(e) => setSelectedToppings(e.target.value as string[])}
          label=" Topping (+$7.99)"
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                gap: 1,
                py: 0.5,
                minHeight: '40px',
              }}
            >
              {selected.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{
                    bgcolor: "var(--primary-color)",
                    color: "white",
                    fontWeight: "bold",
                    px: 1,
                    py: 0.5,
                    fontSize: "0.75rem",
                    borderRadius: "8px",
                    whiteSpace: 'nowrap',
                  }}
                />
              ))}
            </Box>
          )}
        >
          {availableToppings.map((topping) => (
            <MenuItem key={topping} value={topping}>
              {topping}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        sx={{
          mt: 3,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          width: {
            xs: "10rem",
            sm: "95%",
            md: "90%",
            lg: "85%",
            xl: "80%",
          },
         
        }}
      >
        <InputLabel id="color-label"> Color</InputLabel>
        <Select
          labelId="color-label"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          label="⑧ Color"
        >
          <MenuItem value="White">White</MenuItem>
          <MenuItem value="Red">Red</MenuItem>
          <MenuItem value="Blue">Blue</MenuItem>
          <MenuItem value="Green">Green</MenuItem>
          <MenuItem value="Yellow">Yellow</MenuItem>
          <MenuItem value="Pink">Pink</MenuItem>
          <MenuItem value="Purple">Purple</MenuItem>
          <MenuItem value="Orange">Orange</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="custom-text"
        label="Cake Text"
        variant="outlined"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        placeholder="Happy Birthday Sarah"
        fullWidth
        InputLabelProps={{
          sx: {
            color: "var(--primary-color)",
            fontSize: "0.85rem",
          },
        }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          mt: 1,
          maxWidth: "800px",
          width: {
            xs: "100%",
            sm: "95%",
            md: "90%",
            lg: "85%",
            xl: "80%",
          },
        }}
      />
    </Box>
  );
};

export default Step2FlavorFillingToppingText;
