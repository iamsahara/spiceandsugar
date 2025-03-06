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
  Grid,
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

const SpongeCakeFillings = [
  { name: "Apple", price: 0 },
  { name: "Cinnamon", price: 0 },
  { name: "Carrot", price: 0 },
  { name: "Walnuts", price: 3.99 },
  { name: "Pistachio", price: 7.99 },
];

const ButterCakeFillings = [
  { name: "Chocolate", price: 7.99 },
  { name: "Strawberry", price: 7.99 },
  { name: "Blueberry", price: 7.99 },
  { name: "Cherry", price: 7.99 },
  { name: "Banana", price: 7.99 },
  { name: "Raspberry", price: 7.99 },
  { name: "Kiwi", price: 7.99 },
];

// 🍓 **Available Toppings**
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
];

const Step2FillingsToppings: React.FC<Step2Props> = ({
  updateOrder,
  orderDetails,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    orderDetails.baseFlavor || "Vanilla"
  );
  const [selectedFillings, setSelectedFillings] = useState<string[]>(
    orderDetails.filling || []
  );
  const [selectedToppings, setSelectedToppings] = useState<string[]>(
    orderDetails.toppings || []
  );
  const [price, setPrice] = useState(orderDetails.price);
  const availableFillings =
    orderDetails.cakeType === "Sponge Cake"
      ? SpongeCakeFillings
      : ButterCakeFillings;

  useEffect(() => {
    let basePrice = orderDetails.price;
    let additionalFillingCost = selectedFillings.reduce(
      (total, fillingName) => {
        const filling = availableFillings.find((f) => f.name === fillingName);
        return total + (filling?.price || 0);
      },
      0
    );
    let additionalToppingCost = selectedToppings.length > 0 ? 4.99 : 0;

    let newTotalPrice =
      basePrice + additionalFillingCost + additionalToppingCost;

    setPrice(newTotalPrice);
    updateOrder({
      baseFlavor: selectedFlavor,
      filling: selectedFillings,
      toppings: selectedToppings,
      price: newTotalPrice,
    });
  }, [selectedFlavor, selectedFillings, selectedToppings]);

  const handleSelectFlavor = (event: SelectChangeEvent<string>) => {
    setSelectedFlavor(event.target.value);
  };

  const handleSelectFilling = (event: SelectChangeEvent<string[]>) => {
    setSelectedFillings(event.target.value as string[]);
  };
  const handleSelectTopping = (event: SelectChangeEvent<string[]>) => {
    setSelectedToppings(event.target.value as string[]);
  };

  return (
    <Box p={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "#FF4081",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            ⑤ Flavor
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Select Flavor</InputLabel>
            <Select value={selectedFlavor} onChange={handleSelectFlavor}>
              {baseFlavors.map((flavor) => (
                <MenuItem key={flavor.value} value={flavor.value}>
                  {flavor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "#FF4081",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            ⑥ Fillings
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
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
                      sx={{
                        bgcolor: "#FF4081",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ))}
                </Stack>
              )}
            >
              {availableFillings.map((filling) => (
                <MenuItem key={filling.name} value={filling.name}>
                  {filling.name}{" "}
                  {filling.price > 0
                    ? `(+$${filling.price.toFixed(2)})`
                    : "(Free)"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "#FF4081",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            ⑦ Toppings
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Select Toppings (One-Time $4.99)</InputLabel>
            <Select
              multiple
              value={selectedToppings}
              onChange={handleSelectTopping}
              renderValue={(selected) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {selected.map((topping) => (
                    <Chip
                      key={topping}
                      label={topping}
                      sx={{
                        bgcolor: "#FF4081",
                        color: "white",
                        fontWeight: "bold",
                      }}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2FillingsToppings;
