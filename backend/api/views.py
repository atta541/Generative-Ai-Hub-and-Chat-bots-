import json
import logging

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

import stripe
from .models import UserProfile
from .services import create_checkout_session




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    return Response({"user": request.user.username}, status=status.HTTP_200_OK)



stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
logging.basicConfig(level=logging.INFO)  # Set up logging

@csrf_exempt
def create_checkout_session(user):
    try:
        # data = json.loads(request.body)
        user_id=user.id
        # user_id = data.get('user_id')  # Get user ID from request data

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': 'price_1PqGvwIJIsx7jmFZLp3cyCWR',  # Replace with your actual price ID
                'quantity': 1,
            }],
            mode='subscription',
            success_url='http://localhost:3000/',
            cancel_url='https://yourdomain.com/cancel',
            meetadata={'user_id': str(user_id)}  # Store user ID in metadata
        )

        return JsonResponse({'id': session.id})

    except Exception as e:
        logging.error(f"Error creating checkout session: {e}")
        return JsonResponse({'error': str(e)}, status=400)


def checkout(request):
    # For testing, use a fixed user_id (8)
    user_id = 8
    session = create_checkout_session(user_id)
    if session:
        return JsonResponse({'url': session.url})
    else:
        return JsonResponse({'error': 'Failed to create checkout session'}, status=500)


@csrf_exempt
def create_checkout_session_view(user):
    user_id = user.id  # Get the user ID from the request
    session = create_checkout_session({'user_id': user_id})  # Pass the user ID in the data
    return JsonResponse({'url': session.url})




from django.shortcuts import render

def website_info(request):
    return render(request, 'admin/website_info.html')



from django.shortcuts import render
from .models import UserProfile

def all_data(request):
    # Get all user profiles from the UserProfile model
    users = UserProfile.objects.all()  # Fetch all user profiles
    return render(request, 'admin/all_data.html', {'users': users})  # Pass the users to the template




# views.py
from django.shortcuts import render
from .models import Conversation

def user_conversations_view(request, user_id):
    conversations = Conversation.objects.filter(user_id=user_id).select_related('chatbot')
    context = {
        'conversations': conversations,
    }
    return render(request, 'your_template.html', context)  # Adjust to your template
