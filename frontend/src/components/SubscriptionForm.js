// // SubscriptionForm.js
// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const SubscriptionForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const cardElement = elements.getElement(CardElement);

//     // Create a Payment Method
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//       billing_details: { email },
//     });

//     if (error) {
//       setError(error.message);
//       setLoading(false);
//       return;
//     }

//     // Call Django API to create a subscription
//     const response = await fetch('http://127.0.0.1:8000/api/create-subscription/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         payment_method_id: paymentMethod.id,
//       }),
//     });

//     const data = await response.json();

//     if (data.error) {
//       setError(data.error);
//     } else {
//       // Confirm the payment
//       const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
//       if (confirmError) {
//         setError(confirmError.message);
//       } else {
//         alert('Subscription successful!');
//       }
//     }
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Subscribe'}
//       </button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default SubscriptionForm;

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { email },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/create-subscription/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          payment_method_id: paymentMethod.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
        if (confirmError) {
          setError(confirmError.message);
        } else {
          alert('Subscription successful! Welcome to our premium chatbot service.');
        }
      }
    } catch (err) {
      setError('An error occurred while processing your subscription. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Premium AI Chatbot Access</h2>
      <p className="mb-4">Unlock advanced LLM chatbots for just $20/month</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="card-element" className="block text-sm font-medium mb-1">
            Card Details
          </label>
          <div className="p-3 bg-gray-800 border border-gray-700 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#FFC7EE',
                    iconColor: '#FFC7EE'
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 transition-colors duration-300'
          }`}
        >
          {loading ? 'Processing...' : 'Activate Premium Access'}
        </button>
        {error && (
          <div className="p-3 bg-red-900 border border-red-700 text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubscriptionForm;