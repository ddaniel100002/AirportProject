import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from './home/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
