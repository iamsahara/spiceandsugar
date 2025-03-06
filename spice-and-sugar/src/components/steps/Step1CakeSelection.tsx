"use client";
import { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography, Stack, FormControl, Select, MenuItem, Grid } from "@mui/material";

interface StepProps {
  onNext: () => void;
  updateOrder: (updatedData: Partial<OrderDetails>) => void;
  orderDetails: OrderDetails;
}

const weightOptions = [
  { weight: 1, serves: "4-6 people" },
  { weight: 1.5, serves: "6-8 people" },
  { weight: 2, serves: "8-10 people" },
  { weight: 2.5, serves: "10-12 people" },
  { weight: 3, serves: "12-15 people" },
  { weight: 4, serves: "15-20 people" },
  { weight: 5, serves: "20-25 people" },
];

const StepCakeSelection: React.FC<StepProps> = ({ updateOrder, orderDetails, onNext }) => {
  const [selectedCakeType, setSelectedCakeType] = useState<"Sponge Cake" | "Butter Cake">(orderDetails.cakeType || "Sponge Cake");
  const [selectedWeight, setSelectedWeight] = useState<number>(orderDetails.weight || 1);
  const [selectedShape, setSelectedShape] = useState<string>(orderDetails.shape || "round");
  const [cakeTiers, setCakeTiers] = useState<number>(orderDetails.levels || 1);
  const [price, setPrice] = useState(orderDetails.price || 18.65);

  useEffect(() => {
    const basePrice = selectedCakeType === "Sponge Cake" ? 18.65 : 27.99;
    const calculatedPrice = basePrice * selectedWeight * cakeTiers;
    setPrice(calculatedPrice);
    updateOrder({ cakeType: selectedCakeType, weight: selectedWeight, shape: selectedShape, levels: cakeTiers, price: calculatedPrice });
  }, [selectedCakeType, selectedWeight, selectedShape, cakeTiers]);

  return (
    <Box p={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography variant="h6" sx={{ fontSize: "1.15rem", fontWeight: "bold", color: "#FF4081", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
            ① Type
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={6}>
            {["Sponge Cake", "Butter Cake"].map((type) => (
              <Card
                key={type}
                sx={{
                  width: 80,
                  height: 130,
                  borderRadius: "8px",
                  border: selectedCakeType === type ? "2px solid #FF4081" : "2px solid #E0E0E0",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => setSelectedCakeType(type as "Sponge Cake" | "Butter Cake")}
              >
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                  <img src={`/cake-${type}.png`} alt={`${type} cake`} width="100%" />
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                    {type}
                  </Typography>
                  <Typography sx={{ fontSize: "0.7rem" }} color="black">
                    ${type === "Sponge Cake" ? "18.65/kg" : "27.99/kg"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{fontSize: "1.15rem", fontWeight:"bold", color: "#FF4081", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
            ② Size
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl sx={{ width: "240px" }}>
            <Select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value as number)}
              sx={{fontSize:"0.8rem", borderRadius: 2, fontWeight: "bold", bgcolor: "rgba(255,255,255,0.3)", backdropFilter: "blur(1px)" }}
            >
              {weightOptions.map(({ weight, serves }) => (
                <MenuItem  key={weight} value={weight}>
                  {weight} kg - {serves}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{fontSize: "1.15rem", fontWeight: "bold", color: "#FF4081", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
            ③ Shape
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={1}>
            {["round", "square"].map((shape) => (
              <Button
                key={shape}
                variant={selectedShape === shape ? "contained" : "outlined"}
                sx={{
                  minWidth: 50,
                  height: 70,
                  borderRadius: shape === "round" ? "50%" : "4px",
                  bgcolor: selectedShape === shape ? "#8EC5C0" : "#F5F5F5",
                  color: selectedShape === shape ? "white" : "#8EC5C0",
                  border: "2px solid #FF4081",
                  "&:hover": { bgcolor: "#8EC5C0", color: "white" },
                }}
                onClick={() => setSelectedShape(shape)}
              >
                {shape}
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" sx={{fontSize: "1.15rem", fontWeight: "bold", color: "#FF4081", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
            ④ Tiers
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={1}>
            {[1, 2, 3].map((tier) => (
              <Button
                key={tier}
                variant={cakeTiers === tier ? "contained" : "outlined"}
                sx={{
                  minWidth: 5,
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                  bgcolor: cakeTiers === tier ? "#8EC5C0" : "white",
                  color: cakeTiers === tier ? "white" : "#8EC5C0",
                  border: "2px solid #FF4081",
                  "&:hover": { bgcolor: "#8EC5C0", color: "white" },
                }}
                onClick={() => setCakeTiers(tier)}
              >
                {tier}-Tier
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepCakeSelection;