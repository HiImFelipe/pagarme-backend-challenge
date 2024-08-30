import { CardDTO } from "../../card/domain/card-dto";
import { Card } from "../../card/domain/card";
import {
  TransactionPaymentMethod as PaymentMethod,
  TransactionDTO,
  TransactionErrorMessages,
} from "./transaction-dto";

import { v4 as uuidv4 } from "uuid";

export class Transaction {
  public readonly id: string;
  public readonly amount: number;
  public readonly description: string;
  public readonly date: Date;
  public readonly paymentMethod: PaymentMethod;
  public readonly card: Card;

  constructor({
    amount,
    card,
    date,
    description,
    paymentMethod,
  }: TransactionDTO) {
    if (amount <= 0) {
      throw new Error(TransactionErrorMessages.INVALID_AMOUNT);
    }

    console.log(card.expirationDate.toISOString(), date.toISOString());

    if (card.expirationDate < date) {
      throw new Error(TransactionErrorMessages.CARD_EXPIRED);
    }

    if (card.number.length !== 16) {
      throw new Error(TransactionErrorMessages.INVALID_CARD_NUMBER);
    }

    if (card.cvv.length !== 3) {
      throw new Error(TransactionErrorMessages.INVALID_CARD_CVV);
    }

    if (card.ownerName.length === 0) {
      throw new Error(TransactionErrorMessages.INVALID_CARD_OWNER);
    }

    this.id = uuidv4();
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.paymentMethod = paymentMethod;

    const cardData: CardDTO = {
      cvv: card.cvv,
      expirationDate: card.expirationDate,
      number: card.number,
      ownerName: card.ownerName,
    };

    this.card = new Card(cardData);
  }

  public isDebit(): boolean {
    return this.paymentMethod === PaymentMethod.DEBIT;
  }

  public isCredit(): boolean {
    return this.paymentMethod === PaymentMethod.CREDIT;
  }
}
