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
    <Box>
      <Header/>
      <Box
        sx={{
          display:"flex",
          mt: "Auto",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          marginLeft:"1rem",
          marginRight:"1rem",
          padding: "10px",
          minHeight: "400px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="pallette.text.primary"
            flex={1}
          >
            Start Your Journey Here!
          </Typography>
        </Box>
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
          {isSubmitting ? "Signing In..." : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserAuth;
