import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';

const CheckoutButton = () => {
    const { userId } = useContext(AuthContext); // Get userId from context
    const [loading, setLoading] = useState(false);

    const createCheckoutSession = async () => {
        if (!userId) {
            console.error('User ID is not available');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/create-checkout-session/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,  // Use userId from context
                }),
            });

            const { id } = await response.json();
            const stripe = Stripe('your-public-key-here');
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={createCheckoutSession}
            disabled={loading}
        >
            {loading ? 'Processing...' : 'Checkout'}
        </button>
    );
};

export default CheckoutButton;
