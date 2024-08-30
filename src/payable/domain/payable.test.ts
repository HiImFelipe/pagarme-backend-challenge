import { Payable } from "./payable";
import { PayablePaymentMethod, PayableStatus } from "./payable-dto";

describe("Payable", () => {
  it("should instantiate a new payable correctly", () => {
    const transaction = new Payable({
      amount: 100,
      paymentDate: new Date(),
      paymentMethod: PayablePaymentMethod.CREDIT,
      status: PayableStatus.PAID,
    });

    expect(transaction).toBeInstanceOf(Payable);
  });

  describe("calculateFee", () => {
    it("should calculate the fee correctly (credit)", () => {
      const transaction = new Payable({
        amount: 100,
        paymentDate: new Date(),
        paymentMethod: PayablePaymentMethod.CREDIT,
        status: PayableStatus.PAID,
      });

      expect(transaction.grossAmount).toBe(100);
      expect(transaction.feePercentage).toBe(5);
      expect(transaction.netAmount).toBe(95);
    });

    it("should calculate the fee correctly (debit)", () => {
      const transaction = new Payable({
        amount: 100,
        paymentDate: new Date(),
        paymentMethod: PayablePaymentMethod.DEBIT,
        status: PayableStatus.PAID,
      });

      expect(transaction.grossAmount).toBe(100);
      expect(transaction.feePercentage).toBe(3);
      expect(transaction.netAmount).toBe(97);
    });

    it("should calculate the fee correctly (credit) with different amount", () => {
      const transaction = new Payable({
        amount: 200,
        paymentDate: new Date(),
        paymentMethod: PayablePaymentMethod.CREDIT,
        status: PayableStatus.PAID,
      });

      expect(transaction.grossAmount).toBe(200);
      expect(transaction.feePercentage).toBe(5);
      expect(transaction.netAmount).toBe(190);
    });

    it("should calculate the fee correctly (debit) with different amount", () => {
      const transaction = new Payable({
        amount: 200,
        paymentDate: new Date(),
        paymentMethod: PayablePaymentMethod.DEBIT,
        status: PayableStatus.PAID,
      });

      expect(transaction.grossAmount).toBe(200);
      expect(transaction.feePercentage).toBe(3);
      expect(transaction.netAmount).toBe(194);
    });
  });
});
