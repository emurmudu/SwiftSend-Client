import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaStripe } from "react-icons/fa";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!FaStripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default Checkout;