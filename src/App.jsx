import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Untilted from './Untilted';
import Thunderstorm from './Thunderstorm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando o link for apenas "/", carrega o seu site original */}
        <Route path="/" element={<Home />} />
        
        <Route path="/letras/untilted" element={<Untilted />} />
        <Route path="/letras/thunderstorm" element={<Thunderstorm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;