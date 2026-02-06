"use client";
import { useState } from "react";
import { Box, Stack, Button, Typography, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName }: HeaderProps) {
  const [orderAnchor, setOrderAnchor] = useState<null | HTMLElement>(null);
  const isOrderMenuOpen = Boolean(orderAnchor);

  const handleOpenOrderMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOrderAnchor(event.currentTarget);
  };

  const handleCloseOrderMenu = () => {
    setOrderAnchor(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        px: { xs: 2, md: 4 },
        py: { xs: 1, md: 1.5 },
        position: "relative",
        background: "transparent",
        boxShadow: "none",
        backdropFilter: "none",
        pointerEvents: "none", 
  
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{ flex: 1, minWidth: 0 }}
      >
        <Box
          sx={{
            borderRadius: "14px",
            padding: "4px",
            background: "transparent",
            boxShadow: "none",
            width: { xs: 90, sm: 110, md: 130 },
          }}
        >
          <Image
            src="/velora-logo-dark.svg"
            alt="Velora"
            width={130}
            height={62}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        {userName && userName !== "Guest" && (
          <Typography
            variant="h6"
            sx={{
              px: 2,
              py: 1,
              borderRadius: "16px",
              fontWeight: 600,
              color: "var(--text-color)",
              fontSize: { xs: "0.8rem", md: "0.95rem" },
              whiteSpace: "nowrap",
            }}
          >
            Welcome to Velora, {userName}!
          </Typography>
        )}
      </Stack>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: { xs: "flex-start", md: "center" },
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpenOrderMenu}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "999px",
            px: { xs: 2.5, sm: 3.5 },
            py: 1,
            background: "linear-gradient(135deg, #f06f5f, #f2b39b)",
            boxShadow: "0 8px 18px rgba(240, 111, 95, 0.28)",
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            whiteSpace: "nowrap",
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              background: "linear-gradient(135deg, #e45c4f, #f0a88f)",
              boxShadow: "0 10px 22px rgba(240, 111, 95, 0.34)",
            },
          }}
        >
          Order Here
        </Button>
        <Menu
          anchorEl={orderAnchor}
          open={isOrderMenuOpen}
          onClose={handleCloseOrderMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: "16px",
              minWidth: 220,
              boxShadow: "0 12px 30px rgba(32, 24, 22, 0.18)",
              border: "1px solid rgba(240, 111, 95, 0.15)",
              overflow: "hidden",
            },
          }}
        >
          <MenuItem
            component="a"
            href="tel:16473798489"
            onClick={handleCloseOrderMenu}
            sx={{
              py: 1.2,
              px: 2,
              fontWeight: 600,
              "&:hover": { backgroundColor: "rgba(240, 111, 95, 0.08)" },
            }}
          >
            Call Us
          </MenuItem>
          <MenuItem
            component="a"
            href="/#featured"
            onClick={handleCloseOrderMenu}
            sx={{
              py: 1.2,
              px: 2,
              fontWeight: 600,
              "&:hover": { backgroundColor: "rgba(240, 111, 95, 0.08)" },
            }}
          >
            Select From Menu
          </MenuItem>
          <MenuItem
            component="a"
            href="/#custom"
            onClick={handleCloseOrderMenu}
            sx={{
              py: 1.2,
              px: 2,
              fontWeight: 600,
              "&:hover": { backgroundColor: "rgba(240, 111, 95, 0.08)" },
            }}
          >
            Build Your Own
          </MenuItem>
        </Menu>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          flex: 1,
          justifyContent: { xs: "flex-start", md: "flex-end" },
          width: "100%",
        }}
      >
        <Button
          href="/login"
          variant="text"
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.75rem",
            color: "var(--text-color)",
            px: 1,
            minWidth: "auto",
            whiteSpace: "nowrap",
          }}
        >
          Sign In
        </Button>
        <Button
          href="/"
          variant="contained"
          size="medium"
          sx={{
            minWidth: "48px",
            color: "var(--primary-color)",
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 6px 18px rgba(32, 24, 22, 0.12)",
            transition: "all 0.3s ease",
            padding: { xs: "8px", sm: "10px" },
            "&:hover": {
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <HomeRoundedIcon fontSize="large" />
        </Button>

        <Button
          href="/cart"
          variant="contained"
          size="medium"
          sx={{
            minWidth: "48px",
            color: "var(--primary-color)",
            fontWeight: "600",
            textTransform: "none",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 6px 18px rgba(32, 24, 22, 0.12)",
            transition: "all 0.3s ease",
            padding: { xs: "8px", sm: "10px" },
            "&:hover": {
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <ShoppingBagOutlinedIcon fontSize="large" />
        </Button>
      </Stack>
    </Box>
  );
}
