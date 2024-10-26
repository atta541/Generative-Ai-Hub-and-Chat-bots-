from backend.api.chatbots.gemma import llm


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class gemma(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if user_input:
            bot_response = llm.invoke(user_input)
            return Response({'response': bot_response.content}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)