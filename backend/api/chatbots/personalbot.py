

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from decouple import config
from langchain_core.prompts import ChatPromptTemplate

llm = ChatGroq(
    temperature=0,
    groq_api_key=config('GROQ_API_KEY'),
    model_name='llama-3.2-11b-vision-preview'
)

memory = ConversationBufferMemory()

# Initialize the ConversationChain
conversation = ConversationChain(
    llm=llm, 
    memory=memory
)

class PersonalBotAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        prompt_instructions = request.data.get('prompt_instructions', '')

        if user_input:
            # Create a new prompt template based on user instructions
            prompt_template = ChatPromptTemplate.from_messages([
                ("system", prompt_instructions),
                ("user", "{message}")
            ])
            
            # Format the prompt with the user's message
            formatted_prompt = prompt_template.format(message=user_input)
            
            # Use the formatted prompt in the conversation
            bot_response = conversation.predict(input=formatted_prompt)
            
            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
