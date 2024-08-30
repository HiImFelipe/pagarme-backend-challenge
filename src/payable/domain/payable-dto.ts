export enum PayablePaymentMethod {
  CREDIT = "credit",
  DEBIT = "debit",
}

export type PayableDTO = {
  amount: number;
  status: string;
  paymentDate: Date;
  paymentMethod: PayablePaymentMethod;
};

export enum PayableStatus {
  PAID = "paid",
  WAITING_FUNDS = "waiting_funds",
}
