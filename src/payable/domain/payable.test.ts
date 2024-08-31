import { Payable } from "./payable";
import { PayablePaymentMethod, PayableStatus } from "./payable-dto";

describe("Payable", () => {
  it("should instantiate a new payable correctly", () => {
    const payable = new Payable({
      amount: 100,
      transactionDate: new Date(),
      paymentMethod: PayablePaymentMethod.CREDIT,
    });

    expect(payable).toBeInstanceOf(Payable);
  });

  describe("calculateFee", () => {
    it("should calculate the fee correctly (credit)", () => {
      const payable = new Payable({
        amount: 100,
        transactionDate: new Date(),
        paymentMethod: PayablePaymentMethod.CREDIT,
      });

      expect(payable.grossAmount).toBe(100);
      expect(payable.feePercentage).toBe(5);
      expect(payable.netAmount).toBe(95);
      expect(payable.status).toBe(PayableStatus.WAITING_FUNDS);
    });

    it("should calculate the fee correctly (debit)", () => {
      const payable = new Payable({
        amount: 100,
        transactionDate: new Date(),
        paymentMethod: PayablePaymentMethod.DEBIT,
      });

      expect(payable.grossAmount).toBe(100);
      expect(payable.feePercentage).toBe(3);
      expect(payable.netAmount).toBe(97);
      expect(payable.status).toBe(PayableStatus.PAID);
    });

    it("should calculate the fee correctly (credit) with different amount", () => {
      const payable = new Payable({
        amount: 200,
        transactionDate: new Date(),
        paymentMethod: PayablePaymentMethod.CREDIT,
      });

      expect(payable.grossAmount).toBe(200);
      expect(payable.feePercentage).toBe(5);
      expect(payable.netAmount).toBe(190);
      expect(payable.status).toBe(PayableStatus.WAITING_FUNDS);
    });

    it("should calculate the fee correctly (debit) with different amount", () => {
      const payable = new Payable({
        amount: 200,
        transactionDate: new Date(),
        paymentMethod: PayablePaymentMethod.DEBIT,
      });

      expect(payable.grossAmount).toBe(200);
      expect(payable.feePercentage).toBe(3);
      expect(payable.netAmount).toBe(194);
      expect(payable.status).toBe(PayableStatus.PAID);
    });
  });
});
