


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from together import Together
from decouple import config
from ..models import Conversation, Chatbot

# Initialize the Together client
client = Together(api_key=config('TOGETHER_API_KEY'))

class LlamaVisionFreeAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            # Ensure the user is authenticated
            if not request.user or not request.user.is_authenticated:
                return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # Use the logged-in user
            user = request.user

            # Get or create a chatbot instance for Llama-Vision
            chatbot, created = Chatbot.objects.get_or_create(name='Llama-Vision')

            try:
                # Get the response from the Llama-Vision model using the Together API
                response = client.chat.completions.create(
                    model="meta-llama/Llama-Vision-Free",
                    messages=[{"role": "user", "content": user_input}],
                    max_tokens=None,
                    temperature=0.7,
                    top_p=0.7,
                    top_k=50,
                    repetition_penalty=1,
                    stop=["<|eot_id|>", "<|eom_id|>"],
                    stream=True
                )

                # Initialize a variable to store the bot's response
                bot_response = ""

                # Stream the response and build the complete message
                for token in response:
                    # Debugging: Check the response format
                    print("Token received:", token)

                    # Check if the token has 'choices' and if 'delta' exists
                    if hasattr(token, 'choices') and token.choices:
                        delta = token.choices[0].delta  # Access delta directly
                        if delta and hasattr(delta, 'content') and delta.content:
                            bot_response += delta.content  # Append content to the response
                            # Debugging: Check the bot response part
                            print("Bot response part:", delta.content)

                # Debugging: Ensure bot_response is not empty
                print("Final bot response:", bot_response)

                # Save the conversation in the database
                Conversation.objects.create(
                    user=user,
                    chatbot=chatbot,
                    user_message=user_input,
                    bot_response=bot_response
                )

                # Return the response
                if bot_response:
                    return Response({'response': bot_response}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'No response from bot'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            except Exception as e:
                # Handle exceptions during the API call
                print(f"Error occurred: {e}")
                return Response({'error': 'An error occurred while fetching the bot response'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)


