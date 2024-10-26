import json
import stripe
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import UserProfile

# Set the Stripe API key and endpoint secret from settings
stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        # Verify the webhook signature and construct the event
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Invalid payload
        print(f"ValueError: {e}")
        return HttpResponse('Invalid payload', status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print(f"SignatureVerificationError: {e}")
        return HttpResponse('Invalid signature', status=400)

    # Print the entire event object for debugging
    print(json.dumps(event, indent=4))

    # Handle the event
    if event['type'] == 'checkout.session.completed':
        # Extract the session object from the event
        session = event['data']['object']

        # Print the session object for debugging
        print(json.dumps(session, indent=4))

        # Get the email from customer_details
        customer_details = session.get('customer_details', {})
        email = customer_details.get('email')

        print(f"Email: {email}")

        # If you want to perform additional actions with the email
        if email:
            try:
                user_profile = UserProfile.objects.get(email=email)
                user_profile.is_subscribed = True
                user_profile.save()
                print(f"User with email {email} subscription updated to True")
            except UserProfile.DoesNotExist:
                print(f"User profile with email {email} does not exist")
            except Exception as e:
                print(f"Error updating subscription for user with email {email}: {e}")

    return HttpResponse('Event received', status=200)
