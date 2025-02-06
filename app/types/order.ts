export interface OrderDetails {
    totalPrice: number;
    // Add other order details as needed, for example:
    orderId: string;
    createdAt: string;
    status: string;
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