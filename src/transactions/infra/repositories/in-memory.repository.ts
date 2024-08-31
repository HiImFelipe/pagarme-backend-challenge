import { Transaction } from "../../domain/index";
import { TransactionRepository } from "../index";

export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
