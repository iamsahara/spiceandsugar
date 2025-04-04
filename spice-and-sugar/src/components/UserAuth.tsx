import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";

interface UserAuthProps {
  onAuthSuccess: (name: string) => void;
}

const UserAuth: React.FC<UserAuthProps> = ({ onAuthSuccess }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("guestUser");
  }, []);

  const handleGuestSignIn = async () => {
    if (!user.name.trim() || !user.email.trim()) {
      setErrorMessage("Name and Email are required!");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user.");
      }

      const data = await response.json();
      console.log("✅ User saved:", data);

      localStorage.setItem("guestUser", JSON.stringify(data.user));
      onAuthSuccess(user.name);
      router.push("/cakeOrder");
    } catch (error) {
      console.error("❌ Error saving user:", error);
      setErrorMessage("Failed to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 2,
        minHeight: "90vh",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 1,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          mb={2}
        >
          Your Details!
        </Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          sx={{ mb: 1 }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone (Optional)"
          type="tel"
          variant="outlined"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          sx={{ mb: 2 }}
        />

        {errorMessage && (
          <Typography color="error" mt={1}>
            {errorMessage}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleGuestSignIn}
          disabled={isSubmitting}
          sx={{ py: 1.5, fontWeight: "bold" }}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default UserAuth;
