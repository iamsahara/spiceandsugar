import UserAuth from "../components/UserAuth";
import { Box } from "@mui/material";

const LoginPage = () => {
  const handleAuthSuccess = (name: string) => {
    console.log(`User authenticated: ${name}`);
  };

  return <UserAuth onAuthSuccess={handleAuthSuccess} />;
};

export default LoginPage;
