"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface UserAuthProps {
  onAuthSuccess: (name: string) => void;
}

const UserAuth: React.FC<UserAuthProps> = ({ onAuthSuccess }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const router = useRouter(); 

  useEffect(() => {
    const guestUser = localStorage.getItem("guestUser");
    if (guestUser) {
      const parsedUser = JSON.parse(guestUser);
      if (parsedUser.name && parsedUser.email) {
        onAuthSuccess(parsedUser.name);
      }
    }
  }, [onAuthSuccess]); 

  const handleGuestSignIn = () => {
    if (!user.name.trim() || !user.email.trim()) {
      alert("Name and Email are required!");
      return;
    }

    localStorage.setItem("guestUser", JSON.stringify(user)); 
    onAuthSuccess(user.name); 
    router.push("/stepper"); 
  };
  useEffect(() => {
    localStorage.removeItem("guestUser");
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        textAlign: "center",
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>
        Welcome to Velora Cake! 🍰
      </Typography>

      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        sx={{ mb: 2 }}
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

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleGuestSignIn}
        sx={{ py: 1.5, fontWeight: "bold" }}
      >
        Continue as Guest
      </Button>
    </Box>
  );
};

export default UserAuth;