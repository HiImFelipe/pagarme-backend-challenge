import { ServiceModule } from "../../../contracts/service-module";
import { Payable } from "../../domain";

export class MockPayableService implements ServiceModule<Payable> {
  public create = jest.fn();
  public update = jest.fn();
  public delete = jest.fn();
  public list = jest.fn();
  public get = jest.fn();
}

const mockPayableService = new MockPayableService();

export { mockPayableService };
