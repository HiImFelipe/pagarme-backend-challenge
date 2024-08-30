import { Card } from "./card";

describe("Card", () => {
  it("should instantiate a new card correctly", () => {
    const card = new Card({
      cvv: "123",
      expirationDate: new Date(),
      number: "1234567890123456",
      ownerName: "John Doe",
    });

    expect(card).toBeInstanceOf(Card);
  });
});
