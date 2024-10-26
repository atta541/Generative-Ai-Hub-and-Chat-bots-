import stripe
from django.conf import settings
from django.shortcuts import redirect
from django.http import JsonResponse

stripe.api_key = settings.STRIPE_TEST_SECRET_KEY

def create_checkout_session(request):
    YOUR_DOMAIN = "http://localhost:8000"
    checkout_session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[
            {
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Subscription',
                    },
                    'unit_amount': 100,  
                },
                'quantity': 1,
            },
        ],
        mode='subscription',
        success_url=YOUR_DOMAIN + '/success/',
        cancel_url=YOUR_DOMAIN + '/cancel/',
    )
    return JsonResponse({
        'id': checkout_session.id
    })
