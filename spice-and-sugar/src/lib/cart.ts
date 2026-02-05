import type { CartItem } from "@/types";

const CART_KEY = "veloraCart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const setCart = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToCart = (item: CartItem) => {
  const items = getCart();
  const existing = items.find((entry) => entry.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }
  setCart(items);
};

export const updateQuantity = (id: string, quantity: number) => {
  const items = getCart();
  const next = items
    .map((entry) =>
      entry.id === id
        ? { ...entry, quantity: Math.max(1, Number(quantity.toFixed(2))) }
        : entry
    )
    .filter(Boolean);
  setCart(next);
};

export const removeFromCart = (id: string) => {
  const items = getCart();
  const next = items.filter((entry) => entry.id !== id);
  setCart(next);
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_KEY);
};
