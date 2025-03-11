import { useState, useEffect } from "react";
import CakeOrderStepper from "../components/CakeOrderStepper";

const Stepper = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("guestUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.name) {
        setUserName(parsedUser.name);
      }
    }
  }, []);

  if (!userName) {
    return <p>Loading...</p>; 
  }

  return <CakeOrderStepper userName={userName} />;
};

export default Stepper;