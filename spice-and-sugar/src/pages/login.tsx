import UserAuth from "../components/UserAuth";

const LoginPage = () => {

  const handleAuthSuccess = (name: string) => {
    console.log(`User authenticated: ${name}`);
  };

  return<UserAuth onAuthSuccess={handleAuthSuccess} />;
};

export default LoginPage;