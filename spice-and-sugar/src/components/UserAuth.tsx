import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import animationData from "../../public/animations/2.json";

interface UserAuthProps {
  onAuthSuccess: (name: string) => void;
}
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

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
      setErrorMessage("Failed to sign in. try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", overflow:"hidden" }}
    >
      <Box
        sx={{
          position:"absolute",
          Width: "30rem",
          maxHeight: "30rem",
          display: "flex",
          flexDirection: "column",
          alignContent:"center",
          justifyContent:"center",
          gap: 1,
          p: 2,
          mt:"7rem",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
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
              fontFamily: '"Poppins", sans-serif',
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
          label="Email"
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
            background: "linear-gradient(135deg, #e48ca4, #f7c2cc)",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #d87d98, #f1aebb)",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserAuth;
