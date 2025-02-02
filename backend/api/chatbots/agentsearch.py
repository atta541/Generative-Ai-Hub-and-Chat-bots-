import os
from decouple import config
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from tavily import TavilyClient

# Load API key from .env file
TAVILY_API_KEY = config('TAVILY_API_KEY')

# Initialize TavilyClient
tavily = TavilyClient(api_key=TAVILY_API_KEY)

# Function to fetch Tavily search response
def get_tavily_search_response(user_input: str):
    """Fetches response from Tavily Search API."""
    try:
        # Perform the search using TavilyClient
        response = tavily.search(query=user_input, search_depth="advanced")
        
        # Extract and format the results
        results = []
        for obj in response['results']:
            results.append({
                'url': obj['url'],
                'content': obj['content']
            })
        
        return results
    except Exception as e:
        print(f"Error in Tavily search: {e}")
        return f"Error fetching search results: {str(e)}"

# Django API View
class TavilySearchAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        if not user_input:
            return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            print(f"Getting Tavily search response... user_input: {user_input}") 
            bot_response = get_tavily_search_response(user_input) 
            # print(bot_response)

            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error occurred: {e}")
            return Response({'error': 'An error occurred while fetching the search results'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






