"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ filling: string[]; price: number }>) => void;
  orderDetails: { cakeType: string; filling: string[]; price: number; basePrice: number };
}

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

const Step4Fillings: React.FC<Step4Props> = ({ onNext, onBack, updateOrder, orderDetails }) => {
  const [selectedFillings, setSelectedFillings] = useState<string[]>(orderDetails.filling || []);
  const [totalPrice, setTotalPrice] = useState(orderDetails.price);
  const availableFillings = orderDetails.cakeType === "simple" ? simpleCakeFillings : creamyCakeFillings;
  useEffect(() => {
    let basePrice = orderDetails.basePrice ?? orderDetails.price; 
    let additionalCost = selectedFillings.reduce((total, fillingName) => {
      const filling = availableFillings.find((f) => f.name === fillingName);
      return total + (filling?.price ?? 0); 
    }, 0);

    let newTotalPrice = basePrice + additionalCost;
    if (isNaN(newTotalPrice)) {
      newTotalPrice = basePrice;
    }

    setTotalPrice(newTotalPrice);
    updateOrder({
      filling: selectedFillings,
      price: newTotalPrice,
    });
  }, [selectedFillings, orderDetails.basePrice, availableFillings]); 

  const handleSelectFilling = (filling: string) => {
    setSelectedFillings((prev) =>
      prev.includes(filling) ? prev.filter((item) => item !== filling) : [...prev, filling]
    );
  };

  return (
    <Box textAlign="center" p={1} sx={{ m:"1"}}>
     <Typography variant="h6" sx={{ fontWeight: 700, color: "#673AB7", mb: 1 }}>
        Choose Your Fillings
      </Typography>
      <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap">
        {availableFillings.map((filling) => (
          <Button
            key={filling.name}
            variant={selectedFillings.includes(filling.name) ? "contained" : "outlined"}
            onClick={() => handleSelectFilling(filling.name)}
            color={selectedFillings.includes(filling.name) ? "secondary" : "primary"}
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
              px: 1,
              py: 1.2,
              fontSize: "0.7rem",
            }}
          >
            {filling.name} {filling.price > 0 ? `(+$${filling.price.toFixed(2)})` : "(Free)"}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Step4Fillings;