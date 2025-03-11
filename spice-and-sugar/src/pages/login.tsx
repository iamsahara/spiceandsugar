import UserAuth from "../components/UserAuth";
import Header from "@/components/Header";

const LoginPage = () => {

  const handleAuthSuccess = (name: string) => {
    console.log(`User authenticated: ${name}`);
  };

  return<UserAuth onAuthSuccess={handleAuthSuccess} />;
};

export default LoginPage;