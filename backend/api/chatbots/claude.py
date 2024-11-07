


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
from langchain_anthropic import ChatAnthropic
from decouple import config
# from langchain_together import ChatTogether 
import os
# Initialize logging
logger = logging.getLogger(__name__)

# Initialize LLM and memory
llm = ChatAnthropic(
    temperature=0,
    api_key=config('Anthropic_claude'),

    model_name="claude-3-5-sonnet-20240620"
)





memory = ConversationBufferMemory()
conversation = ConversationChain(llm=llm, memory=memory)

class ClaudeAPIView(APIView):
    
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        logger.info(f'Received message: {user_input}')

        if not user_input:
            logger.warning('No message provided')
            return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)

        if not request.user or not request.user.is_authenticated:
            logger.warning('User is not authenticated')
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user

        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            logger.warning('User profile not found')
            return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)

        if not user_profile.is_subscribed:
            logger.warning('User is not subscribed')
            return Response({'error': 'You need to subscribe to access this chatbot'}, status=status.HTTP_403_FORBIDDEN)

        chatbot, created = Chatbot.objects.get_or_create(name='Claude')
        bot_response = conversation.predict(input=user_input)

        Conversation.objects.create(
            user=user, 
            chatbot=chatbot,
            user_message=user_input,
            bot_response=bot_response
        )

        logger.info(f'Bot response: {bot_response}')
        return Response({'response': bot_response}, status=status.HTTP_200_OK)
