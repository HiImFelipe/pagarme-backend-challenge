import { PayableDTO, PayablePaymentMethod } from "../domain/payable-dto";
import { CreatePayableService } from "./create";

describe("CreatePayableService", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should create a new payable", async () => {
    const payableRepository = {
      save: jest.fn(),
    };

    const createPayableService = new CreatePayableService(payableRepository);

    const payableData: PayableDTO = {
      amount: 1000,
      transactionDate: new Date(),
      paymentMethod: PayablePaymentMethod.CREDIT,
    };

    await createPayableService.execute(payableData);

    expect(payableRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        transactionDate: payableData.transactionDate,
        paymentMethod: payableData.paymentMethod,
        grossAmount: payableData.amount,
      })
    );
  });
});
