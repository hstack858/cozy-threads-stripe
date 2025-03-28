import { Link } from "react-router-dom";
import styles from "../../styles/components/layout/Navbar.module.css";
import { useCart } from "../../contexts/CartContext";
import { LINKS } from "../../constants/navbar_links";
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const { getCartSize } = useCart();
  const [cartSize, setCartSize] = useState<number>(0);
  useEffect(() => {
    setCartSize(getCartSize());
  }, [getCartSize]);

  return (
    <nav className={styles.navbar}>
      <Link className={styles.logoLink} to="/">
        <img
          className={styles.navLogo}
          src="https://cozy-threads-henry.s3.us-east-1.amazonaws.com/logo-square.png"
          alt="Logo - Home link"
        />
        <img
          className={styles.navLogoText}
          src="https://cozy-threads-henry.s3.us-east-1.amazonaws.com/cozy-threads-text.png"
          alt="Cozy Threads - Home Link"
        />
      </Link>
      <div className={styles.links}>
        {LINKS.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>

      <Link className={styles.cart} to="/checkout" data-test="cart-button">
        <i className="fa-solid fa-cart-shopping" />
        {cartSize > 0 && (
          <span className={styles.cartBadge} data-test="nav-cart-badge">
            {cartSize}
          </span>
        )}
      </Link>
    </nav>
  );
};
export default NavBar;
