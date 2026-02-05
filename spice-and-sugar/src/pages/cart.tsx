"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CartItem } from "@/types";
import {
  clearCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/cart";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleQuantity = (id: string, next: number) => {
    updateQuantity(id, next);
    setItems(getCart());
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setItems(getCart());
  };

  const handleCheckout = async () => {
    setIsPaying(true);
    setPaymentError("");
    try {
      const description = items
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ");
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          description,
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 5 },
        pt: { xs: 12, md: 14 },
        pb: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: { xs: 3, md: 4 },
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--surface-color)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              Your Basket
            </Typography>
            <Typography sx={{ color: "var(--muted-text)" }}>
              Review your selected cakes before checkout.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => {
              clearCart();
              setItems([]);
            }}
            disabled={items.length === 0}
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1.1,
              borderColor: "rgba(45, 37, 35, 0.3)",
              color: "var(--text-color)",
            }}
          >
            Clear Cart
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {items.length === 0 ? (
          <Typography sx={{ color: "var(--muted-text)" }}>
            Your basket is empty. Add cakes from the homepage or your custom
            order.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", md: "center" }}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {item.image && (
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{
                            width: 84,
                            height: 84,
                            borderRadius: 2,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <Box>
                        <Typography variant="h6">{item.name}</Typography>
                      <Typography sx={{ color: "var(--muted-text)" }}>
                          ${item.price.toFixed(2)} / kg
                      </Typography>
                        {item.details && (
                          <Typography sx={{ color: "var(--muted-text)" }}>
                            {item.details}
                          </Typography>
                        )}
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton
                        onClick={() =>
                          handleQuantity(item.id, item.quantity - 0.5)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity.toFixed(1)} kg</Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantity(item.id, item.quantity + 0.5)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemove(item.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
          <Button
            variant="contained"
            onClick={handleCheckout}
            disabled={items.length === 0 || isPaying}
            sx={{
              borderRadius: "999px",
              px: 4,
              py: 1.2,
              background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
              boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
              width: { xs: "100%", md: "auto" },
            }}
          >
            {isPaying ? "Redirecting..." : "Checkout"}
          </Button>
        </Stack>

        {paymentError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {paymentError}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
