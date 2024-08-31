import { Payable } from "../../domain/index";
import { PayableRepository } from "../index";

export class InMemoryPayableRepository implements PayableRepository {
  private payables: Payable[];

  constructor() {
    this.payables = [];
  }

  async save(payable: Payable): Promise<void> {
    this.payables.push(payable);
  }
}
