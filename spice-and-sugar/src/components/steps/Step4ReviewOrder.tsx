"use client";
import { Box, Button, Typography, Stack, Card, CardContent, Divider } from "@mui/material";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Step7Props {
  onBack: () => void;
  orderDetails: {
    cakeType: string;
    shape: string;
    levels: number;
    color: string;
    weight: number;
    filling: string[] | null;
    toppings: string[];
    customText: string;
    price: number;
  };
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

const Step7ReviewOrder: React.FC<Step7Props> = ({ onBack, orderDetails }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize. Please try again.");
      }

      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create Stripe session. Please try again.");
      }

      const session = await response.json();
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("❌ Payment Error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgRound: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(12px)",
        borderRadius: "15px",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Card
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
          backgRound: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <ShoppingCartIcon sx={{ color: "var( --secondary-color)" }} />
            <Typography variant="h5" fontWeight="bold" color="var( --secondary-color)">
              Review Your Order
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />

          <Typography variant="body1" sx={{ fontSize: "0.95rem", fontWeight: "500", textAlign: "left", lineHeight: 1.8 }}>
            <strong>Cake Type:</strong> {orderDetails.cakeType} <br />
            <strong>Shape:</strong> {orderDetails.shape} <br />
            <strong>Tiers:</strong> {orderDetails.levels} <br />
            <strong>Color:</strong> {orderDetails.color} <br />
            <strong>Weight:</strong> {orderDetails.weight} kg <br />
            <strong>Filling:</strong> {orderDetails.filling?.length ? orderDetails.filling.join(", ") : "None"} <br />
            <strong>Toppings:</strong> {orderDetails.toppings.length ? orderDetails.toppings.join(", ") : "None"} <br />
            <strong>Message on Cake:</strong> {orderDetails.customText || "None"} <br />
          </Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" fontWeight="bold" color="#388E3C">
            Total: ${orderDetails.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      <Stack spacing={2} alignItems="center">
        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={isProcessing}
          sx={{
            fontSize: "0.9rem",
            px: 2,
            py: 1,
            width: "100%",
            maxWidth: "350px",
            bgcolor: "var( --primary-color)",
            borderRadius: 8,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            textTransform: "none",
            "&:hover": { bgcolor: "#7AB8AE" },
          }}
        >
          <PaymentIcon sx={{ mr: 1 }} />
          Pay with Credit Card
        </Button>

        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={isProcessing}
          sx={{
            fontSize: "0.9rem",
            px: 2,
            py: 1,
            width: "100%",
            maxWidth: "350px",
            bgcolor: "#000",
            color: "white",
            borderRadius: 8,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            textTransform: "none",
            "&:hover": { bgcolor: "#333" },
          }}
        >
          🖤 Pay with Apple Pay
        </Button>

        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={isProcessing}
          sx={{
            fontSize: "0.9rem",
            px: 2,
            py: 1,
            width: "100%",
            maxWidth: "350px",
            bgcolor: "#4285F4",
            color: "white",
            borderRadius: 8,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            textTransform: "none",
            "&:hover": { bgcolor: "#357AE8" },
          }}
        >
          🔵 Pay with Google Pay
        </Button>
      </Stack>
      {errorMessage && (
        <Typography color="error" mt={2} fontWeight="bold">
          ⚠ {errorMessage}
        </Typography>
      )}
      <Button
        variant="outlined"
        onClick={onBack}
        sx={{
          mt: 3,
          fontSize: "0.85rem",
          px: 2,
          py: 1,
          borderRadius: 8,
          border: "2px solid var( --secondary-color)",
          color: "var( --secondary-color)",
          "&:hover": { bgcolor: "rgba(255, 64, 129, 0.1)" },
        }}
      >
        ⬅ Back to Order
      </Button>
    </Box>
  );
};

export default Step7ReviewOrder;