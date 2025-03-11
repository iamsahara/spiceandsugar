"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Header from "./Header";

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
    router.push("/cakeOrder"); 
  };
  useEffect(() => {
    localStorage.removeItem("guestUser");
  }, []);

  return (
    <div>
    <Header/>
    <Box
      sx={{
          maxWidth: 470,
          minWidth: 470,
          minHeight: 650,
          maxHeight: 650,
          margin:"10rem",
          padding: "20px",
          backgRound: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "auto",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" mb={1}>
      Please enter your details
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
    </div>
  );
};

export default UserAuth;