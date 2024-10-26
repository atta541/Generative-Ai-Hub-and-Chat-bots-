import stripe
from django.conf import settings


stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
def create_checkout_session(request):
    user_id = request.user.id
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{'price': 'price_XXXX', 'quantity': 1}],
        mode='subscription',
        success_url='https://your-success-url.com',
        cancel_url='https://your-cancel-url.com',
        metadata={'user_id': str(user_id)}
    )
    
    # Log session ID
    print(f"Created checkout session: {session.id}")
    
    return JsonResponse({'id': session.id})
