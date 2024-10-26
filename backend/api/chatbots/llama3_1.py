


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_groq import ChatGroq
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain

# # Initialize the LLM and memory
# llm = ChatGroq(
#     temperature=0,
#     groq_api_key="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",  # Replace with a secure method of handling API keys
#    model_name='llama-3.1-70b-versatile'
# )
# memory = ConversationBufferMemory()

# # Initialize the ConversationChain
# conversation = ConversationChain(
#     llm=llm, 
#     # verbose=True, 
#     memory=memory
# )


# class Llama3_1APIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             bot_response = conversation.predict(input=user_input)
#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)




from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from django.contrib.auth.models import User
from decouple import config

from ..models import Conversation, Chatbot  # Ensure correct import path

# Initialize the LLM and memory
llm = ChatGroq(
    temperature=0,
    groq_api_key=config('GROQ_API_KEY'),
#    model_name='llama-3.1-70b-versatile'
model_name='llama-3.2-11b-vision-preview'
)
memory = ConversationBufferMemory()

# Initialize the ConversationChain
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

class Llama3_1APIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # Use the logged-in user
            user = request.user

            # Get or create a chatbot instance
            chatbot, created = Chatbot.objects.get_or_create(name='llama3.1')

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
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
