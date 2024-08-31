import {
  PayableDTO,
  PayableJSON,
  PayablePaymentMethod,
  PayableStatus,
} from "./payable-dto";
import { v4 as uuidv4 } from "uuid";

export const FEE_PERCENTAGE_TABLE = {
  credit: 5,
  debit: 3,
};

type CalculateFeeResponse = {
  feePercentage: number;
  newAmount: number;
};

const THIRTY_DAYS_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000;

export class Payable {
  public readonly id: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private _grossAmount: number;
  private _netAmount: number;
  private _paymentDate: Date;
  private _paymentMethod: PayablePaymentMethod;
  private _feePercentage;
  private _status: PayableStatus;
  private _transactionDate: Date;

  constructor({ amount, transactionDate, paymentMethod }: PayableDTO) {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();

    this._grossAmount = amount;
    this._paymentMethod = paymentMethod;
    this._transactionDate = transactionDate;

    this._status = this.getStatusByPaymentMethod(paymentMethod);
    this._paymentDate = this.paymentDateByPaymentMethodAndTransactionDate(
      paymentMethod,
      transactionDate
    );

    const { newAmount: netAmount, feePercentage } =
      this.calculateFee(paymentMethod);

    this._feePercentage = feePercentage;
    this._netAmount = netAmount;
  }

  get grossAmount(): number {
    return this._grossAmount;
  }

  get netAmount(): number {
    return this._netAmount;
  }

  get paymentDate(): Date {
    return this._paymentDate;
  }

  get paymentMethod(): PayablePaymentMethod {
    return this._paymentMethod;
  }

  get feePercentage(): number {
    return this._feePercentage;
  }

  get status(): PayableStatus {
    return this._status;
  }

  get transactionDate(): Date {
    return this._transactionDate;
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

  private getStatusByPaymentMethod(
    paymentMethod: PayablePaymentMethod
  ): PayableStatus {
    switch (paymentMethod) {
      case PayablePaymentMethod.CREDIT:
        return PayableStatus.WAITING_FUNDS;
      case PayablePaymentMethod.DEBIT:
        return PayableStatus.PAID;
      default:
        throw new Error("Invalid payment method");
    }
  }

  private paymentDateByPaymentMethodAndTransactionDate(
    paymentMethod: PayablePaymentMethod,
    transactionDate: Date
  ): Date {
    switch (paymentMethod) {
      case PayablePaymentMethod.CREDIT:
        return new Date(
          transactionDate.getTime() + THIRTY_DAYS_IN_MILLISECONDS
        );
      case PayablePaymentMethod.DEBIT:
        return transactionDate;
      default:
        throw new Error("Invalid payment method");
    }
  }

  public toJSON(): PayableJSON {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      paymentDate: this.paymentDate,
      paymentMethod: this.paymentMethod,
      feePercentage: this.feePercentage,
      transactionDate: this.transactionDate,
      grossAmount: this.grossAmount,
      netAmount: this.netAmount,
      status: this.status,
    };
  }
}
