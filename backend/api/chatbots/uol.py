from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from transformers import T5ForConditionalGeneration, T5Tokenizer

import os
from ..models import Conversation, Chatbot  # Ensure correct import path

# Load the fine-tuned T5 model and tokenizer
model_path = "D:/T5-uol/T5_finetuned_model"
tokenizer_path = "D:/T5-uol/T5_finetuned_tokenizer"
model = T5ForConditionalGeneration.from_pretrained(model_path, local_files_only=True)
tokenizer = T5Tokenizer.from_pretrained(tokenizer_path, local_files_only=True)

# T5 answer generation function
def generate_t5_answer(question):
    inputs = "Please answer this question: " + question
    encoded_inputs = tokenizer(question, return_tensors="pt")
    outputs = model.generate(**encoded_inputs, max_length=1024)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return answer

class UolAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')

        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # Use the logged-in user
            user = request.user

            # Get or create a chatbot instance (named 'gemma')
            chatbot, created = Chatbot.objects.get_or_create(name='gemma')

            # Generate a response using the fine-tuned T5 model
            bot_response = generate_t5_answer(user_input)

            # Save the conversation to the database
            Conversation.objects.create(
                user=user,  # Automatically associate with the logged-in user
                chatbot=chatbot,
                user_message=user_input,
                bot_response=bot_response
            )

            # Return the response to the frontend
            return Response({'response': bot_response}, status=status.HTTP_200_OK)

        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)




