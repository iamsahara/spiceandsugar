"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

interface Step3Props {
  updateOrder: (
    updatedData: Partial<{ color?: string; customText: string }>
  ) => void;
  orderDetails: { cakeType: string; color?: string; customText: string };
}

const cakeColorOptions = [
  "White",
  "Red",
  "Blue",
  "Green",
  "Pink",
  "Yellow",
  "Orange",
  "Purple",
  "Brown",
];

const Step3FlavorColorMessage: React.FC<Step3Props> = ({
  updateOrder,
  orderDetails,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    orderDetails.color || "White"
  ); 
  const [customText, setCustomText] = useState(orderDetails.customText || "");

  useEffect(() => {
    updateOrder({ color: selectedColor, customText });
  }, [selectedColor, customText]);

  return (
    <Box p={2}>
      {orderDetails.cakeType === "Butter Cake" && (
        <Stack direction="column" alignItems="left" spacing={1} mb={2}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.15rem",
              fontWeight: "bold",
              color: "var( --secondary-color)",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            ⑧ Color
          </Typography>
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Select a Color</InputLabel>
            <Select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {cakeColorOptions.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}

      <Stack direction="column" alignItems="left" spacing={1} mt={2}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.15rem",
            fontWeight: "bold",
            color: "var( --secondary-color)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          ⑨ Write on Your Cake ✍️
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Happy Birthday, Sarah!"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          sx={{
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "var( --primary-color)" },
              "&:hover fieldset": { borderColor: "var( --primary-color)" },
              "&.Mui-focused fieldset": { borderColor: "var( --primary-color)" },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Step3FlavorColorMessage;
