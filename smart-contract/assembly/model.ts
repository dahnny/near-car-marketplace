import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Car {
  id: string;
  name: string;
  description: string;
  image: string;
  price: u128;
  owner: string;
  renter:string;
  isUsed: bool;
  isRent: bool;
  isSale: bool;
  isBought: bool;
  isRented: bool;
  public static fromPayload(payload: Car): Car {
    const car = new Car();
    car.id = payload.id;
    car.name = payload.name;
    car.description = payload.description;
    car.image = payload.image;
    car.price = payload.price;
    car.owner = context.sender;
    car.renter= "";
    car.isUsed = payload.isUsed;
    car.isRent = payload.isRent;
    car.isSale = payload.isSale;
    car.isBought = false;
    car.isRented = false;
    return car;
  }
}

export const listedCars = new PersistentUnorderedMap<string, Car>("CARS");
