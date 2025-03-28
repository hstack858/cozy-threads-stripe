import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/components/AddToCart.module.css';

interface AddToCartProps {
  id: string;
  name: string;
  amount: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ id, name, amount }) => {
  const [cartSize, setCartSize] = useState<number>(0);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const itemToFind = cart.find((item) => item.id === id);
    if (itemToFind) {
      setCartSize(itemToFind.quantity);
    } else {
      setCartSize(0);
    }
  }, [cart, id]);

  const incrementCart = () => {
    addToCart({
      id,
      name,
      amount,
      quantity: 1,
    });
    setCartSize(cartSize + 1);
  };

  const decrementCart = () => {
    removeFromCart(id);
    setCartSize(cartSize - 1);
  };

  return (
    <div className={styles.addToCart}>
      <button
        className={styles.cartButton}
        onClick={decrementCart}
        disabled={cartSize === 0}
        data-test="remove-from-cart"
      >
        <i className="fa-solid fa-minus"></i>
      </button>
      <div>
        Add to cart
        {cartSize > 0 && (
          <span className={styles.cartBadge} data-test="product-card-badge">
            {cartSize}
          </span>
        )}
      </div>
      <button className={styles.cartButton} onClick={incrementCart} data-test="add-to-cart">
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default AddToCart;
