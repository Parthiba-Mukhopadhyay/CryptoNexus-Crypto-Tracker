import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className="navbar text-white border-b-2 border-gray-700 py-4 px-4 md:px-10 lg:px-16 flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="Logo" className="w-32 md:w-40 lg:w-48" />
      </Link>
      <div className="flex items-center">
        <select
          onChange={currencyHandler}
          className="text-white bg-gray-900 border-2 border-white rounded-md py-1 px-8 md:py-2 md:px-14 lg:px-20"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
