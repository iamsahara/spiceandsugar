"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Stepper, Typography } from "@mui/material";
import Step1CakeSelection from "./steps/Step1CakeSelection";
import Step4ReviewOrder from "./steps/Step4ReviewOrder";
import { useRouter } from "next/navigation";
import { OrderDetails } from "@/types";

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
    if (activeStep === 0 || activeStep === 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
        position: "relative",
        width: "min(92vw, 960px)",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        gap: 1,
        p: { xs: 2.5, md: 4 },
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--surface-color)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "var(--shadow-soft)",
        mx: "auto",
        mt: { xs: 12, md: 14 },
        mb: { xs: 4, md: 6 },
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          position: "sticky",
          zIndex: 10,
          backdropFilter: "blur(5px)",
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 1.5 },
          borderRadius: "1rem",
          boxShadow: "0 6px 16px rgba(32, 24, 22, 0.08)",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography sx={{ color: "var(--text-color)", fontWeight: "800" }}>
          Bake It Your Way{" "}
        </Typography>
        <Box
          sx={{
            fontWeight: "bold",
            px: 1.5,
            py: 1.5,
            borderRadius: "999px",
            background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
            color: "#fff",
            boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #e45c4f, #f0a88f)",
              boxShadow: "0 10px 22px rgba(240, 111, 95, 0.34)",
            },
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
          overflowY: "auto",
          maxHeight: { xs: "55vh", md: "58vh" },
          padding: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 2, sm: 3 },
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
        {activeStep === 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          sx={{
            fontWeight: "bold",
            px: 5,
            py: 1.5,
            borderRadius: "999px",
            background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
            color: "#fff",
            boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, #e45c4f, #f0a88f)",
              boxShadow: "0 10px 22px rgba(240, 111, 95, 0.34)",
            },
          }}
        >
          Review Order
        </Button>
        )}
      </Box>
    </Box>
  );
};

export default CakeOrderStepper;
