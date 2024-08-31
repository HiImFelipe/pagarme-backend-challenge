import { Transaction } from "../domain/index";

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
}
