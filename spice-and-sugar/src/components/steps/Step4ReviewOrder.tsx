"use client";
import { useEffect, useState } from "react";
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
  Snackbar,
} from "@mui/material";
import { CldImage } from "next-cloudinary";
import PhoneIcon from "@mui/icons-material/Phone";
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
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [addedOpen, setAddedOpen] = useState(false);

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

      setOrderConfirmed(true);
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckout = async () => {
    setIsPaying(true);
    setPaymentError("");
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: orderDetails.price,
          description: cakeDescription.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to start checkout.");
      }

      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Missing checkout URL.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setPaymentError(error.message);
      } else {
        setPaymentError("Payment failed. Please try again.");
      }
    } finally {
      setIsPaying(false);
    }
  };

  const handleAddCustomToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: "Custom Cake Order",
      price: orderDetails.price,
      quantity: orderDetails.weight || 1,
      type: "custom",
      details: cakeDescription.trim(),
    });
    setAddedOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: "800px",
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
          ✅ Order submitted! Proceed with payment.
        </Typography>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          onClick={handleAddCustomToCart}
          sx={{
            borderRadius: "999px",
            px: 3,
            py: 1.1,
            borderColor: "rgba(45, 37, 35, 0.3)",
            color: "var(--text-color)",
            "&:hover": {
              borderColor: "rgba(240, 111, 95, 0.6)",
              backgroundColor: "rgba(240, 111, 95, 0.08)",
            },
          }}
        >
          Add Custom Cake to Cart
        </Button>
        <Button
          variant="text"
          href="/cart"
          sx={{
            borderRadius: "999px",
            px: 2.5,
            py: 1.1,
            textTransform: "none",
          }}
        >
          Go to Cart
        </Button>
      </Stack>
      <Snackbar
        open={addedOpen}
        autoHideDuration={2000}
        onClose={() => setAddedOpen(false)}
        message="Custom cake added to basket"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      <Stack spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="body2" fontWeight="medium">
          Proceed to the payment:
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={handleCheckout}
          disabled={isPaying}
          sx={{
            borderRadius: "999px",
            px: 3,
            py: 1.25,
            fontSize: "0.95rem",
            textTransform: "none",
            background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
            boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
            "&:hover": {
              background: "linear-gradient(135deg, #e45c4f, #f0a88f)",
              boxShadow: "0 10px 22px rgba(240, 111, 95, 0.34)",
            },
          }}
        >
          {isPaying ? "Redirecting..." : "Pay with Card"}
        </Button>

        {paymentError && (
          <Typography color="error" sx={{ mt: 1, fontSize: "0.85rem" }}>
            {paymentError}
          </Typography>
        )}

        <Divider sx={{ width: "80%", my: 2 }} />

        <Button
          component={Link}
          href="tel:+14379811399"
          variant="outlined"
          sx={{
            border: "2px solid var(--primary-color)",
            color: "var(--primary-color)",
            backgroundColor: "rgba(255, 255, 255, 0.65)",
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
          <PhoneIcon sx={{ mr: 1 }} /> Prefer to pay by phone? Call us to finalize your order.
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
