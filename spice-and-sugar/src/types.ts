// src/types.ts

export interface OrderDetails {
  cakeType: string;
  baseFlavor?: string;
  filling: string[];
  toppings: string[];
  price: number;
  color?: string;
  weight: number;
  shape: string;
  customText?: string;
  levels?: number;
  imageUrl?: string;
}

export interface StepProps {
  onBack: () => void;
  onNext: () => void;
  updateOrder: (updatedData: Partial<OrderDetails>) => void;
  orderDetails: OrderDetails;
}
