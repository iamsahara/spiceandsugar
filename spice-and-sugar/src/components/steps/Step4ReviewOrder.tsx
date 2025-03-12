"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  TextField,
  Link,
} from "@mui/material";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import PaymentIcon from "@mui/icons-material/Payment";
import AppleIcon from "@mui/icons-material/Apple";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const colorHexMap: Record<string, string> = {
  White: "#FFFFFF",
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#008000",
  Pink: "#FFC0CB",
  Yellow: "#FFFF00",
  Orange: "#FFA500",
  Purple: "#800080",
  Brown: "#964B00",
};

interface Step4Props {
  onBack: () => void;
  orderDetails: {
    cakeType: "Sponge Cake" | "Butter Cake" | "Fondant Cake";
    shape: "Square" | "Round" | "Heart" | "Rectangle";
    levels: number;
    color: string;
    weight: number;
    filling: string[] | null;
    toppings: string[];
    customText: string;
    price: number;
    imageUrl?: string;
  };
  updateOrder: (data: { imageUrl: string }) => void;
}

const Step4ReviewOrder: React.FC<Step4Props> = ({
  onBack,
  orderDetails,
  updateOrder,
}) => {
  const [extraDescription, setExtraDescription] = useState("");

  const cakeDescription = `
  A ${orderDetails.levels}-tier ${orderDetails.shape.toLowerCase()} ${orderDetails.cakeType} 
  with ${orderDetails.color} color,
  ${orderDetails.filling?.length ? `filled with ${orderDetails.filling.join(", ")}` : "without filling"},
  topped with ${orderDetails.toppings.length ? orderDetails.toppings.join(", ") : "no toppings"}${
    orderDetails.customText ? `, and the message: "${orderDetails.customText}"` : ""
  }.
`;

  return (
    <Box
      sx={{
        p: 3,
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(12px)",
        borderRadius: 4,
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.12)",
        maxWidth: 550,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <ShoppingCartIcon sx={{ color: "var(--secondary-color)" }} />
            <Typography variant="h6" fontWeight="bold" color="var(--secondary-color)">
              Confirm Your Cake Order
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" sx={{ mb: 2, textAlign: "left", lineHeight: 1.7 }}>
            {cakeDescription}
          </Typography>

          <Typography variant="h6" fontWeight="bold" color="#388E3C">
            Total: ${orderDetails.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {orderDetails.imageUrl && (
        <CldImage
          src={orderDetails.imageUrl}
          width={250}
          height={250}
          alt="Cake reference"
          style={{ borderRadius: "10px", marginBottom: "15px" }}
        />
      )}

      <CldUploadWidget
        uploadPreset="<your_upload_preset>" // replace with your actual preset from Cloudinary
        onSuccess={(result) => {
          if (result.info && typeof result.info === "object") {
            const uploadedImage = result.info.public_id;
            updateOrder({ imageUrl: uploadedImage });
          }
        }}
      >
        {({ open }) => (
          <Button
            variant="contained"
            onClick={() => open()}
            sx={{
              borderRadius: 3,
              bgcolor: "var(--primary-color)",
              my: 1,
              textTransform: "none",
            }}
          >
            Upload Image of Cake Idea 📸
          </Button>
        )}
      </CldUploadWidget>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          Any special requests?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Add special instructions or notes here."
          value={extraDescription}
          onChange={(e) => setExtraDescription(e.target.value)}
          sx={{ background: "#fff", borderRadius: 2 }}
        />
      </Box>

      <Stack spacing={1.5} alignItems="center">
        <Typography variant="body2" fontWeight="medium">
          Proceed to payment:
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: 3, bgcolor: "var(--primary-color)" }}
          >
            <PaymentIcon fontSize="small" sx={{ mr: 0.5 }} /> Credit Card
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: 3, bgcolor: "#000", color: "#fff" }}
          >
            <AppleIcon fontSize="small" sx={{ mr: 0.5 }} /> Apple Pay
          </Button>
        </Stack>

        <Divider sx={{ width: "80%", my: 2 }} />

        <Typography variant="body2" fontWeight="medium">
          Prefer to finalize your order by phone?
        </Typography>

        <Button
          component={Link}
          href="tel:+1234567890"
          variant="outlined"
          color="success"
          startIcon={<PhoneIcon />}
          sx={{ borderRadius: 3 }}
        >
          Call us to Complete Order
        </Button>

        <Button variant="text" onClick={onBack} sx={{ mt: 1, fontSize: "0.8rem" }}>
          ⬅ Modify Order
        </Button>
      </Stack>
    </Box>
  );
};

export default Step4ReviewOrder;