# import stripe
# from django.conf import settings
# from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# from django.views import View
# from djstripe.models import  Subscription
# from djstripe import Subscription
# from django.contrib.auth.models import User


# stripe.api_key = settings.STRIPE_SECRET_KEY

# @method_decorator(csrf_exempt, name='dispatch')
# class StripeWebhook(View):
#     def post(self, request, *args, **kwargs):
#         payload = request.body.decode('utf-8')
#         sig_header = request.headers.get('stripe-signature')

#         try:
#             event = stripe.Webhook.construct_event(
#                 payload, sig_header, settings.STRIPE_ENDPOINT_SECRET
#             )
#         except ValueError as e:
#             return HttpResponse(status=400)
#         except stripe.error.SignatureVerificationError as e:
#             return HttpResponse(status=400)

#         # Handle the event
#         if event['type'] == 'customer.subscription.updated':
#             subscription = event['data']['object']
#             user = User.objects.get(id=subscription['metadata']['user_id'])
#             subscription_record, created = Subscription.objects.get_or_create(user=user)
#             subscription_record.stripe_subscription_id = subscription['id']
#             subscription_record.active = subscription['status'] == 'active'
#             subscription_record.save()

#         return HttpResponse(status=200)



import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from djstripe.models import  Subscription
from django.contrib.auth.models import User


# stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
stripe.api_key = 'sk_test_51PQQsWIJIsx7jmFZGSmKtlhhxQT0EkPhWcbVOiPHRtrOHfefIeQnQU5lM7vqVYqv99MCeKEizEvLhhTbbpzcyxjx00tLMFCtGG'



@csrf_exempt
def stripe_webhook(request):
    payload = request.body.decode('utf-8')
    sig_header = request.headers.get('stripe-signature')
    endpoint_secret = settings.STRIPE_ENDPOINT_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)

    # Handle the event
    if event['type'] == 'customer.subscription.updated':
        subscription = event['data']['object']
        # Update subscription status in your database
        user = User.objects.get(id=subscription['metadata']['user_id'])
        subscription_record, created = Subscription.objects.get_or_create(user=user)
        subscription_record.stripe_subscription_id = subscription['id']
        subscription_record.active = subscription['status'] == 'active'
        subscription_record.save()

    return HttpResponse(status=200)
