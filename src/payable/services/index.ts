import {
  CreatePayableRequest,
  CreatePayableResponse,
  CreatePayableService,
} from "./create";

export class PayableService {
  constructor(private readonly createPayableService: CreatePayableService) {}

  async create(payableData: CreatePayableRequest): CreatePayableResponse {
    return this.createPayableService.execute(payableData);
  }
}
