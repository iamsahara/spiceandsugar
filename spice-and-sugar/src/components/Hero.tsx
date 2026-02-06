"use client";
import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/cart";

const featuredCakes = [
  {
    name: "Velora Signature",
    price: 38,
    image: "/output.jpg",
  },
  {
    name: "Floral Buttercream",
    price: 32,
    image: "/output (1).jpg",
  },
  {
    name: "Golden Berry",
    price: 36,
    image: "/output (2).jpg",
  },
  {
    name: "Modern Romance",
    price: 40,
    image: "/output (4).jpg",
  },
];

const galleryShots = [
  { name: "Classic White", price: 28, image: "/IMG_6080.jpg" },
  { name: "Blush Rose", price: 30, image: "/IMG_6082.jpg" },
  { name: "Citrus Bloom", price: 34, image: "/IMG_6086.jpg" },
  { name: "Velvet Ribbon", price: 33, image: "/IMG_6087.jpg" },
  { name: "Luxe Garden", price: 36, image: "/IMG_6091.jpg" },
  { name: "Pearl Drip", price: 32, image: "/IMG_6092.jpg" },
];

const formatPrice = (value: number) => `$${value.toFixed(2)} / kg`;

const highlightItems = [
  "Custom design",
  "Flexible pickup",
  "Fresh ingredients",
];
export default function Hero() {
  const [addedOpen, setAddedOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState("Added to basket");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedUser = localStorage.getItem("guestUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user?.name) setIsSignedIn(true);
      } catch {
        setIsSignedIn(false);
      }
    }
  }, []);

  const notifyAdded = (message: string) => {
    setAddedMessage(message);
    setAddedOpen(true);
  };

  const orderHref = isSignedIn ? "/cakeOrder" : "/login";

  return (
    <>
      <Box
        id="Hero"
        sx={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 6, md: 8 },
          textAlign: "center",
          px: { xs: 2, md: 6 },
          pt: { xs: 12, md: 14 },
          pb: { xs: 6, md: 10 },
        }}
      >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 5 }}
        sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            flex: 1,
            zIndex: 2,
            maxWidth: 560,
            color: "var(--text-color)",
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            backgroundColor: "var(--surface-color)",
            borderRadius: "var(--radius-lg)",
            gap: 2,
            padding: { xs: 3, sm: 4 },
            boxShadow: "var(--shadow-medium)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.4rem", sm: "3rem", md: "3.4rem" },
              fontWeight: 700,
              letterSpacing: "0.01em",
              lineHeight: 1.1,
              fontFamily: '"Fraunces", serif',
            }}
          >
            Velora Bakery
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.05rem", sm: "1.15rem" },
              color: "var(--muted-text)",
            }}
          >
            Signature cakes, hand-finished details, and custom flavors made fresh
            for every celebration.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              color: "var(--muted-text)",
              fontSize: "0.9rem",
            }}
          >
            {highlightItems.map((label, idx) => (
              <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {idx !== 0 && (
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "rgba(45, 37, 35, 0.3)",
                    }}
                  />
                )}
                <Typography sx={{ fontWeight: 600, color: "var(--text-color)" }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <Button
              variant="contained"
              href={orderHref}
              sx={{
                fontWeight: "bold",
                px: 4.5,
                py: 1.4,
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
              Build Your Own
            </Button>

            <Button
              variant="outlined"
              href="tel:16473798489"
              sx={{
                fontWeight: "bold",
                px: 4.5,
                py: 1.4,
                borderRadius: "999px",
                color: "var(--text-color)",
                borderColor: "rgba(45, 37, 35, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(240, 111, 95, 0.08)",
                  borderColor: "rgba(240, 111, 95, 0.6)",
                },
              }}
            >
              Call to Order
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: 520,
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          <Box
            component="img"
            src="/output (6).jpg"
            alt="Velora cake showcase"
            sx={{
              width: "100%",
              height: { xs: 220, sm: 320, md: 420 },
              objectFit: "cover",
            }}
          />
        </Box>
      </Stack>

      <Box id="featured" sx={{ maxWidth: 1100, mx: "auto", width: "100%" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              Featured Cakes
            </Typography>
            <Typography sx={{ color: "var(--muted-text)" }}>
              Popular styles that customers love — customize any design.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            href="/cart"
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1.1,
              borderColor: "rgba(45, 37, 35, 0.3)",
              color: "var(--text-color)",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                borderColor: "rgba(240, 111, 95, 0.6)",
                backgroundColor: "rgba(240, 111, 95, 0.08)",
              },
            }}
          >
            Order From These
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {featuredCakes.map((cake) => (
            <Box
              key={cake.name}
              sx={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  backgroundColor: "var(--surface-color)",
                  boxShadow: "var(--shadow-soft)",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box
                  component="img"
                  src={cake.image}
                  alt={cake.name}
                  sx={{
                    width: "100%",
                    height: { xs: 160, sm: 180 },
                    objectFit: "cover",
                  }}
                />
                <Box sx={{ p: 2, flex: 1 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {cake.name}
                      </Typography>
                      <Typography sx={{ color: "var(--muted-text)" }}>
                        {formatPrice(cake.price)}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        addToCart({
                          id: `featured-${cake.name}`,
                          name: cake.name,
                          price: cake.price,
                          image: cake.image,
                          quantity: 1,
                          type: "featured",
                        });
                        notifyAdded(`${cake.name} added to basket`);
                      }}
                      sx={{
                        borderRadius: "999px",
                        px: 2.5,
                        py: 0.9,
                        background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
                        boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
                        fontSize: "0.85rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Stack>
                </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box id="custom" sx={{ maxWidth: 1100, mx: "auto", width: "100%" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 5 }}
          alignItems="center"
        >
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Our Cake Gallery
            </Typography>
            <Typography sx={{ color: "var(--muted-text)", mb: 3 }}>
              From elegant florals to playful celebrations, every cake is
              finished by hand.
            </Typography>
          <Button
            variant="contained"
            href={orderHref}
            sx={{
                fontWeight: "bold",
                px: 4,
                py: 1.4,
                borderRadius: "999px",
                background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
                boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
              }}
            >
              Start Custom Order
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1.2,
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 1.5,
            }}
          >
            {galleryShots.map((shot) => (
              <Box
                key={shot.name}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "14px",
                  boxShadow: "0 8px 18px rgba(32, 24, 22, 0.12)",
                }}
              >
                <Box
                  component="img"
                  src={shot.image}
                  alt={shot.name}
                  sx={{
                    width: "100%",
                    height: { xs: 90, sm: 110, md: 130 },
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    p: 1,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: "0.8rem" }}>
                    {shot.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ color: "#fff", fontSize: "0.75rem" }}>
                      {formatPrice(shot.price)}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        addToCart({
                          id: `gallery-${shot.name}`,
                          name: shot.name,
                          price: shot.price,
                          image: shot.image,
                          quantity: 1,
                          type: "gallery",
                        });
                        notifyAdded(`${shot.name} added to basket`);
                      }}
                      sx={{
                        minWidth: "auto",
                        px: 1.2,
                        py: 0.3,
                        fontSize: "0.65rem",
                        borderRadius: "999px",
                        background: "rgba(240, 111, 95, 0.9)",
                      }}
                    >
                      Add
                    </Button>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
      <Snackbar
        open={addedOpen}
        autoHideDuration={2000}
        onClose={() => setAddedOpen(false)}
        message={addedMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
