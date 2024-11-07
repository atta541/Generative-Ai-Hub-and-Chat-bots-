# from langchain_together import ChatTogether

# # Initialize the model
# llm = ChatTogether(
#     model="meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
#     temperature=0,
#     max_tokens=None,
#     timeout=None,
#     max_retries=2,
#     api_key="48439648271be9f83769e2e217afeed91fdf07b9d6b2ea1c773d8f2d0aa91e4d",  # Make sure your API key is correct
# )

# # Define the messages
# messages = [
#     ("system", "You are a helpful assistant, give the answers to the questions."),
#     ("human", "hello what is compiler."),
# ]

# # Invoke the model and print the response
# try:
#     response = llm.invoke(messages)
#     print("Response:", response)  # Print the result
# except Exception as e:
#     print(f"Error during invocation: {e}")





# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_together import ChatTogether
# from django.contrib.auth.models import User
# from decouple import config

# from ..models import Conversation, Chatbot  # Ensure correct import path

# # Initialize the model
# llm = ChatTogether(
#     model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
#     temperature=0,
#     max_tokens=None,
#     timeout=None,
#     max_retries=2,
#     api_key=config('TOGETHER_API_KEY'),  # Store your API key securely in .env or settings
# )

# # Define the API view for interacting with the chatbot
# class Llama32_11bVisionAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')  # Get the message from the user input
#         if user_input:
#             # Ensure the user is authenticated
#             if not request.user or not request.user.is_authenticated:
#                 return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#             # Use the logged-in user
#             user = request.user

#             # Get or create a chatbot instance (you can associate this with a specific chatbot)
#             chatbot, created = Chatbot.objects.get_or_create(name='meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo')

#             # Define the system message and human message
#             messages = [
#                 # ("system", "You are a helpful assistant, give the answers to the questions."),
#              ("system", "You are a helpful assistant, you just answer the question in yes or no."),

#                 ("human", user_input),
#             ]
            
#             try:
#                 # Call the model's invoke method to get the bot response
#                 bot_response = llm.invoke(messages)
#                 # Create a new Conversation instance to store the conversation
#                 Conversation.objects.create(
#                     user=user,  # Associate the conversation with the logged-in user
#                     chatbot=chatbot,
#                     user_message=user_input,
#                     bot_response=bot_response,
#                 )
#                 return Response({'response': bot_response}, status=status.HTTP_200_OK)
            
#             except Exception as e:
#                 return Response({'error': f'Error during invocation: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_together import ChatTogether
from django.contrib.auth.models import User
from decouple import config
import base64
from ..models import Conversation, Chatbot  # Ensure correct import path

# Initialize the model
llm = ChatTogether(
    model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=config('TOGETHER_API_KEY'),  # Store your API key securely in .env or settings
)

class Llama32_11bVisionAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')  # Get the message from the user input
        if user_input:
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            user = request.user
            chatbot, created = Chatbot.objects.get_or_create(name='meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo')

            # Define the system message and human message
            messages = [
                ("system", "You are a helpful assistant, you can answer any questions. if user asks for the picture give him the picture"),
                ("human", user_input),
            ]
            
            try:
                # Call the model's invoke method to get the bot response
                bot_response = llm.invoke(messages)

                # Assuming the model might return image data or image URL
                content = None
                image_data = None

                # Process the response to check for image data
                for item in bot_response:
                    if item[0] == "content":
                        content = item[1]
                    elif item[0] == "image":  # Assuming 'image' key is in the response
                        image_data = item[1]

                if content is None and image_data is None:
                    return Response({'error': 'No content or image in response'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Debugging: Log the image data
                print("Image Data: ", image_data)  # This will print the image data or URL in the console

                # Store the conversation
                Conversation.objects.create(
                    user=user,  # Associate the conversation with the logged-in user
                    chatbot=chatbot,
                    user_message=user_input,
                    bot_response=content or image_data,  # Save either text or image
                )

                # Return the appropriate response (either text or image)
                if image_data:
                    return Response({'image': image_data}, status=status.HTTP_200_OK)
                else:
                    return Response({'response': content}, status=status.HTTP_200_OK)
            
            except Exception as e:
                return Response({'error': f'Error during invocation: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
