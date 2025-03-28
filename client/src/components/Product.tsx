import React from 'react';
import styles from '../styles/components/Product.module.css';
import AddToCart from './AddToCart';
import ImageWithLoader from './ImageWithLoader';

interface ProductProps {
  image: string;
  name: string;
  amount: number;
  id: string;
  description: string;
}

const Product: React.FC<ProductProps> = ({ image, name, amount, id, description }) => {
  return (
    <div className={styles.product}>
      <ImageWithLoader src={image} alt={name} classStyle={styles.image} />
      <h5 className={styles.title}>{name}</h5>
      <span className={styles.price}>${amount}</span>
      <p className={styles.description}>{description}</p>
      <AddToCart id={id} name={name} amount={amount} />
    </div>
  );
};

export default Product;
