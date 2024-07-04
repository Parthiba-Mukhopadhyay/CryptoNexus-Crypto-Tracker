import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GXQ76Ak4PKsXfCCuTbq8Qq4N",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-GXQ76Ak4PKsXfCCuTbq8Qq4N",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin-container min-h-screen">
        <div className="coin-header pt-8 px-4 md:px-8 text-center border-white shadow-lg rounded-lg">
          <img
            src={coinData.image.large}
            alt={coinData.name}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-4 transform transition-transform duration-500 ease-in-out hover:scale-110"
            style={{ animation: "fadeIn 1s ease-in-out forwards" }}
          />
          <h1
            className="text-4xl md:text-5xl font-bold text-white "
            style={{
              animation: "fadeIn 1s ease-in-out forwards",
              animationDelay: "0.5s",
            }}
          >
            {coinData.symbol.toUpperCase()}
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 pb-4"
            style={{
              animation: "fadeIn 1s ease-in-out forwards",
              animationDelay: "1s",
            }}
          >
            {coinData.name}
          </p>
        </div>
        <div className="coin-details container mx-auto my-8 flex flex-col md:flex-row border-2 border-dotted">
          <div className="coin-info md:w-1/3 p-6 md:rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Coin Information
            </h2>
            <ul className="grid grid-cols-1 gap-4">
              <li className="py-2 border-b border-gray-300 flex justify-between">
                <span className="font-semibold text-cyan-200">
                  Crypto Market Rank
                </span>
                <span className="text-right text-yellow-400 font-bold">
                  {coinData.market_cap_rank}
                </span>
              </li>
              <li className="py-2 border-b border-gray-300 flex justify-between">
                <span className="font-semibold text-cyan-200">
                  Current Price
                </span>
                <span className="text-right text-yellow-400 font-bold">
                  {currency.symbol}{" "}
                  {coinData.market_data.current_price[
                    currency.name
                  ].toLocaleString()}
                </span>
              </li>
              <li className="py-2 border-b border-gray-300 flex justify-between">
                <span className="font-semibold text-cyan-200">Market Cap</span>
                <span className="text-right text-yellow-400 font-bold">
                  {currency.symbol}{" "}
                  {coinData.market_data.market_cap[
                    currency.name
                  ].toLocaleString()}
                </span>
              </li>
              <li className="py-2 border-b border-gray-300 flex justify-between">
                <span className="font-semibold text-cyan-200">
                  24 Hour High
                </span>
                <span className="text-right text-yellow-400 font-bold">
                  {currency.symbol}{" "}
                  {coinData.market_data.high_24h[
                    currency.name
                  ].toLocaleString()}
                </span>
              </li>
              <li className="py-2 border-b border-gray-300 flex justify-between">
                <span className="font-semibold text-cyan-200">24 Hour Low</span>
                <span className="text-right text-yellow-400 font-bold">
                  {currency.symbol}{" "}
                  {coinData.market_data.low_24h[currency.name].toLocaleString()}
                </span>
              </li>
            </ul>
          </div>
          <div className="coin-chart md:h-2/3 md:w-2/3 md:96 p-6 md:rounded-lg mt-4 md:mt-0">
            <h2 className="text-2xl md:text-3xl font-bold pb-4 mb-5">
              Daily Price Variance
            </h2>
            <LineChart historicalData={historicalData} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner flex items-center justify-center h-screen">
        <div className="spin w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
};

export default Coin;
