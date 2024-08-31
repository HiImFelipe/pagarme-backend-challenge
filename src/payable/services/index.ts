import { ServiceModule } from "../../contracts/service-module";
import { Payable } from "../domain";
import {
  CreatePayableRequest,
  CreatePayableResponse,
  CreatePayableService,
} from "./create";

export class PayableService implements ServiceModule<Payable> {
  constructor(private readonly createPayableService: CreatePayableService) {}

  async create(payableData: CreatePayableRequest): CreatePayableResponse {
    return this.createPayableService.execute(payableData);
  }

  async update(): Promise<Payable> {
    throw new Error("Method not implemented.");
  }

  async delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<Payable[]> {
    throw new Error("Method not implemented.");
  }

  async get(): Promise<Payable> {
    throw new Error("Method not implemented.");
  }
}
