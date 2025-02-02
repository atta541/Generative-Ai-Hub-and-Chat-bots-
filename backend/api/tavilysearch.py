# import os
# from decouple import config
# from langchain_groq import ChatGroq
# from langchain_community.tools import TavilySearchResults
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.runnables import RunnableConfig, chain
# import datetime
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# # Load API keys from .env file
# GROQ_API_KEY = config('GROQ_API_KEY')
# TAVILY_API_KEY = config('TAVILY_API_KEY')

# # Initialize Groq LLM
# def initialize_groq_llm():
#     """Initialize the Groq LLM with the specified model."""
#     return ChatGroq(model="llama3-8b-8192", api_key=GROQ_API_KEY)

# # Initialize Tavily Search Tool
# def initialize_tavily_tool():
#     """Initialize the Tavily Search tool with advanced options."""
#     return TavilySearchResults(
#         max_results=5,
#         search_depth="advanced",
#         include_answer=True,
#         include_raw_content=True,
#         include_images=True,
#         api_key=TAVILY_API_KEY,
#     )

# # Define the prompt template
# def create_prompt_template():
#     """Create a prompt template with the current date."""
#     today = datetime.datetime.today().strftime("%D")
#     return ChatPromptTemplate(
#         [
#             ("system", f"You are a helpful assistant. The date today is {today}."),
#             ("human", "{user_input}"),
#             ("placeholder", "{messages}"),
#         ]
#     )

# # Bind tools to the LLM
# def bind_tools_to_llm(llm, tool):
#     """Bind the Tavily tool to the Groq LLM."""
#     return llm.bind_tools([tool])

# # Create the LLM chain
# def create_llm_chain(prompt, llm_with_tools):
#     """Create an LLM chain using the prompt and LLM with tools."""
#     return prompt | llm_with_tools

# # Define the tool chain
# @chain
# def tool_chain(user_input: str, config: RunnableConfig):
#     """Chain to handle user input, invoke the LLM, and process tool calls."""
#     try:
#         input_ = {"user_input": user_input}
#         ai_msg = llm_chain.invoke(input_, config=config)
        
#         # Check if the LLM response contains tool calls
#         if hasattr(ai_msg, 'tool_calls') and ai_msg.tool_calls:
#             tool_msgs = []
#             for tool_call in ai_msg.tool_calls:
#                 # Extract the query from the tool call arguments
#                 query = tool_call.get('args', {}).get('query', user_input)
#                 tool_result = tool.invoke({"query": query})  # Invoke Tavily search tool
#                 tool_msgs.append({"role": "tool", "content": tool_result})
            
#             # Invoke the LLM again with the tool results
#             return llm_chain.invoke({**input_, "messages": [ai_msg, *tool_msgs]}, config=config)
#         else:
#             # If no tool calls, return the LLM response directly
#             return ai_msg
#     except Exception as e:
#         print(f"Error in tool_chain: {e}")
#         raise

# # Initialize components (called once when the module is loaded)
# llm = initialize_groq_llm()
# tool = initialize_tavily_tool()
# prompt = create_prompt_template()
# llm_with_tools = bind_tools_to_llm(llm, tool)
# llm_chain = create_llm_chain(prompt, llm_with_tools)

# # Function to be called from Django views
# def get_tavily_search_response(user_input: str):
#     """
#     Function to get a response from the Tavily search tool and Groq LLM.
#     This function can be called from a Django view.
#     """
#     try:
#         result = tool_chain.invoke(user_input)
#         # Extract the response text from the result
#         if result and hasattr(result, 'content'):
#             return result.content  # Return only the response text
#         elif result and hasattr(result, 'response'):
#             return result.response  # Fallback for different response structures
#         return None
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return None

# # Django View
# class TavilySearchAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             try:
#                 # Get the response from Tavily search
#                 print("Getting Tavily search response... user_input:", user_input)
#                 bot_response = get_tavily_search_response(user_input)
#                 if bot_response:
#                     return Response({'response': bot_response}, status=status.HTTP_200_OK)
#                 else:
#                     return Response({'error': 'No response from Tavily search'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#             except Exception as e:
#                 print(f"Error occurred: {e}")
#                 return Response({'error': 'An error occurred while fetching the search results'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)





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

            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error occurred: {e}")
            return Response({'error': 'An error occurred while fetching the search results'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)










# import os
# from decouple import config
# from langchain_groq import ChatGroq
# from langchain_community.tools import TavilySearchResults
# from langchain_core.prompts import ChatPromptTemplate
# from langchain_core.runnables import RunnableConfig, chain
# import datetime
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# # Load API keys from .env file
# GROQ_API_KEY = config('GROQ_API_KEY')
# TAVILY_API_KEY = config('TAVILY_API_KEY')

# # Initialize Groq LLM
# def initialize_groq_llm():
#     """Initialize the Groq LLM with the specified model."""
#     print("Initializing Groq LLM with model 'llama3-8b-8192'...")
#     return ChatGroq(model="llama3-8b-8192", api_key=GROQ_API_KEY)

# # Initialize Tavily Search Tool
# def initialize_tavily_tool():
#     """Initialize the Tavily Search tool with advanced options."""
#     print("Initializing Tavily Search tool...")
#     return TavilySearchResults(
#         max_results=5,
#         search_depth="advanced",
#         include_answer=True,
#         include_raw_content=True,
#         include_images=True,
#         api_key=TAVILY_API_KEY,
#     )

# # Define the prompt template
# def create_prompt_template():
#     """Create a prompt template with the current date and instructions for tool usage."""
#     today = datetime.datetime.today().strftime("%D")
#     print(f"Creating prompt template with today's date: {today}")
#     return ChatPromptTemplate(
#         [
#             ("system", f"You are a helpful assistant. The date today is {today}. "
#                        "If the user asks for real-time or factual information (e.g., prices, news, or current events), "
#                        "use the Tavily search tool to provide accurate and up-to-date results."),
#             ("human", "{user_input}"),
#             ("placeholder", "{messages}"),
#         ]
#     )

# # Bind tools to the LLM
# def bind_tools_to_llm(llm, tool):
#     """Bind the Tavily tool to the Groq LLM and force tool usage."""
#     print("Binding Tavily tool to Groq LLM and forcing tool usage...")
#     return llm.bind_tools([tool], tool_choice={"type": "function", "function": {"name": tool.name}})

# # Create the LLM chain
# def create_llm_chain(prompt, llm_with_tools):
#     """Create an LLM chain using the prompt and LLM with tools."""
#     print("Creating LLM chain with prompt and bound tools...")
#     return prompt | llm_with_tools

# # Define the tool chain
# @chain
# def tool_chain(user_input: str, config: RunnableConfig):
#     """Chain to handle user input, invoke the LLM, and process tool calls."""
#     print(f"Received user input: {user_input}")
#     try:
#         input_ = {"user_input": user_input}
#         print("Invoking LLM chain with user input...")
#         ai_msg = llm_chain.invoke(input_, config=config)

#         # Debugging output
#         print(f"LLM response: {ai_msg}")
#         print(f"Tool calls detected: {hasattr(ai_msg, 'tool_calls') and ai_msg.tool_calls}")

#         # Check if the LLM response contains tool calls
#         if hasattr(ai_msg, 'tool_calls') and ai_msg.tool_calls:
#             print("LLM response contains tool calls. Processing them...")
#             tool_msgs = []
#             for tool_call in ai_msg.tool_calls:
#                 # Debugging output
#                 print(f"Tool call details: {tool_call}")
#                 print(f"Tool call ID: {tool_call.get('id')}")
#                 print(f"Tool call arguments: {tool_call.get('args')}")

#                 # Extract the query from the tool call arguments
#                 query = tool_call.get('args', {}).get('query', user_input)
#                 print(f"Invoking Tavily tool with query: {query}")
#                 tool_result = tool.invoke({"query": query})  # Invoke Tavily search tool

#                 # Debugging output
#                 print(f"Tavily tool result: {tool_result}")

#                 # Ensure the tool response is valid
#                 if tool_result:
#                     tool_msgs.append({
#                         "role": "tool",
#                         "content": tool_result,
#                         "tool_call_id": tool_call.get('id')  # Include the tool_call_id
#                     })
#                 else:
#                     print("Tavily tool returned no result. Skipping...")

#             # If no valid tool results, return the original LLM response
#             if not tool_msgs:
#                 print("No valid tool results. Returning original LLM response...")
#                 return ai_msg

#             # Invoke the LLM again with the tool results
#             print("Re-invoking LLM chain with tool results...")
#             return llm_chain.invoke({**input_, "messages": [ai_msg, *tool_msgs]}, config=config)
#         else:
#             # If no tool calls, return the LLM response directly
#             print("No tool calls in LLM response. Returning LLM response directly...")
#             return ai_msg
#     except Exception as e:
#         print(f"Error in tool_chain: {e}")
#         raise





    
# # Initialize components (called once when the module is loaded)
# print("Initializing components...")
# llm = initialize_groq_llm()
# tool = initialize_tavily_tool()
# prompt = create_prompt_template()
# llm_with_tools = bind_tools_to_llm(llm, tool)
# llm_chain = create_llm_chain(prompt, llm_with_tools)

# # Function to be called from Django views
# def get_tavily_search_response(user_input: str):
#     """
#     Function to get a response from the Tavily search tool and Groq LLM.
#     This function can be called from a Django view.
#     """
#     print(f"Fetching Tavily search response for user input: {user_input}")
#     try:
#         result = tool_chain.invoke(user_input)
#         # Extract the response text from the result
#         if result and hasattr(result, 'content'):
#             print("Response received from tool chain, returning content...")
#             return result.content  # Return only the response text
#         elif result and hasattr(result, 'response'):
#             print("Fallback: Response structure is different, returning response...")
#             return result.response  # Fallback for different response structures
#         print("No valid result received.")
#         return None
#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return None

# # Django View
# class TavilySearchAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
#         if user_input:
#             print(f"Received user input in view: {user_input}")
#             try:
#                 # Get the response from Tavily search
#                 print("Getting Tavily search response...")
#                 bot_response = get_tavily_search_response(user_input)
#                 if bot_response:
#                     print("Bot response received, sending response...")
#                     return Response({'response': bot_response}, status=status.HTTP_200_OK)
#                 else:
#                     print("No response from Tavily search, returning error...")
#                     return Response({'error': 'No response from Tavily search'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#             except Exception as e:
#                 print(f"Error occurred: {e}")
#                 return Response({'error': 'An error occurred while fetching the search results'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         print("No message provided in request, returning error...")
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)