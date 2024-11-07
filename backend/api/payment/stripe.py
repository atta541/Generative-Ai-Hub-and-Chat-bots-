# # views.py
# import json
# import stripe
# from django.conf import settings
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt

# stripe.api_key = 'sk_test_51PQQsWIJIsx7jmFZGSmKtlhhxQT0EkPhWcbVOiPHRtrOHfefIeQnQU5lM7vqVYqv99MCeKEizEvLhhTbbpzcyxjx00tLMFCtGG'

# @csrf_exempt
# def create_subscription(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             email = data.get('email')
#             payment_method_id = data.get('payment_method_id')
#             plan_id = 'price_1QIDVJIJIsx7jmFZKrqSvsQm'  # Use your correct Price ID

#             # Create a customer
#             customer = stripe.Customer.create(
#                 email=email,
#                 payment_method=payment_method_id,
#                 invoice_settings={'default_payment_method': payment_method_id}
#             )

#             # Create a subscription
#             subscription = stripe.Subscription.create(
#                 customer=customer.id,
#                 items=[{'price': plan_id}],  # Use 'price' instead of 'plan'
#                 expand=['latest_invoice.payment_intent']
#             )

#             # Log the entire subscription response for debugging
#             print("Stripe subscription response:", subscription)

#             return JsonResponse({
#                 'subscriptionId': subscription.id,
#                 'clientSecret': subscription.latest_invoice.payment_intent.client_secret
#             })

#         except stripe.error.StripeError as e:
#             # Catch Stripe-specific errors
#             return JsonResponse({'error': str(e)}, status=400)

#         except Exception as e:
#             # Catch general errors
#             return JsonResponse({'error': str(e)}, status=500)

#     return JsonResponse({'error': 'Invalid request'}, status=400)


import json
import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import UserProfile  # Import your UserProfile model
from django.contrib.auth.models import User  # Import User model if needed

stripe.api_key = 'sk_test_51PQQsWIJIsx7jmFZGSmKtlhhxQT0EkPhWcbVOiPHRtrOHfefIeQnQU5lM7vqVYqv99MCeKEizEvLhhTbbpzcyxjx00tLMFCtGG'

@csrf_exempt
def create_subscription(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            payment_method_id = data.get('payment_method_id')
            plan_id = 'price_1QIDVJIJIsx7jmFZKrqSvsQm'  # Use your correct Price ID

            # Fetch the user profile based on email
            user_profile = UserProfile.objects.get(user__email=email)
            print("User profile:", user_profile)

            # Create a customer in Stripe
            customer = stripe.Customer.create(
                email=email,
                payment_method=payment_method_id,
                invoice_settings={'default_payment_method': payment_method_id}
            )

            # Create a subscription
            subscription = stripe.Subscription.create(
                customer=customer.id,
                items=[{'price': plan_id}],  # Use 'price' instead of 'plan'
                expand=['latest_invoice.payment_intent']
            )

            # Check if payment succeeded
            payment_intent = subscription.latest_invoice.payment_intent
            if payment_intent.status == 'succeeded':
                # Update the UserProfile's is_subscripted field
                user_profile.is_subscribed = True
                user_profile.save()

            return JsonResponse({
                'subscriptionId': subscription.id,
                'clientSecret': payment_intent.client_secret
            })

        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User profile not found'}, status=404)

        except stripe.error.StripeError as e:
            # Catch Stripe-specific errors
            return JsonResponse({'error': str(e)}, status=400)

        except Exception as e:
            # Catch general errors
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)
