import {
  TransactionPaymentMethod as PaymentMethod,
  TransactionErrorMessages,
} from "./transaction-dto";
import { Transaction } from "./transaction";
import { Card } from "../../card/domain/card";

describe("Transaction", () => {
  let card: Card;

  beforeEach(() => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    card = new Card({
      cvv: "123",
      expirationDate,
      number: "1234567890123456",
      ownerName: "John Doe",
    });
  });

  it("should instantiate a new transaction correctly", () => {
    const transaction = new Transaction({
      card,
      amount: 100,
      date: new Date(),
      description: "Transaction description",
      paymentMethod: PaymentMethod.CREDIT,
    });

    expect(transaction).toBeInstanceOf(Transaction);
  });

  it("should throw an error if amount is less than or equal to 0", () => {
    expect(() => {
      new Transaction({
        card,
        amount: 0,
        date: new Date(),
        description: "Transaction description",
        paymentMethod: PaymentMethod.CREDIT,
      });
    }).toThrow(TransactionErrorMessages.INVALID_AMOUNT);
  });

  it("should throw an error if card is expired", () => {
    card = new Card({
      ...card,
      expirationDate: new Date(2020, 1, 1),
    });

    expect(() => {
      new Transaction({
        card,
        amount: 100,
        date: new Date(),
        description: "Transaction description",
        paymentMethod: PaymentMethod.CREDIT,
      });
    }).toThrow(TransactionErrorMessages.CARD_EXPIRED);
  });

  it("should throw an error if card number is invalid", () => {
    expect(() => {
      new Transaction({
        card: {
          ...card,
          number: "123",
        },
        amount: 100,
        date: new Date(),
        description: "Transaction description",
        paymentMethod: PaymentMethod.CREDIT,
      });
    }).toThrow(TransactionErrorMessages.INVALID_CARD_NUMBER);
  });

  it("should throw an error if card cvv is invalid", () => {
    expect(() => {
      new Transaction({
        card: {
          ...card,
          cvv: "12",
        },
        amount: 100,
        date: new Date(),
        description: "Transaction description",
        paymentMethod: PaymentMethod.CREDIT,
      });
    }).toThrow(TransactionErrorMessages.INVALID_CARD_CVV);
  });

  it("should throw an error if card owner is invalid", () => {
    expect(() => {
      new Transaction({
        card: {
          ...card,
          ownerName: "",
        },
        amount: 100,
        date: new Date(),
        description: "Transaction description",
        paymentMethod: PaymentMethod.CREDIT,
      });
    }).toThrow(TransactionErrorMessages.INVALID_CARD_OWNER);
  });

  it("should return true if payment method is debit", () => {
    const transaction = new Transaction({
      card,
      amount: 100,
      date: new Date(),
      description: "Transaction description",
      paymentMethod: PaymentMethod.DEBIT,
    });

    expect(transaction.isDebit()).toBe(true);
  });

  it("should return false if payment method is not debit", () => {
    const transaction = new Transaction({
      card,
      amount: 100,
      date: new Date(),
      description: "Transaction description",
      paymentMethod: PaymentMethod.CREDIT,
    });

    expect(transaction.isDebit()).toBe(false);
  });

  it("should return true if payment method is credit", () => {
    const transaction = new Transaction({
      card,
      amount: 100,
      date: new Date(),
      description: "Transaction description",
      paymentMethod: PaymentMethod.CREDIT,
    });

    expect(transaction.isCredit()).toBe(true);
  });

  it("should return false if payment method is not credit", () => {
    const transaction = new Transaction({
      card,
      amount: 100,
      date: new Date(),
      description: "Transaction description",
      paymentMethod: PaymentMethod.DEBIT,
    });

    expect(transaction.isCredit()).toBe(false);
  });
});
