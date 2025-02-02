export interface ContactInformation {
  userName: string;
  email: string;
  phone: string;
}

export interface ShippingDetails {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface PaymentDetails {
  payment_method: string;
  transaction_id: string;
  status: string;
}
