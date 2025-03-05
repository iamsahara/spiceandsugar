"use client";
import { useState, useEffect } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ customText: string }>) => void;
  orderDetails: { customText: string };
}

const Step6CustomMessage: React.FC<Step6Props> = ({ onNext, onBack, updateOrder, orderDetails }) => {
  const [customText, setCustomText] = useState(orderDetails.customText || "");

  useEffect(() => {
    updateOrder({ customText });
  }, [customText]);


  return (
    <Box textAlign="center" p={3}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: "#8EC5C0", mb: 2 }}>
        Add a Custom Message 🎂
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Happy Birthday!"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        sx={{
          mt: 2,
          mb: 3,
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#8EC5C0" },
            "&:hover fieldset": { borderColor: "#8EC5C0" },
            "&.Mui-focused fieldset": { borderColor: "#8EC5C0" },
          },
        }}
      />
    </Box>
  );
};

export default Step6CustomMessage;