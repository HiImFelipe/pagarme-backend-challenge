import { Card } from "../../card/card";

export enum PaymentMethod {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum TransactionErrorMessages {
  INVALID_AMOUNT = "Amount must be greater than 0",
  CARD_EXPIRED = "Card expired",
  INVALID_CARD_NUMBER = "Invalid card number",
  INVALID_CARD_CVV = "Invalid card cvv",
  INVALID_CARD_OWNER = "Invalid card owner",
}

export type TransactionDTO = {
  amount: number;
  description: string;
  date: Date;
  paymentMethod: PaymentMethod;
  card: Card;
};
