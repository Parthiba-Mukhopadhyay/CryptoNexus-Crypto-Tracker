import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="p-2 pb-8 md:pb-24 text-white min-h-screen">
      <div className="max-w-xl mx-auto mt-20 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Stay Ahead. Stay Informed.
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-semibold mb-2">
          Largest Crypto Network
        </h2>
        <h4 className="text-lg md:text-xl lg:text-2xl font-light mb-4">
          Get Real-Time Updates | Analyze Market Trends | Make Smarter Investments
        </h4>
        <p className="text-2xl md:text-3xl font-bold text-gray-300 italic">
          Explore now!!!
        </p>
        <form
          onSubmit={searchHandler}
          className="flex w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden"
        >
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto.."
            required
            className="flex-1 p-2 text-black outline-none border-none custom-datalist-arrow"
          />
          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="bg-gradient-to-br from-yellow-500 to-orange-700 text-white px-4 py-2 m-1 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </form>
      </div>
      <div className="max-w-4xl mx-auto mt-8 md:mt-16 p-2 md:p-4 rounded-lg bg-gray-900 shadow-lg border-2">
        <div className="grid grid-cols-10 md:grid-cols-10 p-2 md:p-4 border-b border-gray-600 text-xs md:text-lg font-semibold text-gray-300">
          <p className="col-span-2 md:col-span-1">#</p>
          <p className="col-span-4 md:col-span-3">Coins</p>
          <p className="col-span-2 text-center">Price</p>
          <p className="col-span-2 text-center">24H Change</p>
          <p className="hidden md:col-span-2 md:text-right md:block">
            Market Cap
          </p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link
            to={`/coin/${item.id}`}
            className="grid grid-cols-10 md:grid-cols-10 p-2 md:p-4 border-b border-gray-600 last:border-none hover-bg-light transition-colors text-xs md:text-base"
            key={index}
          >
            <p className="col-span-2 md:col-span-1">{item.market_cap_rank}</p>
            <div className="col-span-4 md:col-span-3 flex items-center">
              <img src={item.image} alt={item.name} className="w-8 h-8 mr-2" />
              <p className="hidden md:block">
                {item.name} - <span className="uppercase">{item.symbol}</span>
              </p>
              <p className="md:hidden uppercase">{item.symbol}</p>
            </div>
            <p className="col-span-2 text-center">
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                item.price_change_percentage_24h > 0
                  ? "col-span-2 text-green-500 text-center"
                  : "col-span-2 text-red-500 text-center"
              }
            >
              {item.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="hidden md:col-span-2 md:text-right md:block">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
