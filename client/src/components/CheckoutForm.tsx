import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../styles/components/CheckoutForm.module.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (stripe && elements) {
      setLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/submitted`,
        },
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message ?? "");
      } else {
        setErrorMessage("An unexpected error occured.");
      }
      setLoading(false);
    }
  };

  return (
    <form
      id="payment-form"
      className={styles.paymentForm}
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" />
      {errorMessage && (
        <div id="payment-message" className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}
      <button
        disabled={loading || !stripe || !elements}
        id="submit"
        className={styles.payButton}
        data-test="payment-button"
      >
        <span id="button-text">
          {loading ? "Submitting..." : "Submit Payment"}
        </span>
      </button>
    </form>
  );
}
