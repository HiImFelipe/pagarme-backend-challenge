import { Payable, PayableDTO } from "../domain/index";
import { PayableRepository } from "../infra/index";

export type CreatePayableRequest = PayableDTO;
export type CreatePayableResponse = Promise<Payable>;

export class CreatePayableService {
  constructor(public readonly payableRepository: PayableRepository) {}

  async execute(payableData: CreatePayableRequest): CreatePayableResponse {
    const payable = new Payable(payableData);

    await this.payableRepository.save(payable);

    return payable;
  }
}
