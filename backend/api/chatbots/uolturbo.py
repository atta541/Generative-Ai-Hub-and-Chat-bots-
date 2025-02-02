

from openai import OpenAI
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from django.contrib.auth.models import User
from ..models import Conversation, Chatbot
from decouple import config
import logging

# Initialize logging
logger = logging.getLogger(__name__)

# Initialize the fine-tuned LLM and memory  ft:gpt-3.5-turbo-0125:personal::Aulzb1Wu
try:
    llm = ChatOpenAI(
        # model="ft:gpt-3.5-turbo-0125:personal::AkqxHU1Z:ckpt-step-390",  # Use your fine-tuned model
        model="ft:gpt-3.5-turbo-0125:personal::AunnLw3E",  # Use your fine-tuned model

        # model="ft:gpt-3.5-turbo-0125:personal::AulzbUTZ:ckpt-step-1325",  # Use your fine-tuned model


        temperature=1,
        max_tokens=2048,  # Update based on your model's settings
        timeout=None,
        max_retries=2,
        api_key=config('OPENAI_API_KEY')  # Use config for security
    )
    memory = ConversationBufferMemory()
    conversation = ConversationChain(llm=llm, memory=memory)
except Exception as e:
    logger.error(f"Error initializing fine-tuned LLM: {e}")
    llm = None

class UolturboAPIView(APIView):
    def post(self, request, *args, **kwargs):
        if not llm:
            return Response({'error': 'Chatbot is not properly initialized'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        user_input = request.data.get('message')
        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
            
            user = request.user

            # Get or create a chatbot instance
            chatbot, created = Chatbot.objects.get_or_create(name='uolturbo')

            try:
                # Get the bot response using the fine-tuned model
                bot_response = conversation.predict(input=user_input)

                # Create a new Conversation instance
                Conversation.objects.create(
                    user=user,
                    chatbot=chatbot,
                    user_message=user_input,
                    bot_response=bot_response
                )

                return Response({'response': bot_response}, status=status.HTTP_200_OK)
            
            except Exception as e:
                logger.error(f"Error during LLM prediction: {e}")
                return Response({'error': 'Chatbot service error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
