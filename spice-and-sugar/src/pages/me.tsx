"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type OrderRecord = {
  id?: string | number;
  created_at?: string;
  user_name?: string;
  phone?: string;
  email?: string;
  cake_type?: string;
  shape?: string;
  levels?: number;
  color?: string;
  weight?: number;
  filling?: string[] | null;
  toppings?: string[] | null;
  custom_text?: string | null;
  price?: number;
  image_url?: string | null;
  extra_description?: string | null;
};

export default function OwnerDashboard() {
  const [passcode, setPasscode] = useState("");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    const total = orders.reduce((sum, order) => sum + (order.price ?? 0), 0);
    return { count: orders.length, total };
  }, [orders]);

  const fetchOrders = async (code: string) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: code }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Unable to load orders.");
      }

      const data = await response.json();
      setOrders(data.orders ?? []);
      sessionStorage.setItem("ownerPasscode", code);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to load orders.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("ownerPasscode");
    if (saved) {
      setPasscode(saved);
      fetchOrders(saved);
    }
  }, []);

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
              Owner Dashboard
            </Typography>
            <Typography sx={{ color: "var(--muted-text)" }}>
              Private orders view for Velora.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="subtitle2">Orders</Typography>
              <Typography variant="h6">{summary.count}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="h6">
                ${summary.total.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          sx={{ mb: 3 }}
        >
          <TextField
            label="Owner Passcode"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            onClick={() => fetchOrders(passcode)}
            disabled={!passcode || isLoading}
            sx={{
              background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
              boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
            }}
          >
            {isLoading ? "Loading..." : "Load Orders"}
          </Button>
        </Stack>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {orders.length === 0 && !error && !isLoading && (
          <Typography sx={{ color: "var(--muted-text)" }}>
            No orders found yet.
          </Typography>
        )}

        <Stack spacing={2}>
          {orders.map((order) => (
            <Card key={order.id ?? `${order.user_name}-${order.created_at}`}>
              <CardContent>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h6">
                      {order.user_name || "Guest"}
                    </Typography>
                    <Typography sx={{ color: "var(--muted-text)" }}>
                      {order.email || "No email"}{" "}
                      {order.phone ? `• ${order.phone}` : ""}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      {order.cake_type} • {order.shape} • {order.levels} tier
                    </Typography>
                    <Typography sx={{ color: "var(--muted-text)" }}>
                      Color: {order.color} • Weight: {order.weight}kg
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                    <Typography variant="h6">
                      ${Number(order.price ?? 0).toFixed(2)}
                    </Typography>
                    <Typography sx={{ color: "var(--muted-text)" }}>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : "No date"}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography sx={{ color: "var(--muted-text)" }}>
                  Filling: {order.filling?.length ? order.filling.join(", ") : "None"}
                </Typography>
                <Typography sx={{ color: "var(--muted-text)" }}>
                  Toppings: {order.toppings?.length ? order.toppings.join(", ") : "None"}
                </Typography>
                {order.custom_text && (
                  <Typography sx={{ mt: 1 }}>
                    Message: {order.custom_text}
                  </Typography>
                )}
                {order.extra_description && (
                  <Typography sx={{ mt: 1 }}>
                    Notes: {order.extra_description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
