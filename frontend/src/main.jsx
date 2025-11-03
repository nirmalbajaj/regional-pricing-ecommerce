
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CountryProvider } from './context/CountryContext.jsx';
import { CartProvider } from "../src/context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountryProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CountryProvider>
  </React.StrictMode>,
)