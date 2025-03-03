import { ReactNode } from 'react';

export interface OrderDetails {
  id: ReactNode;
  total: any;
  totalPrice: number;
  orderId: string;
  createdAt: string;
  status: string;
  email: string; // Add this line
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface OrderValidationResult {
  isValid: boolean;
  orderDetails?: OrderDetails;
}
