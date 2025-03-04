"use client";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
  updateOrder: (updatedData: Partial<{ customText: string }>) => void;
}

const Step6CustomMessage: React.FC<Step6Props> = ({ onNext, onBack }) => {
  const [customText, setCustomText] = useState("");

  return (
    <Box>
      <Typography variant="h5">Custom Message</Typography>
      <TextField
        fullWidth
        label="Write a message on your cake"
        placeholder="Happy Birthday!"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default Step6CustomMessage;