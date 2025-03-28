import './styles/App.css';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import Checkout from './pages/Checkout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Submitted from './pages/Submitted';
import Products from './pages/Products';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import { accessories, hats, shirts, socks } from './constants/products';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/key`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripe(loadStripe(publishableKey));
    });
  }, [API_URL]);

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shirts" element={<Products products={shirts} />} />
            <Route path="/hats" element={<Products products={hats} />} />
            <Route path="/socks" element={<Products products={socks} />} />
            <Route path="/accessories" element={<Products products={accessories} />} />
            <Route path="/checkout" element={<Checkout stripe={stripe} />} />
            <Route path="/submitted" element={<Submitted />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
