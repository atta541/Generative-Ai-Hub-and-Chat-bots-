from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from django.contrib.auth.models import User
from decouple import config
from ..models import Conversation, Chatbot  


# Initialize the LLM and memory
llm = ChatGroq(
    temperature=0,
    groq_api_key=config('GROQ_API_KEY'),
    model_name="llama3-70b-8192"
)
memory = ConversationBufferMemory()

# Initialize the ConversationChain
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

class Llama3APIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # Use the logged-in user
            user = request.user

            # Get or create a chatbot instance
            chatbot, created = Chatbot.objects.get_or_create(name='llama3')

            # Get the bot response
            bot_response = conversation.predict(input=user_input)

            # Create a new Conversation instance
            Conversation.objects.create(
                user=user,  
                chatbot=chatbot,
                user_message=user_input,
                bot_response=bot_response
            )

            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
    








    

# from langchain import HuggingFaceEndpoint, ConversationChain, ConversationBufferMemory
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth.models import User
# from decouple import config
# from ..models import Conversation, Chatbot

# # Initialize the HuggingFaceEndpoint
# from django.conf import settings
# from langchain import HuggingFaceEndpoint

# from langchain import HuggingFaceEndpoint

# llm = HuggingFaceEndpoint(
#     repo_id="atta123/UOL-testing",
#     task="text-generation",
#     max_new_tokens=512,
#     do_sample=False,
#     repetition_penalty=1.03,
#     huggingfacehub_api_token="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"  # Hardcoded token
# )



# # Initialize memory
# memory = ConversationBufferMemory()

# # Initialize the ConversationChain
# conversation = ConversationChain(
#     llm=llm,
#     memory=memory
# )

# class Llama3APIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             if not request.user.is_authenticated:
#                 return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#             user = request.user
#             chatbot, created = Chatbot.objects.get_or_create(name='llama3')
#             bot_response = conversation.predict(input=user_input)

#             Conversation.objects.create(
#                 user=user,
#                 chatbot=chatbot,
#                 user_message=user_input,
#                 bot_response=bot_response
#             )

#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)







# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth.models import User
# from transformers import AutoModelForCausalLM, AutoTokenizer
# from ..models import Conversation, Chatbot  # Ensure correct import path

# # Load the model and tokenizer
# model_name = "atta123/UOL-testing"  # Use the same model repository name

# model = AutoModelForCausalLM.from_pretrained(model_name)
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# def generate_response(prompt):
#     inputs = tokenizer(prompt, return_tensors="pt")
#     outputs = model.generate(**inputs, max_new_tokens=150)
#     response = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     return response

# class Llama3APIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             # Ensure the user is authenticated
#             if not request.user or not request.user.is_authenticated:
#                 return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#             # Use the logged-in user
#             user = request.user

#             # Get or create a chatbot instance
#             chatbot, created = Chatbot.objects.get_or_create(name='llama3')

#             # Get the bot response
#             bot_response = generate_response(user_input)

#             # Create a new Conversation instance
#             Conversation.objects.create(
#                 user=user,  # Automatically associate with the logged-in user
#                 chatbot=chatbot,
#                 user_message=user_input,
#                 bot_response=bot_response
#             )

#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
