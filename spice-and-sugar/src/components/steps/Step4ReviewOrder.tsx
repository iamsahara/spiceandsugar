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
import { OrderDetails } from "@/types";


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
        minHeight: "800px",
        p: { xs: 3, md: 5 },
        borderRadius: "28px",
        mx: "auto",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        maxWidth: 700,
      }}
    >
      <Card sx={{
        mb: 3,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.85)",
      }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
            <ShoppingCartIcon sx={{ color: "var(--secondary-color)" }} />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="var(--secondary-color)"
            >
             
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Typography
            variant="body2"
            sx={{ mb: 2, textAlign: "left", lineHeight: 1.7 }}
          >
            {cakeDescription}
          </Typography>
        </CardContent>
      </Card>

      {orderDetails.imageUrl && (
        <CldImage
          src={orderDetails.imageUrl}
          width={250}
          height={250}
          alt="Cake reference"
          style={{ borderRadius: "16px", marginBottom: "20px", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
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
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: "999px",
              background: "linear-gradient(135deg, #e48ca4, #f7c2cc)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #d87d98, #f1aebb)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            Upload Image 📸 
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
          sx={{
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 3,
            mt: 1,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmitOrder}
        disabled={isSubmitting || orderConfirmed}
        sx={{
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: "999px",
              background: "linear-gradient(135deg, #e48ca4, #f7c2cc)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #d87d98, #f1aebb)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
              },}}
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
          Proceed to the payment:
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small" disabled={!orderConfirmed} sx={{
            borderRadius: 2,
            px: 2.5,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
          }}>
            <PaymentIcon fontSize="small" sx={{ mr: 0.5 }} /> Credit Card
          </Button>

          <Button variant="contained" size="small" disabled={!orderConfirmed} sx={{
            borderRadius: 2,
            px: 2.5,
            py: 1,
            fontSize: "0.875rem",
            textTransform: "none",
          }}>
            <AppleIcon fontSize="small" sx={{ mr: 0.5 }} /> Apple Pay
          </Button>
        </Stack>

        <Divider sx={{ width: "80%", my: 2 }} />

        <Button
          component={Link}
          href="tel:+14379811399"
          variant="outlined"
          sx={{
            border: "2px solid var(--primary-color)",
            color: "var(--sprimary-color)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            fontWeight: "bold",
            px: 3,
            py: 1.25,
            borderRadius: "10px",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <PhoneIcon sx={{ mr: 1 }} /> Once you submit your order, please give us a call to proceed with payment. Online payment is not available yet! 
        </Button>

        <Button variant="text" onClick={onBack} sx={{
          borderRadius: 2,
          px: 2.5,
          py: 1,
          fontSize: "0.875rem",
          textTransform: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}>
          ⬅ Modify Order
        </Button>
      </Stack>
    </Box>
  );
};

export default Step4ReviewOrder;
