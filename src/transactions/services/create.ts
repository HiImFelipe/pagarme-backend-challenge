import { ServiceModule } from "../../contracts/service-module";
import { Payable, PayablePaymentMethod } from "../../payable/domain";
import { Transaction, TransactionDTO } from "../domain/index";
import { TransactionRepository } from "../infra/index";

export class CreateTransactionService {
  constructor(
    public readonly transactionRepository: TransactionRepository,
    public readonly payableService: ServiceModule<Payable>
  ) {}

  async execute(transactionData: TransactionDTO): Promise<Transaction> {
    const transaction = new Transaction(transactionData);

    await this.transactionRepository.save(transaction);

    this.payableService.create({
      amount: transaction.amount,
      transactionDate: transaction.date,
      paymentMethod:
        PayablePaymentMethod[
          transaction.paymentMethod.toUpperCase() as keyof typeof PayablePaymentMethod
        ],
    });

    return transaction;
  }
}
