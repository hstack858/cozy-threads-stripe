import styles from '../styles/pages/Submitted.module.css';

const Submitted: React.FC = () => {
  return (
    <div className={styles.submitted}>
      <div className={styles.success}>
        <i className={`fa-solid fa-circle-check ${styles.checkmark}`}></i>
        <span className={styles.message} data-test="thank-you">
          Thank you for your order!
        </span>
      </div>
    </div>
  );
};

export default Submitted;
