import Product from '../components/Product';
import { Product as ProductType } from '../constants/products';
import styles from '../styles/pages/Products.module.css';

interface ProductsProps {
  products: ProductType[];
}

const Products: React.FC<ProductsProps> = ({ products }) => (
  <div className={styles.productPage}>
    <div className={styles.products}>
      {products.map((product) => (
        <Product
          image={product.image}
          name={product.name}
          amount={product.amount}
          id={product.id}
          description={product.description}
          key={product.id}
        />
      ))}
    </div>
  </div>
);

export default Products;
