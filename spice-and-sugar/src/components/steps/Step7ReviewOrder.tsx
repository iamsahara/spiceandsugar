"use client";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

interface Step7Props {
  onBack: () => void;
  orderDetails: {
    cakeType: string;
    shape: string;
    levels: number;
    color: string;
    weight: number;
    filling: string | null;
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
    <Box>
      <Typography variant="h5">Review Your Order</Typography>
      <Typography variant="body1" mt={2}>
        <strong>Cake Type:</strong> {orderDetails.cakeType} <br />
        <strong>Shape:</strong> {orderDetails.shape} <br />
        <strong>Levels:</strong> {orderDetails.levels} <br />
        <strong>Color:</strong> {orderDetails.color} <br />
        <strong>Weight:</strong> {orderDetails.weight} kg <br />
        <strong>Filling:</strong> {orderDetails.filling || "None"} <br />
        <strong>Toppings:</strong> {orderDetails.toppings.length ? orderDetails.toppings.join(", ") : "None"} <br />
        <strong>Custom Message:</strong> {orderDetails.customText || "None"} <br />
        <Typography variant="h6" color="primary" mt={2}>
          Total Price: ${orderDetails.price.toFixed(2)}
        </Typography>
      </Typography>

      {errorMessage && (
        <Typography color="error" mt={2}>
          ⚠ {errorMessage}
        </Typography>
      )}

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" color="success" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Confirm & Pay"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Step7ReviewOrder;