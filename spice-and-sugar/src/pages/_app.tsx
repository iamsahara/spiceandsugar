"use client";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import GlobalBackground from "@/components/GlobalBackground";


interface OrderDetails {
  cakeType: string;
  shape: string;
  levels: number;
  color: string;
  weight: number;
  filling: string | null;
  toppings: string[];
  customText: string;
  price: number;
}

export default function App({ Component, pageProps }: AppProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cakeType: "Butter Cake",
    shape: "Round",
    levels: 1,
    color: "Brown",
    weight: 1,
    filling: null,
    toppings: [],
    customText: "",
    price: 0,
  });

  const [userName, setUserName] = useState<string>("Guest");

  useEffect(() => {
    const savedUser = localStorage.getItem("guestUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user?.name) {
        setUserName(user.name);
      }
    }
  }, []);

  const updateOrderDetails = (updatedData: Partial<OrderDetails>): void => {
    setOrderDetails((prevDetails) => ({ ...prevDetails, ...updatedData }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalBackground />
      <Component
        {...pageProps}
        orderDetails={orderDetails}
        updateOrderDetails={updateOrderDetails}
      />
    </ThemeProvider>
  );
}