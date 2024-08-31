export enum PayablePaymentMethod {
  CREDIT = "credit",
  DEBIT = "debit",
}

export type PayableDTO = {
  amount: number;
  transactionDate: Date;
  paymentMethod: PayablePaymentMethod;
};

export type PayableJSON = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  grossAmount: number;
  netAmount: number;
  paymentDate: Date;
  paymentMethod: PayablePaymentMethod;
  feePercentage: number;
  transactionDate: Date;
  status: PayableStatus;
};

export enum PayableStatus {
  PAID = "paid",
  WAITING_FUNDS = "waiting_funds",
}
