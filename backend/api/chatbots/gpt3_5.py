#https://python.langchain.com/v0.2/docs/how_to/llm_caching/










#  from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_groq import ChatGroq
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain
# from django.contrib.auth.models import User
# from ..models import Conversation, Chatbot
# from decouple import config
#   # Ensure correct import path

# # Initialize the LLM and memory
# from langchain_openai import ChatOpenAI

# llm = ChatOpenAI(
#     model="gpt-3.5-turbo",
#     temperature=0,
#     # max_tokens=None,
#     # timeout=None,
#     # max_retries=2,
#     # api_key=config('openai_api_key'),


  
# )
# memory = ConversationBufferMemory()

# # Initialize the ConversationChain
# conversation = ConversationChain(
#     llm=llm,
#     memory=memory
# )

# class Gpt3_5APIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             # Ensure the user is authenticated
#             if not request.user or not request.user.is_authenticated:
#                 return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#             # Use the logged-in user
#             user = request.user

#             # Get or create a chatbot instance
#             chatbot, created = Chatbot.objects.get_or_create(name='gpt-3.5')

#             # Get the bot response
#             bot_response = conversation.predict(input=user_input)

#             # Create a new Conversation instance
#             Conversation.objects.create(
#                 user=user,  # Automatically associate with the logged-in user
#                 chatbot=chatbot,
#                 user_message=user_input,
#                 bot_response=bot_response
#             )

#             return Response({'responsee': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)






import logging
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Chatbot, Conversation, UserProfile
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain_groq import ChatGroq
from decouple import config

# Initialize logging
logger = logging.getLogger(__name__)

# Initialize the LLM and memory
llm = ChatGroq(
    temperature=0,
    groq_api_key=config('GROQ_API_KEY'),
    model_name='llama-3.1-70b-versatile'
)
memory = ConversationBufferMemory()

# Initialize the ConversationChain
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

class Gpt3_5APIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
            
            user = request.user

            # Get or create a user profile
            try:
                user_profile = UserProfile.objects.get(user=user)
            except UserProfile.DoesNotExist:
                logger.warning('User profile not found')
                return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

            if not user_profile.is_subscribed:
                logger.warning('User is not subscribed')
                return Response({'error': 'You need to subscribe to access this chatbot'}, status=status.HTTP_403_FORBIDDEN)

            # Get or create a chatbot instance
            chatbot, created = Chatbot.objects.get_or_create(name='llama3.1')

            try:
                # Get the bot response
                bot_response = conversation.predict(input=user_input)
                
                # Create a new Conversation instance
                Conversation.objects.create(
                    user=user,  # Automatically associate with the logged-in user
                    chatbot=chatbot,
                    user_message=user_input,
                    bot_response=bot_response
                )
                
                return Response({'response': bot_response}, status=status.HTTP_200_OK)
            
            except Exception as e:
                logger.error(f"Error with external service: {e}")
                return Response({'error': 'The chatbot service is currently unavailable. Please try again later.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
