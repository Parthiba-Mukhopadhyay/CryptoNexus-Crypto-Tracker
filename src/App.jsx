import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

const App = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(90deg, rgba(16, 16, 16, 1) 0%, rgba(0, 40, 100, 1) 50%, rgba(16,16,16, 1) 100%)",
        color: "white",
      }}
    >
      <Navbar />
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<Coin />} />
        </Routes>
      </div>
      <Chatbot/>
      <Footer />
    </div>
  );
};

export default App;
