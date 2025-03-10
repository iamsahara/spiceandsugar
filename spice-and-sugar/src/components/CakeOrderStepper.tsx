"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import Step1CakeSelection from "./steps/Step1CakeSelection";
import Step2FillingsToppings from "./steps/Step2FillingsToppings";
import Step3FlavorColorMessage from "./steps/Step3FlavorColorMessage";
import Step4ReviewOrder from "./steps/Step4ReviewOrder";

const steps: string[] = ["Type", "Flavor", "Message", "Review"];

interface OrderDetails {
  cakeType: "Butter Cake" | "Sponge Cake";
  shape: "round" | "square";
  levels: number;
  color?: string;
  weight: number;
  filling: string[] | null;
  toppings: string[];
  customText: string;
  price: number;
}

const CakeOrderStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cakeType: "Butter Cake",
    shape: "round",
    levels: 1,
    color: "#F3E5AB",
    weight: 1,
    filling: null,
    toppings: [],
    customText: "",
    price: 19,
  });

  const updateOrderDetails = (updatedData: Partial<OrderDetails>): void => {
    setOrderDetails((prevDetails) => ({ ...prevDetails, ...updatedData }));
  };


  const handleNext = (): void => {
    if (activeStep === 2) {
      updateOrderDetails({ customText: orderDetails.customText });
    }
    setActiveStep((prevStep) => prevStep + 1);
  };


  const handleBack = (): void => {
    setActiveStep((prevStep) => prevStep - 1);
  };


  const renderStepContent = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return (
          <Step1CakeSelection
            onNext={handleNext}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 1:
        return (
          <Step2FillingsToppings
            onNext={handleNext}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 2:
        return (
          <Step3FlavorColorMessage
            onNext={handleNext}
            onBack={handleBack}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 3:
        return (
          <Step4ReviewOrder onBack={handleBack} orderDetails={orderDetails} />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 470,
        minWidth: 470,
        minHeight: 650,
        maxHeight: 650,
        margin: "auto",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ fontSize: "0.8rem" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3, width: "100%" }}>{renderStepContent(activeStep)}</Box>
      {activeStep !== 3 && (
        <Typography
          variant="h6"
          align="center"
          sx={{
            mt: 2,
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#388E3C",
            backgroundColor: "rgba(56, 142, 60, 0.1)",
            borderRadius: "8px",
            display: "inline-block",
            letterSpacing: "0.5px",
            px: 2,
            py: 1,
          }}
        >
          Total: ${orderDetails.price.toFixed(2)}
        </Typography>
      )}
      {activeStep !== 3 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
            gap: 3,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              fontSize: "0.9rem",
              px: 2,
              py: 1,
              bgcolor: "var( --secondary-color)",
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
              fontSize: "0.9rem",
              px: 2,
              py: 1,
              bgcolor: "var( --primary-color)",
              "&:hover": { bgcolor: "var( --primary-color)" },
            }}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CakeOrderStepper;
