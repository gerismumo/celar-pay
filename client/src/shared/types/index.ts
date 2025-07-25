export interface User {
  id: string;
  email: string;
  role: 'psp' | 'dev';
  token: string;
}

export interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  currency: string;
  timestamp: string;
  recipientAvatar?: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface PaymentFormData {
  recipient: string;
  amount: string;
  currency: string;
}

