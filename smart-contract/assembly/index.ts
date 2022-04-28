import { Car, listedCars } from "./model";
import { ContractPromiseBatch, context } from "near-sdk-as";

export function setCar(car: Car): void {
  let storedCar = listedCars.get(car.id);
  if (storedCar !== null) {
    throw new Error(`car with ${car.id} already exists`);
  }
  listedCars.set(car.id, Car.fromPayload(car));
}

export function getCar(id: string): Car | null {
  return listedCars.get(id);
}

export function getCars(): Car[] {
  return listedCars.values();
}

export function buyCar(carId: string): void {
  const car = getCar(carId);
  if (car == null) {
    throw new Error("car not found");
  }
  if (!car.isSale) {
    throw new Error("Car is not for sale");
  }
  if (car.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the car's price");
  }
  ContractPromiseBatch.create(car.owner).transfer(context.attachedDeposit);
  car.owner = context.sender;
  car.isSale = false;
  car.isRent = false;
  car.isBought = true;
  listedCars.set(car.id, car);
}

export function rentingCar(carId: string): void {
  const car = getCar(carId);
  if (car == null) {
    throw new Error("car not found");
  }
  if (!car.isRent) {
    throw new Error("Car is not for rent");
  }
  if (car.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the car's price");
  }
  ContractPromiseBatch.create(car.owner).transfer(context.attachedDeposit);
  car.isSale = false;
  car.isRent = false;
  car.isRented = true;
  listedCars.set(car.id, car);
}

export function sellCar(carId: string): void {
  const car = getCar(carId);
  if (car == null) {
    throw new Error("car not found");
  }
  if (car.owner != context.sender) {
    throw new Error("You are not the owner");
  }
  car.isSale = true;
  car.isBought = false;
  car.isRent = false;
  listedCars.set(car.id, car);

}

export function rentCar(carId: string): void {
  const car = getCar(carId);
  if (car == null) {
    throw new Error("car not found");
  }
  if (car.owner != context.sender) {
    throw new Error("You are not the owner");
  }
  car.isRent = true;
  car.isSale = false;
  car.isRented = false;
  listedCars.set(car.id, car);

}

export function redeemCar(carId:string):void{
    const car = getCar(carId);
  if (car == null) {
    throw new Error("car not found");
  }
  if (car.owner != context.sender) {
    throw new Error("You are not the owner");
  } 
  car.isRent = false;
  car.isSale = false;
  car.isRented = false;
  listedCars.set(car.id, car);
}
