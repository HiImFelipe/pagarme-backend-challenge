import { CardDTO } from "./card-dto";
import { v4 as uuidv4 } from "uuid";

export class Card {
  public readonly id: string;
  public readonly createdAt: Date;

  public readonly number: string;
  public readonly cvv: string;
  public readonly expirationDate: Date;
  public readonly ownerName: string;

  constructor({ cvv, expirationDate, number, ownerName }: CardDTO) {
    this.id = uuidv4();
    this.createdAt = new Date();

    this.number = number;
    this.cvv = cvv;
    this.expirationDate = expirationDate;
    this.ownerName = ownerName;
  }
}
