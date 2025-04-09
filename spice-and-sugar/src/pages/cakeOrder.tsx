// import CakeOrderStepper from "../components/CakeOrderStepper";
"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const CakeOrderStepper = dynamic(() => import("@/components/CakeOrderStepper"), {
  ssr: false, // ⛔ disables server-side rendering for this component
});

const CakeOrder = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("guestUser");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser.name) {
            setUserName(parsedUser.name);
          }
        } catch (error) {
          console.error("Failed to parse savedUser:", error);
        }
      }
    }
  }, []);

  if (!userName) {
    return <p>Loading...</p>; 
  }

  return <CakeOrderStepper userName={userName} />;
};

export default CakeOrder;