import { Card } from "../../card/domain/card";
import { PayablePaymentMethod } from "../../payable/domain";
import { mockPayableService } from "../../payable/factories/test/payable-service";
import { PayableService } from "../../payable/services";
import {
  TransactionDTO,
  TransactionPaymentMethod,
} from "../domain/transaction-dto";
import { CreateTransactionService } from "./create";

describe("CreateTransactionService", () => {
  let card: Card;

  beforeAll(() => {
    jest.useFakeTimers();
  });

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

  it("should create a new transaction", async () => {
    const transactionRepository = {
      save: jest.fn(),
    };

    const createTransactionService = new CreateTransactionService(
      transactionRepository,
      mockPayableService
    );

    const transactionData: TransactionDTO = {
      amount: 1000,
      description: "Smartband XYZ 3.0",
      paymentMethod: TransactionPaymentMethod.CREDIT,
      date: new Date(),
      card: {
        cvv: "123",
        expirationDate: new Date("2025-08-30T00:00:00Z"),
        number: "1234567890124567",
        ownerName: "John Doe",
      },
    };

    await createTransactionService.execute(transactionData);

    expect(transactionRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...transactionData,
        card: expect.objectContaining(transactionData.card),
      })
    );

    expect(mockPayableService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        transactionDate: transactionData.date,
        paymentMethod: PayablePaymentMethod.CREDIT,
        amount: transactionData.amount,
      })
    );
  });
});
