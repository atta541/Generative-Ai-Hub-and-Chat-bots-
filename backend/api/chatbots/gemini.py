# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_google_vertexai import ChatVertexAI
# from langchain_core.messages import HumanMessage
# from django.contrib.auth.models import User
# from decouple import config
# from ..models import Conversation, Chatbot  
# from google.cloud import aiplatform

# # Initialize the LLM
# # llm = ChatVertexAI(model="gemini-pro-vision")
# llm = ChatVertexAI(model="gemini-pro-vision", api_key=config('GOOGLE_API_KEY'))


# class GeminiAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         image_url = request.data.get('image_url')  # Expecting an image URL if provided

#         if not request.user or not request.user.is_authenticated:
#             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#         user = request.user

#         # Prepare input for the Gemini model
#         messages = []
#         if user_input:
#             text_message = {
#                 "type": "text",
#                 "text": user_input,
#             }
#             messages.append(text_message)

#         if image_url:
#             image_message = {
#                 "type": "image_url",
#                 "image_url": {"url": image_url},
#             }
#             messages.append(image_message)

#         if not messages:
#             return Response({'error': 'No valid input provided'}, status=status.HTTP_400_BAD_REQUEST)

#         message = HumanMessage(content=messages)

#         # Invoke the model
#         try:
#             output = llm.invoke([message])
#             bot_response = output.content

#             # Get or create a chatbot instance
#             chatbot, created = Chatbot.objects.get_or_create(name='gemini')

#             # Store the conversation
#             Conversation.objects.create(
#                 user=user,
#                 chatbot=chatbot,
#                 user_message=user_input,
#                 bot_response=bot_response
#             )

#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_google_vertexai import ChatVertexAI
# from langchain_core.messages import HumanMessage
# from google.cloud import aiplatform
# from decouple import config
# from ..models import Conversation, Chatbot

# # Initialize Vertex AI
# aiplatform.init(
#     project=config('GCP_PROJECT_ID'),
#     location=config('GCP_LOCATION')
# )

# # Initialize the LLM
# llm = ChatVertexAI(model="gemini-pro-vision", api_key=config('GOOGLE_API_KEY'))


# class GeminiAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         image_url = request.data.get('image_url')  # Expecting an image URL if provided

#         if not request.user or not request.user.is_authenticated:
#             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#         user = request.user

#         # Prepare input for the Gemini model
#         messages = []
#         if user_input:
#             text_message = {"type": "text", "text": user_input}
#             messages.append(text_message)

#         if image_url:
#             image_message = {"type": "image_url", "image_url": {"url": image_url}}
#             messages.append(image_message)

#         if not messages:
#             return Response({'error': 'No valid input provided'}, status=status.HTTP_400_BAD_REQUEST)

#         message = HumanMessage(content=messages)

#         # Invoke the model
#         try:
#             output = llm.invoke([message])
#             bot_response = output.content

#             # Get or create a chatbot instance
#             chatbot, created = Chatbot.objects.get_or_create(name='gemini')

#             # Store the conversation
#             Conversation.objects.create(
#                 user=user,
#                 chatbot=chatbot,
#                 user_message=user_input,
#                 bot_response=bot_response
#             )

#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)







