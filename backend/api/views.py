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








# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from google.auth.transport import requests
from google.oauth2 import id_token
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from google.oauth2 import id_token




from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])



def google_login(request):
    email = request.data.get("email")
    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    picture = request.data.get("picture")

    if not email:
        return Response({"error": "Email is required"}, status=400)

    try:
        # Get or create the user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
                'username': email.split("@")[0]
            }
        )

        # Update user's first name, last name, or picture if needed
        if not created:
            user.first_name = first_name
            user.last_name = last_name
            user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh),
        })

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return Response({"error": "User authentication failed", "details": str(e)}, status=500)
