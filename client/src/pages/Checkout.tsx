import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { Stripe } from '@stripe/stripe-js';
import styles from '../styles/pages/Checkout.module.css';
import { useCart } from '../contexts/CartContext';
import LineItem from '../components/LineItem';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  stripe: Promise<Stripe | null> | null;
}

const Checkout: React.FC<CheckoutProps> = ({ stripe }) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const { cart, totalAmount } = useCart();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }

    fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount(),
      }),
    })
      .then((response) => response.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, [API_URL, cart.length, navigate, totalAmount]);

  return (
    <div className={styles.checkoutPage}>
      {clientSecret && stripe && (
        <div className={styles.elements}>
          <Elements stripe={stripe} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
      <div>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
        {cart.map((cartItem) => (
          <LineItem
            key={cartItem.id}
            id={cartItem.id}
            name={cartItem.name}
            amount={cartItem.amount}
            quantity={cartItem.quantity}
          />
        ))}
        <div className={styles.divider} />
        <div className={styles.totalAmount}>Total: ${totalAmount()}</div>
      </div>
    </div>
  );
};

export default Checkout;
