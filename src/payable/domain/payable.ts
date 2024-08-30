import { PayableDTO, PayablePaymentMethod, PayableStatus } from "./payable-dto";
import { v4 as uuidv4 } from "uuid";

export const FEE_PERCENTAGE_TABLE = {
  credit: 5,
  debit: 3,
};

type CalculateFeeResponse = {
  feePercentage: number;
  newAmount: number;
};

export class Payable {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public readonly grossAmount: number;
  public readonly netAmount: number;
  public readonly status: PayableStatus;
  public readonly paymentDate: Date;
  public readonly paymentMethod: PayablePaymentMethod;
  public readonly feePercentage;

  constructor({ amount, paymentDate, paymentMethod, status }: PayableDTO) {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this.grossAmount = amount;
    this.paymentDate = paymentDate;
    this.paymentMethod = paymentMethod;
    this.status =
      PayableStatus[status.toUpperCase() as keyof typeof PayableStatus];

    const { newAmount: netAmount, feePercentage } =
      this.calculateFee(paymentMethod);

    this.feePercentage = feePercentage;
    this.netAmount = netAmount;
  }

  private calculateFee(
    paymentMethod: PayablePaymentMethod
  ): CalculateFeeResponse {
    const fee = this.grossAmount * (FEE_PERCENTAGE_TABLE[paymentMethod] / 100);

    return {
      feePercentage: FEE_PERCENTAGE_TABLE[paymentMethod],
      newAmount: this.grossAmount - fee,
    };
  }
}
