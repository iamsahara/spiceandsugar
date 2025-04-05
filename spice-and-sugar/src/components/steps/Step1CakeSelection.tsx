"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Lottie from "lottie-react";
import animation3 from "../../../public/animations/5.json";
import animation4 from "../../../public/animations/4.json";
import animation5 from "../../../public/animations/3.json";
import Step2FlavorFillingToppingText from "./Step2FlavorFillingToppingText";

const tierAnimations = [
  { tier: 1, animation: animation3 },
  { tier: 2, animation: animation4 },
  { tier: 3, animation: animation5 },
];

interface OrderDetails {
  cakeType: "Sponge Cake" | "Butter Cake" | "Fondant Cake";
  weight: number;
  shape: "Square" | "Round" | "Heart" | "Rectangle";
  levels: number;
  price: number;
}

interface Step1Props {
  onBack: () => void;
  onNext: () => void;
  orderDetails: {
    cakeType: "Sponge Cake" | "Butter Cake" | "Fondant Cake";
    weight: number;
    shape: "Square" | "Round" | "Heart" | "Rectangle";
    levels: number;
    price: number;
  };
  updateOrder: (updatedData: Partial<OrderDetails>) => void;
}

const availableShapes = ["Square", "Round", "Heart", "Rectangle"];
const weightOptions = [
  { weight: 1, serves: "4-6 people" },
  { weight: 1.5, serves: "6-8 people" },
  { weight: 2, serves: "8-10 people" },
  { weight: 2.5, serves: "10-12 people" },
  { weight: 3, serves: "12-15 people" },
  { weight: 4, serves: "15-20 people" },
  { weight: 5, serves: "20-25 people" },
];

const Step1CakeSelection: React.FC<Step1Props> = ({
  orderDetails,
  updateOrder,
}) => {
  const [selectedCakeType, setSelectedCakeType] = useState<
    "Sponge Cake" | "Butter Cake" | "Fondant Cake"
  >(orderDetails.cakeType || "Sponge Cake");
  const [selectedWeight, setSelectedWeight] = useState<number>(
    orderDetails.weight || 1
  );
  const [selectedShape, setSelectedShape] = useState<
    "Square" | "Round" | "Heart" | "Rectangle"
  >(orderDetails.shape || "Square");
  const [cakeTiers, setCakeTiers] = useState<number>(orderDetails.levels || 1);
  const [price, setPrice] = useState(orderDetails.price || 18.65);

  useEffect(() => {
    let basePrice;
    switch (selectedCakeType) {
      case "Sponge Cake":
        basePrice = 18.65;
        break;
      case "Butter Cake":
        basePrice = 27.99;
        break;
      case "Fondant Cake":
        basePrice = 38.0;
        break;
      default:
        basePrice = 18.65;
    }
    const calculatedPrice = basePrice * selectedWeight * cakeTiers;
    setPrice(calculatedPrice);
    updateOrder({
      cakeType: selectedCakeType,
      weight: selectedWeight,
      shape: selectedShape,
      levels: cakeTiers,
      price: calculatedPrice,
    });
  }, [selectedCakeType, selectedWeight, selectedShape, cakeTiers]);

  return (
  
    <Box sx={{   display: "flex",
      flexDirection: "column",
      justifyContent: "center", position: "relative",width:"400px", height:"800px", mt:"3rem",pt:"1rem", backgroundColor: "rgba(255, 255, 255, 0.3)", 
      backdropFilter: "blur(10px)" }}>
      <Stack spacing={1} alignItems="center">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            {["Sponge Cake", "Butter Cake", "Fondant Cake"].map((type) => (
              <Card
                key={type}
                sx={{
                  width: 80,
                  height: 130,
                  borderRadius: "8px",
                  border:
                    selectedCakeType === type
                      ? "2px solid var(--secondary-color)"
                      : "2px solid #E0E0E0",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() =>
                  setSelectedCakeType(
                    type as "Sponge Cake" | "Butter Cake" | "Fondant Cake"
                  )
                }
              >
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                  <img
                    src={`/cake-${type}.png`}
                    alt={`${type} cake`}
                    width="100%"
                  />
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: "bold" }}>
                    {type}
                  </Typography>
                  <Typography sx={{ fontSize: "0.7rem" }} color="black">
                    $
                    {type === "Sponge Cake"
                      ? "18.65/kg"
                      : type === "Butter Cake"
                      ? "27.99/kg"
                      : "38.00/kg"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <FormControl
          sx={{
            mt:0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <InputLabel id="weight-label">Weight</InputLabel>
          <Select
            labelId="weight-label"
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value as number)}
            input={<OutlinedInput label="Weight" />}
          >
            {weightOptions.map(({ weight, serves }) => (
              <MenuItem key={weight} value={weight}>
                {weight} kg - {serves}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            width: 300,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <InputLabel id="shape-label">Shape</InputLabel>
          <Select
            labelId="shape-label"
            value={selectedShape}
            onChange={(e) =>
              setSelectedShape(
                e.target.value as "Square" | "Round" | "Heart" | "Rectangle"
              )
            }
            input={<OutlinedInput label="Shape" />}
          >
            {availableShapes.map((shape) => (
              <MenuItem key={shape} value={shape}>
                {shape}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1}>
          {tierAnimations.map(({ tier, animation }) => (
            <Box
              key={tier}
              textAlign="center"
              onClick={() => setCakeTiers(tier)}
              sx={{
                cursor: "pointer",
                border:
                  cakeTiers === tier
                    ? "2px solid var(--secondary-color)"
                    : "2px solid #E0E0E0",
                borderRadius: "8px",
                padding: "2px",
              }}
            >
              <Lottie
                animationData={animation}
                style={{ width: 100, height: 100 }}
              />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                Tier {tier}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Step2FlavorFillingToppingText
          updateOrder={updateOrder}
          orderDetails={{
            ...orderDetails,
            cakeType: selectedCakeType,
            weight: selectedWeight,
            shape: selectedShape,
            levels: cakeTiers,
            price,
          }}
        />
      </Stack>

    </Box>
 
  );
};

export default Step1CakeSelection;
