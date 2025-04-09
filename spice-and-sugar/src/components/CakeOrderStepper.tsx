"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Typography,
} from "@mui/material";
import Step1CakeSelection from "./steps/Step1CakeSelection";
import Step4ReviewOrder from "./steps/Step4ReviewOrder";
import { useRouter } from "next/navigation";
import { OrderDetails } from "@/types";

const steps: string[] = [];

const CakeOrderStepper: React.FC<{ userName: string }> = ({}) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cakeType: "Butter Cake",
    shape: "Round",
    levels: 1,
    color: "White",
    weight: 1,
    filling: [],
    toppings: [],
    customText: "",
    price: 18.99,
  });
  const updateOrderDetails = (updatedData: Partial<OrderDetails>) => {
    setOrderDetails((prevDetails) => ({ ...prevDetails, ...updatedData }));
  };
  const handleNext = (): void => {
    if (activeStep === 1) {
      updateOrderDetails({ customText: orderDetails.customText });
    }
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = (): void => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBackToLogin = () => {
    router.push("/");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  const renderStepContent = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return (
          <Step1CakeSelection
            onNext={handleNext}
            updateOrder={updateOrderDetails}
            onBack={handleBackToLogin}
            orderDetails={orderDetails}
          />
        );
      case 1:
        return (
          <Step4ReviewOrder
            onBack={handleBack}
            onNext={handleNext}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
    sx={{
      position: "absolute",
      top: "7rem",
      left: "50%",
      transform: "translateX(-50%)",
      width: "30rem",
      maxHeight: "30rem",
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      justifyContent: "center",
      gap: 1,
      p: 2,
      borderRadius: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          position: "sticky",
          zIndex: 10,
          backdropFilter: "blur(5px)",
          padding: "1.5rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
        
          gap: 1,
        }}
      >
        <Typography sx={{color: "var(--text-color)", fontWeight: "800" }}>
        Bake It Your Way!{" "}
        </Typography>
        <Box
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
        },}}
        >
          Total: ${orderDetails.price.toFixed(2)}
        </Box>
      </Stepper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          overflow: "auto",
          height: "25rem",
          alignittems: "center",
          justifyItems: "center",

     
        }}
      >
        <Box sx={{ width: "100%" }}>{renderStepContent(activeStep)}</Box>
        {activeStep !== 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
              width: "100%",
              maxWidth: 500,
            }}
          ></Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: "2rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
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
            },}}
        >
          {activeStep === steps.length - 1 ? "Finish" : " Review My Order"}
        </Button>
      </Box>
    </Box>
  );
};

export default CakeOrderStepper;
