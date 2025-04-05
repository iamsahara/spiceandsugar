import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserAuthProps {
  onAuthSuccess: (name: string) => void;
}
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const defaultOptions = {
  loop: true,
  // autoplay: true,
  // animationData: require("../path/to/your/animation.json"),
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
      setErrorMessage("Failed to sign in. Pleay again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
        py: 1,
        mt:6,
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "30rem",
          maxHeight:"30rem",  
          p: 4,
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
            {/* <Box>
          <Lottie options={defaultOptions} height={70} width={70} />
        </Box> */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "var(--primary-color)",
            textAlign: "center",
            mb: 3,
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          Enter Your Details!
        </Typography>
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
          fullWidth
          variant="contained"
          onClick={handleGuestSignIn}
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            fontWeight: "bold",
            backgroundColor: "var(--secondary-color)",
            "&:hover": {
              backgroundColor: "var(--secondary-color-hover)",
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
import dynamic from "next/dynamic";

