from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse

import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import json
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import json
import logging
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
import json
import logging
import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
import logging
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
import logging



import json
import logging
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from ..models import UserProfile  # Make sure this path is correct

logger = logging.getLogger(__name__)

# @csrf_exempt
# def login_page(request):
#     logger.debug("Login view triggered")
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         username = data.get('username')
#         password = data.get('password')
#         user = authenticate(username=username, password=password)
        
#         if user is not None:
#             logger.info(f"Authenticated user ID: {user.id}")
#             refresh = RefreshToken.for_user(user)
            
#             # Fetch the user profile
#             try:
#                 user_profile = UserProfile.objects.get(user=user)
#                 is_subscribed = user_profile.is_subscribed
#                 logger.debug(f"User subscription status: {is_subscribed}")
#             except UserProfile.DoesNotExist:
#                 is_subscribed = False
#                 logger.warning(f"UserProfile not found for user ID: {user.id}")
            
#             response_data = {
#                 'access': str(refresh.access_token),
#                 'refresh': str(refresh),
#                 'user_id': user.id,
#                 'email': user.email,
#                 'is_subscribed': is_subscribed  # Add subscription status to response
#             }
#             logger.debug(f"Response data: {response_data}")
#             return JsonResponse(response_data)
#         else:
#             logger.warning("Authentication failed")
#             return JsonResponse({'error': 'Invalid credentials'}, status=400)
    
#     return JsonResponse({'error': 'Method not allowed'}, status=405)



from django.contrib.auth.models import User

@csrf_exempt
def login_page(request):
    logger.debug("Login view triggered")
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Check if username exists
        if not User.objects.filter(username=username).exists():
            logger.warning("Invalid username")
            return JsonResponse({'error': 'Invalid username'}, status=400)

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            logger.info(f"Authenticated user ID: {user.id}")
            refresh = RefreshToken.for_user(user)
            try:
                user_profile = UserProfile.objects.get(user=user)
                is_subscribed = user_profile.is_subscribed
                logger.debug(f"User subscription status: {is_subscribed}")
            except UserProfile.DoesNotExist:
                is_subscribed = False
                logger.warning(f"UserProfile not found for user ID: {user.id}")
            
            response_data = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user_id': user.id,
                'email': user.email,
                'is_subscribed': is_subscribed,
            }
            print(is_subscribed)

            logger.debug(f"Response data: {response_data}")
            return JsonResponse(response_data)
        else:
            logger.warning("Invalid password")
            return JsonResponse({'error': 'Invalid password'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate




@api_view(['POST'])
def logout_view(request):
    # JWT Token removal should be handled by client-side
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)




from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

@api_view(['POST'])
@permission_classes([AllowAny])
def register_page(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')

    if not all([first_name, last_name, email, username, password]):
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        validate_email(email)
    except ValidationError:
        return Response({"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name,
        email=email,
        is_subscribed=False
    )
    user.is_staff = True
    user.is_superuser = True
    user.save()

    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)



from django.core.mail import send_mail  # Import the send_mail function
from ..models import UserProfile
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def register_page(request):
#     first_name = request.data.get('first_name')
#     last_name = request.data.get('last_name')
#     email = request.data.get('email')
#     username = request.data.get('username')
#     password = request.data.get('password')

#     if not all([first_name, last_name, email, username, password]):
#         return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
    
#     try:
#         validate_email(email)
#     except ValidationError:
#         return Response({"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST)
    
#     if User.objects.filter(username=username).exists():
#         return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
#     if User.objects.filter(email=email).exists():
#         return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

#     user = User.objects.create_user(
#         username=username,
#         password=password,
#         first_name=first_name,
#         last_name=last_name,
#         email=email,

#     )
    
#     # Create UserProfile
#     UserProfile.objects.create(user=user, email=email,is_subscribed=False)
    
#     user.save()



# # Send confirmation email
#     subject = 'Welcome to Gen AI-Hub: Your Gateway to Advanced Chatbots'
#     message = f"""
#     Dear {first_name},

#     Welcome to Gen AI-Hub! 🎉 We are thrilled to have you on board.

#     Congratulations on successfully registering with us. As a valued member of our community, you now have access to a variety of cutting-edge chatbots designed to enhance your experience.

#     At Gen AI-Hub, we're committed to providing you with the best AI-driven solutions. To unlock even more advanced features and access our premium, fine-tuned chatbots, consider subscribing to our exclusive membership for just $15/month. This subscription will give you full access to the latest chatbots on our platform, ensuring you always stay ahead with the most innovative technology.

#     We are excited to support you on your AI journey. If you have any questions or need assistance, our support team is always here to help.

#     Thank you for choosing Gen AI-Hub.

#     Best regards,

#     The Gen AI-Hub Team
#     """

#     from_email = 'attareh542@gmail.com'  # Replace with your email
#     recipient_list = [email]

#     send_mail(subject, message, from_email, recipient_list, fail_silently=False)


#     return Response({"message": "User created successfully and email sent"}, status=status.HTTP_201_CREATED)
    # return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_page(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')

    if not all([first_name, last_name, email, username, password]):
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        validate_email(email)
    except ValidationError:
        return Response({"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name,
        email=email,
    )

    # Create UserProfile
    UserProfile.objects.create(user=user, email=email, is_subscribed=False)




    # Send confirmation email
    subject = 'Welcome to Gen AI-Hub: Your Gateway to Advanced Chatbots'
    message = f"""
    Dear {first_name},

    Welcome to Gen AI-Hub! 🎉 We are thrilled to have you on board.

    Congratulations on successfully registering with us. As a valued member of our community, you now have access to a variety of cutting-edge chatbots designed to enhance your experience.

    At Gen AI-Hub, we're committed to providing you with the best AI-driven solutions. To unlock even more advanced features and access our premium, fine-tuned chatbots, consider subscribing to our exclusive membership for just $15/month. This subscription will give you full access to the latest chatbots on our platform, ensuring you always stay ahead with the most innovative technology.

    We are excited to support you on your AI journey. If you have any questions or need assistance, our support team is always here to help.

    Thank you for choosing Gen AI-Hub.

    Best regards,

    The Gen AI-Hub Team
    """

    from_email = 'attareh542@gmail.com'  # Replace with your email
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)


    return Response({"message": "User created successfully and email sent"}, status=status.HTTP_201_CREATED)
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)






from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from django.core.cache import cache
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_password(request):
    email = request.data.get('email')
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Generate reset token and save in cache
    reset_token = get_random_string(32)
    cache.set(f"reset_token_{reset_token}", user.id, timeout=3600)  # Token expires in 1 hour

    # Send email
    reset_url = f"http://localhost:3000/reset-password/{reset_token}"  # Adjust the URL for production
    send_mail(
        "Password Reset Request",
        f"Click the link to reset your password: {reset_url}",
        "no-reply@example.com",
        [email],
        fail_silently=False,
    )

    return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    if not token or not new_password:
        return Response({"error": "Token and new password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user_id = cache.get(f"reset_token_{token}")
    if not user_id:
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=user_id)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
