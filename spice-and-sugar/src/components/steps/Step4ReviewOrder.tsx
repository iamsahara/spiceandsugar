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


interface OrderDetails {
  cakeType: "Sponge Cake" | "Butter Cake" | "Fondant Cake";
  baseFlavor?: string;
  shape: "Round" | "Square" | "Heart" | "Rectangle";
  levels: number;
  color: string;
  weight: number;
  filling: string[];
  toppings: string[];
  customText?: string; 
  price: number;
  imageUrl?: string;
  extraDescription?: string; 
}

interface Step4Props {
  onBack: () => void;
  onNext: () => void;
  updateOrder: (updatedData: Partial<OrderDetails>) => void;
  orderDetails: OrderDetails; 
}

const Step4ReviewOrder: React.FC<Step4Props> = ({
  onBack,
  orderDetails,
  updateOrder,
}) => {
  const [extraDescription, setExtraDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const cakeDescription = `
  A ${orderDetails.levels}-tier ${orderDetails.shape.toLowerCase()} ${
    orderDetails.cakeType
  } 
  with ${orderDetails.color} color,
  ${
    orderDetails.filling?.length
      ? `filled with ${orderDetails.filling.join(", ")}`
      : "without filling"
  },
  topped with ${
    orderDetails.toppings.length
      ? orderDetails.toppings.join(", ")
      : "no toppings"
  }${
    orderDetails.customText
      ? `, and the message: "${orderDetails.customText}"`
      : ""
  }.
`;

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderDetails,
          extraDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Order submission failed");
      }

      setOrderConfirmed(true);
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        width: "95%",
        p: 3,
        // backgroundColor: "rgba(255,255,255,0.3)",
        // backdropFilter: "blur(12px)",
        borderRadius: "20px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <ShoppingCartIcon sx={{ color: "var(--secondary-color)" }} />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="var(--secondary-color)"
            >
              Confirm Your Cake Order
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body2"
            sx={{ mb: 2, textAlign: "left", lineHeight: 1.7 }}
          >
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
        uploadPreset={"My_preset"}
        onSuccess={(result) => {
          setUploadError("");
          if (result.info && typeof result.info === "object") {
            const uploadedImage = result.info.secure_url;
            if (typeof updateOrder === "function") {
              updateOrder({ imageUrl: uploadedImage }); 
            } else {
              console.error("❌ updateOrder is not a function. Check if it's passed correctly.");
            }
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

      {uploadError && (
        <Typography color="error" sx={{ mt: 1, fontSize: "0.85rem" }}>
          {uploadError}
        </Typography>
      )}

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
      <Button
        variant="contained"
        onClick={handleSubmitOrder}
        disabled={isSubmitting || orderConfirmed}
        sx={{
          borderRadius: 3,
          bgcolor: "var(--secondary-color)",
          my: 1,
          textTransform: "none",
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit Order"}
      </Button>

      {orderConfirmed && (
        <Typography variant="body2" color="green" sx={{ mt: 2 }}>
          ✅ Order submitted! Proceed with payment.
        </Typography>
      )}

      <Stack spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight="medium">
          Proceed to payment:
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small" disabled={!orderConfirmed}>
            <PaymentIcon fontSize="small" sx={{ mr: 0.5 }} /> Credit Card
          </Button>

          <Button variant="contained" size="small" disabled={!orderConfirmed}>
            <AppleIcon fontSize="small" sx={{ mr: 0.5 }} /> Apple Pay
          </Button>
        </Stack>

        <Divider sx={{ width: "80%", my: 2 }} />

        <Button
          component={Link}
          href="tel:+14379811399"
          variant="outlined"
          color="success"
        >
          <PhoneIcon /> Call to Complete Order
        </Button>

        <Button variant="text" onClick={onBack}>
          ⬅ Modify Order
        </Button>
      </Stack>
    </Box>
  );
};

export default Step4ReviewOrder;
