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
  Grid,
} from "@mui/material";
import Lottie from "lottie-react";
import animation3 from "../../../public/animations/5.json";
import animation4 from "../../../public/animations/4.json";
import animation5 from "../../../public/animations/3.json";

const tierAnimations = [
  { tier: 1, animation: animation3 },
  { tier: 2, animation: animation4 },
  { tier: 3, animation: animation5 },
];

interface OrderDetails {
  cakeType: "Sponge Cake" | "Butter Cake" | "Fondant Cake";
  weight: number;
  shape: "Square" | "Round"| "Heart"|"Rectangle";
  levels: number;
  price: number;
}

interface Step1Props {
  onBack: () => void;
  onNext: () => void;
  orderDetails: {
    cakeType: "Sponge Cake" | "Butter Cake" | "Fondant Cake";
    weight: number;
    shape: "Square" | "Round"| "Heart"|"Rectangle";
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
    <Box sx={{
      width: "95%",
      p: 3,
      // backgroundColor: "rgba(255,255,255,0.3)",
      // backdropFilter: "blur(12px)",
      borderRadius: "20px",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
      mx: "auto",
    }}>
      <Grid container spacing={2} alignItems="center" direction="column">
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "var( --secondary-color)",
            }}
          >
            ① 
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={3}>
            {["Sponge Cake", "Butter Cake", "Fondant Cake"].map((type) => (
              <Card
                key={type}
                sx={{
                  width: 80,
                  height: 130,
                  borderRadius: "8px",
                  border:
                    selectedCakeType === type
                      ? "2px solid var( --secondary-color)"
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
        </Grid>

        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "var( --secondary-color)",
            }}
          >
            ② 
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl sx={{ width: "280px" }}>
            <Select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value as number)}
              sx={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(1px)",
              }}
            >
              {weightOptions.map(({ weight, serves }) => (
                <MenuItem key={weight} value={weight}>
                  {weight} kg - {serves}
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
              color: "var( --secondary-color)",
            }}
          >
            ③ 
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <FormControl sx={{ width: "280px" }}>
            <Select
              value={selectedShape}
              onChange={(e) => setSelectedShape(e.target.value as "Square" | "Round" | "Heart" | "Rectangle")}
              sx={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.3)",
                backdropFilter: "blur(1px)",
              }}
            >
              {availableShapes.map((shape) => (
                <MenuItem key={shape} value={shape}>
                  {shape}
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
              color: "var( --secondary-color)",
            }}
          >
            ④
          </Typography>
        </Grid>
        <Grid item xs={8}>
        <Stack direction="row" spacing={3}>
          {tierAnimations.map(({ tier, animation }) => (
            <Box key={tier} textAlign="center" onClick={() => setCakeTiers(tier)} sx={{ cursor: "pointer" }}>
              <Lottie animationData={animation} style={{ width: 100, height: 100 }}  />
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }} />
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
                padding: "8px",
              }}
            >
              <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                Tier {tier}
              </Typography>
            </Box>
            </Box>
          ))}
        </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1CakeSelection;
