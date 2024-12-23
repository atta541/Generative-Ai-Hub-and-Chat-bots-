# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain_groq import ChatGroq
# from langchain.chains.conversation.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain
# from decouple import config
# from langchain_core.prompts import ChatPromptTemplate


# prompt_template = ChatPromptTemplate.from_messages([
#     ("system", """
# You are a chatbot designed to provide information based on the CV of Atta-ur-Rehman, a skilled JavaScript Developer. 
# You possess detailed knowledge about his skills, work experience, projects, and educational background.
# Your responses should include accurate information regarding the following:
# - Skills: JavaScript, React.js, Next.js, NestJS, Python, API design, database management, etc.
# - Work Experience: Including roles, responsibilities, and projects related to web development.
# - Projects: Detailed information about projects such as a food delivery website, a blogging website on AI's impact on cryptocurrency, LLM models and chatbots, a text-to-SQL chatbot, and an email agent.

# If the user asks about topics outside of your knowledge, kindly respond with, 'Sorry, I don't know about that. You can contact Atta directly at attareh542@gmail.com for more information.'
#     """),
#     ("user", "{message}")
# ])


# llm = ChatGroq(
#     temperature=0,
#     groq_api_key=config('GROQ_API_KEY'),
#    model_name='llama-3.1-70b-versatile'
#     # model_name="gemma-7b-it"

# )


# memory = ConversationBufferMemory()

# conversation = ConversationChain(
#     llm=llm, 
#     memory=memory
# )

# class AttaAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         user_input = request.data.get('message')
        
#         if user_input:
#             # Format the prompt with the user's message
#             formatted_prompt = prompt_template.format(message=user_input)
            
#             # Use the formatted prompt in the conversation
#             bot_response = conversation.predict(input=formatted_prompt)
            
#             return Response({'response': bot_response}, status=status.HTTP_200_OK)
#         return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)



import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from decouple import config
from langchain_core.prompts import ChatPromptTemplate
from tavily import TavilyClient

# Step 1: Set up logging to show debug messages
logging.basicConfig(level=logging.DEBUG)

# Step 2: Initialize Tavily Client with your API key
tavily_api_key = "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"
tavily_client = TavilyClient(api_key=tavily_api_key)

# Step 3: Define the prompt template for a researcher
prompt_template = ChatPromptTemplate.from_messages([
    ("system", """
You are a researcher specialized in climate change, its impacts, and solutions. 
Your task is to provide evidence-based, well-researched, and objective information about climate change. 
You should use scientific data, research papers, and reliable sources to answer user queries.

Your responses should include accurate information about the following:
- Causes of climate change (e.g., greenhouse gases, deforestation, etc.)
- Effects on ecosystems, weather patterns, and human populations
- Potential solutions (e.g., renewable energy, carbon capture, climate policies)

If the user asks about topics outside of your knowledge, kindly respond with, 'Sorry, I don't know about that. You can find more information through reputable sources like NASA or IPCC websites.'
    """),
    ("user", "{message}")
])

# Step 4: Initialize ChatGroq model (the existing LLM model)
llm = ChatGroq(
    temperature=0,
    groq_api_key=config('GROQ_API_KEY'),
    model_name='llama-3.1-70b-versatile'
    # model_name="llama3-70b-8192	"  # Uncomment if you want to switch the model
)

# Initialize conversation memory and chain
memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

# Step 5: Define the APIView for handling messages
class AttaAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        
        if user_input:
            # Fetch relevant content using Tavily (with verbose=True)
            content = tavily_client.search(user_input, search_depth="advanced", verbose=True)["results"]
            
            # Format the prompt with the fetched content and user's message
            formatted_prompt = prompt_template.format(message=user_input)
            
            # Use the formatted prompt in the conversation
            bot_response = conversation.predict(input=formatted_prompt)
            
            # Send the response back to the user
            return Response({'response': bot_response, 'content': content}, status=status.HTTP_200_OK)
        
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
