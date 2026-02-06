"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  TextField,
  Snackbar,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { OrderDetails } from "@/types";
import { addToCart } from "@/lib/cart";


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
  const [addedOpen, setAddedOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

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

      addToCart({
        id: `custom-${Date.now()}`,
        name: "Custom Cake Order",
        price: orderDetails.price,
        quantity: orderDetails.weight || 1,
        type: "custom",
        details: cakeDescription.trim(),
      });
      setAddedOpen(true);
      setOrderConfirmed(true);
      router.push("/cart");
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "800px" },
        p: { xs: 3, md: 5 },
        borderRadius: "var(--radius-lg)",
        mx: "auto",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(14px)",
        boxShadow: "var(--shadow-soft)",
        transition: "all 0.3s ease-in-out",
        maxWidth: 700,
      }}
    >
      <Card sx={{
        mb: 3,
        boxShadow: "0 8px 18px rgba(32, 24, 22, 0.1)",
        borderRadius: "16px",
        backgroundColor: "rgba(255,255,255,0.95)",
      }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
            <ShoppingCartIcon sx={{ color: "var(--secondary-color)" }} />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="var(--secondary-color)"
            >
              Review Your Order
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
          style={{
            borderRadius: "16px",
            marginBottom: "20px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          }}
        />
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
              background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
              color: "#fff",
              boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #e45c4f, #f0a88f)",
                boxShadow: "0 10px 22px rgba(240, 111, 95, 0.34)",
              },}}
      >
        {isSubmitting ? "Submitting..." : "Submit Order"}
      </Button>

      {orderConfirmed && (
        <Typography variant="body2" color="green" sx={{ mt: 2 }}>
          ✅ Order submitted! Redirecting to your basket...
        </Typography>
      )}
      <Snackbar
        open={addedOpen}
        autoHideDuration={2000}
        onClose={() => setAddedOpen(false)}
        message="Custom cake added to basket"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <Button
        variant="text"
        onClick={onBack}
        sx={{
          borderRadius: 2,
          px: 2.5,
          py: 1,
          mt: 2,
          fontSize: "0.875rem",
          textTransform: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        ⬅ Modify Order
      </Button>
    </Box>
  );
};

export default Step4ReviewOrder;
