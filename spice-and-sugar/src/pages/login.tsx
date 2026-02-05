"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import animationData from "../animations/2.json";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoginPage = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("guestUser");
  }, []);

  const handleGuestSignIn = async () => {
    if (!user.name.trim()) {
      setErrorMessage("Name is required!");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const guestUser = {
        name: user.name.trim(),
        email: user.email.trim() || null,
        phone: user.phone.trim() || null,
      };
      localStorage.setItem("guestUser", JSON.stringify(guestUser));
      console.log(`User authenticated: ${user.name}`);
      router.push("/");
    } catch (error) {
      console.error("❌ Error saving user:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to sign in. Try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Box
        sx={{
          width: "min(92vw, 420px)",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: { xs: 3, sm: 4 },
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--surface-color)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Lottie options={defaultOptions} height={90} width={120} />

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: "var(--text-color)",
              textAlign: "center",
              mb: 3,
              fontFamily: '"Fraunces", serif',
            }}
          >
            Start Your Cake Journey Here!
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          sx={{ mb: 2, fontFamily: '"Poppins", sans-serif' }}
        />

        <TextField
          fullWidth
          label="Email (Optional)"
          type="email"
          variant="outlined"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          sx={{ mb: 2, fontFamily: '"Poppins", sans-serif' }}
        />

        <TextField
          fullWidth
          label="Phone (Optional)"
          type="tel"
          variant="outlined"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          sx={{ mb: 2, fontFamily: '"Poppins", sans-serif' }}
        />

        {errorMessage && (
          <Typography color="error" mt={1}>
            {errorMessage}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleGuestSignIn}
          disabled={isSubmitting}
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
            },
          }}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
