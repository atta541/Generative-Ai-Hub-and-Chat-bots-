# from tavily import Tavily
from tavily import TavilyClient

from langchain_groq import ChatGroq  # Assuming ChatGroq is imported from another module
from decouple import config

# Your Tavily API Key
tavily_api_key = "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"
from tavily import TavilyClient

# Step 1. Instantiating your TavilyClient
tavily_client = TavilyClient(api_key=tavily_api_key)

# Step 2. Executing a simple search query
# response = tavily_client.search("most polluted city of today", search_depth="advanced")
# context = tavily_client.get_search_context(query="", search_depth="advanced")
answer = tavily_client.qna_search(query="What is the current price of tesla stock", search_depth="advanced")



# Step 3. That's it! You've done a Tavily Search!
# print(response)
# print(context)
print(answer)