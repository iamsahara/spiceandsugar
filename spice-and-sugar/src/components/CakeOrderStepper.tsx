"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  StepConnector,
} from "@mui/material";
import Step1CakeSelection from "./steps/Step1CakeSelection";
import Step4ReviewOrder from "./steps/Step4ReviewOrder";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const steps: string[] = ["Select", "Review Order"];

interface OrderDetails {
  cakeType: "Butter Cake" | "Sponge Cake" | "Fondant Cake";
  shape: "Round" | "Square" | "Heart" | "Rectangle";
  levels: number;
  color: string;
  weight: number;
  filling: string[];
  toppings: string[];
  customText: string;
  price: number;
}

interface StepProps {
  onNext: () => void;
  updateOrder: (updatedData: Partial<OrderDetails>) => void;
  orderDetails: OrderDetails;
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "&.MuiStepConnector-root": {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  "& .MuiStepConnector-line": {
    borderWidth: 3,
    flexGrow: 1,
    minWidth: "80px",
    maxWidth: "80px",
    alignitems: "center",
    width: "100%",
    borderColor: "var(--primary-color)",
    borderRadius: "50px",
  },
}));


const CakeOrderStepper: React.FC<{ userName: string }> = ({ userName }) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cakeType: "Butter Cake",
    shape: "Round",
    levels: 1,
    color: "#F3E5AB",
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
            orderDetails={orderDetails}
            onBack={handleBackToLogin}
          />
        );
      case 1:
        return (
          <Step4ReviewOrder
            onBack={handleBack}
            onNext={handleNext}
            orderDetails={orderDetails}
            updateOrder={updateOrderDetails}
          />
        );
      default:
        return null;
    }
  };

  return (

    <Box
      sx={{
        minHeight: "800px",
        p: 3,
        mx: "auto",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {steps.map((label, index) => (
          <Step key={index} sx={{ flex: 1 }}>
            <StepLabel
              sx={{
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
        <Box
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "var(--primary-color)",
            borderRadius: "8px",
            px: 2,
            py: 1,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
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
        }}
      >
        <Box sx={{ mt: 1, width: "100%" }}>{renderStepContent(activeStep)}</Box>

        {activeStep !== 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              mb: 3,
              gap: 3,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: "0.95rem",
                fontWeight: "bold",
                px: 2,
                py: 1,
                bgcolor: "var(--secondary-color)",
                "&:hover": { bgcolor: "#E91E63" },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: "0.95rem",
                fontWeight: "bold",
                px: 2,
                py: 1,
                bgcolor: "var(--primary-color)",
                "&:hover": { bgcolor: "var(--primary-color)" },
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>

  );
};

export default CakeOrderStepper;
