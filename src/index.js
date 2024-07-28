import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Leaderboard from "./components/Ranking";
import SkinGenerator from "./components/SkinGenerator";
import GlobalHeader from "./components/Header";
import React, { useState } from 'react';
import Exchange from "./components/Exchange";
import RFTsPage from "./components/RFTPage";


export default function App() {
  const [api, setApi] = useState(null);
  const [address, setAddress] = useState(null);

  return (
    <BrowserRouter>
  <GlobalHeader setAddress={setAddress} />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/leaderboard" element={<Leaderboard />}></Route>
        <Route path="/ai-skins" element={<SkinGenerator />}></Route>
        <Route path="/exchange" element={<Exchange />}></Route>
        <Route path="/rfts/:id" element={<RFTsPage />}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
