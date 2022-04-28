import { Fragment } from "react";
import image from "../image/elements/car.png";
const { default: RentCarItem } = require("./RentCarsItem");

const RentCars = (props) => {
  return (
    <Fragment>
      <section className="choose-car-section pt-120 section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-header text-center">
                <h2 className="section-title">Cars for Rent</h2>
                <p>Rent the car of your choice and have a wonderful ride</p>
              </div>
            </div>
          </div>
          <div className="row">
            {props.cars.map(
              (car) =>
                (car.isRent === "true" || car.isRent === true) && (
                  <RentCarItem
                    key={car.index}
                    car={car}
                    rentCar={props.rentCar}
                  />
                )
            )}
          </div>
        </div>
      </section>
      {/* rent-step-section start */}
      <section className="rent-step-section pt-120">
        <div className="element-one">
          <img src={image} alt="make" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="block-area">
                <div className="block-header">
                  <h2 className="title">Welcome to CeloDealer </h2>
                  <p>We deal with all kinds of cars on the celo blockchain</p>
                </div>
                <div className="block-body">
                  <ul className="num-list">
                    <li>
                      <span className="num">01</span>Download CeloWallet
                      Extension
                    </li>
                    <li>
                      <span className="num">02</span>Setup your Wallet
                    </li>
                    <li>
                      <span className="num">03</span>Choose a car
                    </li>
                    <li>
                      <span className="num">04</span>Buy/Rent your car
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* rent-step-section end */}
    </Fragment>
  );
};

export default RentCars;
