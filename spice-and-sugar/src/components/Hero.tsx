"use client";
import { Box, Button, Stack } from "@mui/material";

export default function Hero() {
  return (
    <Box
      id="Hero"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >

      <Box
        sx={{
          zIndex: 2,
          maxWidth: "720px",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"rgba(0,0,0,0.5)",
          borderRadius:2,
          width:"100%",
          gap: 2,
          padding:{xs:2, sm:4}
        }}
      >
        <Box
          sx={{
            fontSize: { xs: "3rem", sm: "4rem" },
            fontWeight: 600,
            letterSpacing: "0.02em",
            lineHeight: 1.2,
            textShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          Velora Bakery
        </Box>
        <Box
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            textShadow: "0 1px 3px rgba(0,0,0,0.2)",
            mb: 3,
          }}
        >
          Freshly Curated Cakes Made with Love
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            href="tel:16473798489"
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
              },
            }}
          >
            Call Us Now
          </Button>

          <Button
            variant="outlined"
            href="/login"
            sx={{
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              borderRadius: "999px",
              color: "#fff",
              borderColor: "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "#fff",
              },
            }}
          >
            Order Online
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}