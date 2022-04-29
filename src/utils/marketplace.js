import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function addCar(car) {
    console.log(car);
  car.id = uuid4();
  car.price = parseNearAmount(car.price + "");
  return window.contract.setCar({ car });
}

export function getCars() {
  return window.contract.getCars();
}

export async function buyCar({ id, price }) {
    await window.contract.buyCar({ carId: id }, GAS, price);
}

export async function rentingCar({ id, price }) {
  await window.contract.rentingCar({ carId: id }, GAS, price);
}

export async function rentCar({ id }) {
  await window.contract.rentCar({ carId: id });
}

export async function sellCar({ id }) {
  await window.contract.sellCar({ carId: id });
}

export async function redeemCar({id}){
    await window.contract.redeemCar({carId: id});
}
