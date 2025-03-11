"use client";
import React, { useState } from "react";
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
import Step2FillingsToppings from "./steps/Step2FillingsToppings";
import Step3FlavorColorMessage from "./steps/Step3FlavorColorMessage";
import Step4ReviewOrder from "./steps/Step4ReviewOrder";
import { styled } from "@mui/material/styles";

const steps: string[] = ["Type", "Flavor", "Message", "Review"];

interface OrderDetails {
  cakeType: "Butter Cake" | "Sponge Cake";
  shape: "Round" | "square";
  levels: number;
  color?: string;
  weight: number;
  filling: string[] | null;
  toppings: string[];
  customText: string;
  price: number;
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
  const [activeStep, setActiveStep] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    cakeType: "Butter Cake",
    shape: "Round",
    levels: 1,
    color: "#F3E5AB",
    weight: 1,
    filling: null,
    toppings: [],
    customText: "",
    price: 18.99,
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
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          textAlign: "center",
          color: "#var(--primary-color)",
          background: "linear-gradient(90deg, #A0C4FF, #BDB2FF)",
          WebkitBackgroundClip: "text",
          letterSpacing: "0.8px",
          fontSize: "1.1rem",
        }}
      >
        Customize Your Perfect Cake, {userName}! 🎂
        <br />
        <span
          style={{ fontSize: "0.9rem", fontWeight: "normal", opacity: 0.8 }}
        >
          (Takes just 5 minutes) ⏳
        </span>
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
        sx={{ width: "100%", justifyContent: "space-between", mb: 2 }}
      >
        {steps.map((label, index) => (
          <Step key={index} sx={{ flex: 1 }}>
            <StepLabel sx={{ fontSize: "0.8rem" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 1, width: "100%" }}>{renderStepContent(activeStep)}</Box>

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
              fontSize: "0.9rem",
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
  );
};

export default CakeOrderStepper;
