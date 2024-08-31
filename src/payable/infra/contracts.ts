import { Payable } from "../domain/index";

export interface PayableRepository {
  save(payable: Payable): Promise<void>;
}
