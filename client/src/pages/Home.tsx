import styles from '../styles/pages/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.imageContainer}>
      <img
        className={styles.fullScreenImage}
        src="https://cozy-threads-henry.s3.us-east-1.amazonaws.com/cozy-threads-logo.png"
        alt="Cozy Threads: High quality/ethically sourced apparel and accessories"
      />
    </div>
  );
};

export default Home;
