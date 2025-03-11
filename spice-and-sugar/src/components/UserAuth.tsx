"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";

interface UserAuthProps {
  onAuthSuccess: (name: string, imageFile?: File | null) => void;
}

const UserAuth: React.FC<UserAuthProps> = ({ onAuthSuccess }) => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [cakeImage, setCakeImage] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("guestUser");
  }, []);

  const handleGuestSignIn = () => {
    if (!user.name.trim() || !user.email.trim()) {
      alert("Name and Email are required!");
      return;
    }

    localStorage.setItem("guestUser", JSON.stringify(user));
    onAuthSuccess(user.name, cakeImage);
    router.push("/cakeOrder");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setCakeImage(file);
  };

  return (
    <Box
      sx={{
        maxWidth: 470,
        minWidth: 470,
        minHeight: 500,
        maxHeight: 500,
        margin: "auto",
        padding: "15px",
        mt: "60px",
        background: "rgba(255, 255, 255, 0.2)",
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
      <Typography variant="h5" fontWeight="bold" color="primary" mb={1} width={"100%"}>
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

      <Box width="100%" sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold", color: "#555" }}>
          Upload Image of Cake Idea (optional)
        </Typography>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageUpload}
          style={{ width: "100%" }}
        />
        {cakeImage && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Selected file: {cakeImage.name}
          </Typography>
        )}
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleGuestSignIn}
        sx={{ py: 1.5, fontWeight: "bold" }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default UserAuth;