import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function CancelPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 520,
          p: { xs: 3, md: 4 },
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--surface-color)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Payment Canceled
        </Typography>
        <Typography sx={{ color: "var(--muted-text)", mb: 3 }}>
          No worries — your order is still saved. You can try payment again or
          call us to finalize.
        </Typography>
        <Button
          component={Link}
          href="/cakeOrder"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
            boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
          }}
        >
          Back to Order
        </Button>
      </Box>
    </Box>
  );
}
