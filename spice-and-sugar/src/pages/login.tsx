import UserAuth from "../components/UserAuth";
import { Box } from "@mui/material";

const LoginPage = () => {
  const handleAuthSuccess = (name: string) => {
    console.log(`User authenticated: ${name}`);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
       <UserAuth onAuthSuccess={handleAuthSuccess} />
    </Box>
  );
};

export default LoginPage;
