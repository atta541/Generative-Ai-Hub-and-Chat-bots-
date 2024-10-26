import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_TEST_SECRET_KEY

def create_checkout_session(user_id):
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': 'price_1PpfVEIJIsx7jmFZx21Q0qXe',  # Replace with your actual price ID
                'quantity': 1,
            }],
            mode='subscription',
            success_url='https://your-domain.com/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='https://your-domain.com/cancel',
            metadata={'user_id': user_id}  # Include user_id in metadata
        )
        return checkout_session.url
    except stripe.error.StripeError as e:
        # Handle Stripe errors
        return str(e)
