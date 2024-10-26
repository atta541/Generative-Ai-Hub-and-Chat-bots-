
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from ..models import Conversation, Chatbot

def get_user_conversations(request, user_id):
    # Fetch the user based on user_id
    user = get_object_or_404(User, pk=user_id)
    
    # Fetch the chatbot instance where name is 'atta'
    chatbot = get_object_or_404(Chatbot, name='atta')

    # Query the Conversation model
    conversations = Conversation.objects.filter(user=user, chatbot=chatbot).order_by('-created_at')
    # Serialize the data
    conversations_data = [
        {
            'user_message': convo.user_message,
            'bot_response': convo.bot_response,
            'created_at': convo.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        for convo in conversations
    ]
    
    # Return the data as JSON
    return JsonResponse({'conversations': conversations_data})