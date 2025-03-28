import { useCart } from '../contexts/CartContext';
import styles from '../styles/components/LineItem.module.css';

interface LineItemProps {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}

const LineItem: React.FC<LineItemProps> = ({ id, name, amount, quantity }) => {
  const { removeFromCart } = useCart();

  return (
    <div className={styles.lineItem}>
      <span className={styles.lineItemText}>
        {name}: ${amount}
      </span>
      <div className={styles.quantity}>
        {quantity > 0 && <span className={styles.quantityBadge}>{quantity}</span>}
        <button className={styles.removeLineItem} onClick={() => removeFromCart(id)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default LineItem;
