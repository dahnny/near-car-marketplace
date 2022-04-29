import React, { useState, useEffect, useCallback } from "react";
import {
  login,
  logout as destroy,
  accountBalance,
  getAccountId,
} from "./utils/near";
import {
  getCars as getCarsList,
  buyCar,
  addCar,
  sellCar,
  rentingCar,
  rentCar,
  redeemCar,
} from "./utils/marketplace";

import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import SalesCars from "./components/SalesCars";
import RentCars from "./components/RentCars";
import AddCar from "./components/AddCar";
import Footer from "./components/Footer";
import MyCar from "./components/MyCar";

function App() {
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
      await getCars();
      console.log(myCars);
    }
  }, [account]);

  useEffect(() => {
    if (!account.accountId) {
      login();
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  // function to add cars to block
  const addtoCars = async (data) => {
    try {
      addCar(data).then((resp) => {
        getCars();
      });
    } catch (error) {
      console.log({ error });
    }
  };
  const getCars = useCallback(async () => {
    try {
      const cars = await getCarsList();
      setCars(cars);
      setMyCars(cars.filter((car) => car.owner === account.accountId));
      setRentedCars(cars.filter((car) => car.renter === account.accountId));
    } catch (error) {
      console.log({ error });
    }
  }, [setCars, cars]);

  // function to initiate transaction
  const buy = async (price, id) => {
    console.log(price, id);
    try {
      await buyCar({ id, price });
      getCars();
    } catch (error) {
      console.log(error);
    }
  };

  // function to initiate transaction
  const renting = async (price, id) => {
    try {
      await rentingCar({ id, price });
      getCars();
    } catch (error) {
      console.log({ error });
    }
  };

  // // function that is called to make a car available for sale
  const sell = async (id) => {
    try {
      await sellCar({ id });
    } catch (error) {
      console.log(error);
    }
  };

  // // function that is called to make a car available for rentals
  const rent = async (id) => {
    try {
      await rentCar({ id });
    } catch (error) {
      console.log(error);
    }
  };

  const redeem = async (id) => {
    try {
      await redeemCar({ id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <Header balance={balance} />
      <Banner />
      <SalesCars cars={cars} buyCar={buy} />
      {/* <RentCars cars={  cars} rentCar={renting} /> */}
      <AddCar addToCars={addtoCars} />
      <MyCar
        cars={myCars}
        rentedCars={rentedCars}
        sellCar={sell}
        rentCar={rent}
        redeemCar={redeem}
      />
      <Footer />
    </div>
  );
}

export default App;
