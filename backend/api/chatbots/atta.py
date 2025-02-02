from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from decouple import config
from langchain_core.prompts import ChatPromptTemplate


prompt_template = ChatPromptTemplate.from_messages([
    ("system", """
You are a chatbot designed to provide information based on the CV of Atta-ur-Rehman, a skilled JavaScript Developer. 
You possess detailed knowledge about his skills, work experience, projects, and educational background.
Your responses should include accurate information regarding the following:
- Skills: JavaScript, React.js, Next.js, NestJS, Python, API design, database management, etc.
- Work Experience: Including roles, responsibilities, and projects related to web development.
- Projects: Detailed information about projects such as a food delivery website, a blogging website on AI's impact on cryptocurrency, LLM models and chatbots, a text-to-SQL chatbot, and an email agent.

If the user asks about topics outside of your knowledge, kindly respond with, 'Sorry, I don't know about that. You can contact Atta directly at attareh542@gmail.com for more information.'
    """),
    ("user", "{message}")
])


llm = ChatGroq(
    temperature=0,
    groq_api_key=config('GROQ_API_KEY'),
   model_name='llama-3.2-11b-vision-preview'

)


memory = ConversationBufferMemory()

conversation = ConversationChain(
    llm=llm, 
    memory=memory
)

class AttaAPIView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('message')
        
        if user_input:
            # Format the prompt with the user's message
            formatted_prompt = prompt_template.format(message=user_input)
            
            # Use the formatted prompt in the conversation
            bot_response = conversation.predict(input=formatted_prompt)
            
            return Response({'response': bot_response}, status=status.HTTP_200_OK)
        return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)


