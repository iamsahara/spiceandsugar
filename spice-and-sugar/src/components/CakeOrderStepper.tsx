"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import Step1CakeTypeAndSize from "./steps/Step1CakeTypeAndSize";
import Step2ShapeAndLevels from "./steps/Step2ShapeAndLevels";
import Step3Color from "./steps/Step3Color";
import Step4Fillings from "./steps/Step4Fillings";
import Step5Toppings from "./steps/Step5Toppings";
import Step6CustomMessage from "./steps/Step6CustomMessage";
import Step7ReviewOrder from "./steps/Step7ReviewOrder";

const steps = [
  "Cake Type & Size",
  "Shape & Levels",
  "Color",
  "Fillings",
  "Toppings",
  "Message",
  "Review & Pay",
];

const CakeOrderStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    cakeType: "simple",
    shape: "round",
    levels: 1,
    color: "#F3E5AB",
    weight: 1,
    filling: null,
    toppings: [],
    customText: "",
    price: 19,
  });
  const updateOrderDetails = (updatedData: Partial<typeof orderDetails>) => {
    setOrderDetails((prevDetails) => ({ ...prevDetails, ...updatedData }));
  };

  const handleNext = () => {
    if (activeStep === 5) {
      updateOrderDetails({ customText: orderDetails.customText });
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1CakeTypeAndSize
            onNext={handleNext}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 1:
        return (
          <Step2ShapeAndLevels
            onNext={handleNext}
            onBack={handleBack}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 2:
        return (
          <Step3Color
            onNext={handleNext}
            onBack={handleBack}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 3:
        return (
          <Step4Fillings
            onNext={handleNext}
            onBack={handleBack}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 4:
        return (
          <Step5Toppings
            onNext={handleNext}
            onBack={handleBack}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 5:
        return (
          <Step6CustomMessage
            onNext={handleNext}
            onBack={handleBack}
            updateOrder={updateOrderDetails}
            orderDetails={orderDetails}
          />
        );
      case 6:
        return (
          <Step7ReviewOrder onBack={handleBack} orderDetails={orderDetails} />
        );
      default:
        return null;
    }
  };
  

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: "15px",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2, color: "#673AB7", fontWeight: "bold", fontSize: "1.4rem" }}
      >
        Spend 2 Minutes, Get Your Cake, Your Way! 🎨
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ fontSize: "0.8rem" }}>{label}</StepLabel>{" "}
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 3 }}>{renderStepContent(activeStep)}</Box>
      <Typography
        variant="h6"
        align="center"
        sx={{
          mt: 2,
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#388E3C",
          backgroundColor: "rgba(56, 142, 60, 0.1)",
          borderRadius: "8px",
          display: "inline-block",
          letterSpacing: "0.5px",
        }}
      >
        Total: ${orderDetails.price.toFixed(2)}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            fontSize: "0.9rem",
            px: 2,
            py: 1,
            bgcolor: "#FF4081",
            "&:hover": { bgcolor: "#E91E63" },
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          sx={{
            fontSize: "0.7rem",
            px: 1,
            py: 1,
            bgcolor: "#673AB7",
            "&:hover": { bgcolor: "#512DA8" },
          }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default CakeOrderStepper;
