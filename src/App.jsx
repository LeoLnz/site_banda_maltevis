import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Untilted from './Untilted';
import Thunderstorm from './Thunderstorm';
// TODO: criar e importar Remember.jsx, Cerrado.jsx e Shadows.jsx
// (o Setlist já linka pra /letras/remember, /letras/cerrado, /letras/shadows)

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/letras/untilted" element={<Untilted />} />
        <Route path="/letras/thunderstorm" element={<Thunderstorm />} />
        {/* <Route path="/letras/remember" element={<Remember />} /> */}
        {/* <Route path="/letras/cerrado" element={<Cerrado />} /> */}
        {/* <Route path="/letras/shadows" element={<Shadows />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default App;