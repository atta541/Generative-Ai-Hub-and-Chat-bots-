


   
# # from rest_framework import status
# # from rest_framework.response import Response
# # from rest_framework.views import APIView

# # from ..serializers import UploadedPDFSerializer 





# # class PdfAPIView(APIView):
# #     def post(self, request, *args, **kwargs):
# #         if 'pdf' not in request.FILES:
# #             return Response({'error': 'No PDF file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

# #         pdf_file = request.FILES['pdf']
# #         serializer = UploadedPDFSerializer(data={'file': pdf_file})

# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response({'message': 'PDF uploaded and saved successfully.'}, status=status.HTTP_201_CREATED)
# #         else:
# #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# # myapp/views.py
# # views.py

# # from rest_framework import status
# # from rest_framework.response import Response
# # from rest_framework.views import APIView

# # from ..serializers import UploadedPDFSerializer 
# # pdf.py




# # from django.shortcuts import get_object_or_404
# # from ..models import UploadedPDF
# # from PyPDF2 import PdfReader
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status
# # from langchain_groq import ChatGroq
# # from langchain.text_splitter import RecursiveCharacterTextSplitter
# # from langchain_community.vectorstores import FAISS
# # from langchain.chains import RetrievalQA
# # from langchain.chains.conversation.memory import ConversationBufferMemory
# # from langchain.chains import ConversationChain
# # # pdf.py

# # from django.shortcuts import get_object_or_404
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status
# # from PyPDF2 import PdfReader
# # from langchain_groq import ChatGroq
# # from langchain.text_splitter import RecursiveCharacterTextSplitter
# # from langchain_community.vectorstores import FAISS

# # # Groq API Key
# # GROQ_API_KEY = "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"

# # # Initialize Groq LLM
# # llm = ChatGroq(
# #     groq_api_key=GROQ_API_KEY,
# #     model_name="Llama3-8b-8192"
# # )

# # def extract_pdf_text(pdf_id):
# #     # Fetch the PDF record from the database
# #     pdf_record = get_object_or_404(UploadedPDF, id=pdf_id)

# #     # Open and read the PDF file
# #     pdf_path = pdf_record.file.path
# #     pdf_reader = PdfReader(pdf_path)
# #     text = ""
    
# #     for page in pdf_reader.pages:
# #         text += page.extract_text() or ""  # Handle cases where extract_text might return None
    
# #     return text

# # def process_pdf_text(pdf_text):
# #     # Split text into chunks
# #     text_splitter = RecursiveCharacterTextSplitter(
# #         chunk_size=1000,  # Set chunk size
# #         chunk_overlap=200,  # Set overlap size
# #         length_function=len
# #     )
# #     text_chunks = text_splitter.split_text(pdf_text)

# #     # Create vector store
# #     vectorstore = FAISS.from_texts(texts=text_chunks)
# #     return vectorstore

# # class PdfAPIView(APIView):
# #     def post(self, request, *args, **kwargs):
# #         # Handle PDF file upload
# #         pdf_file = request.FILES.get('pdf')
# #         if not pdf_file:
# #             return Response({'error': 'No PDF file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
# #         uploaded_pdf = UploadedPDF(file=pdf_file)
# #         uploaded_pdf.save()
# #         return Response({'pdf_id': uploaded_pdf.id}, status=status.HTTP_201_CREATED)

# # class PdfChat(APIView):
# #     def get(self, request, *args, **kwargs):
# #         pdf_id = request.query_params.get('pdf_id')
# #         question = request.query_params.get('question')
        
# #         if not pdf_id:
# #             return Response({'error': 'No PDF ID provided'}, status=status.HTTP_400_BAD_REQUEST)

# #         if not question:
# #             return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

# #         try:
# #             pdf_text = extract_pdf_text(pdf_id)
# #             vectorstore = process_pdf_text(pdf_text)
# #             retriever = vectorstore.as_retriever()

# #             # Use the retrieval-based QA chain
# #             retriever_qa_chain = RetrievalQA(
# #                 retriever=retriever,
# #                 llm=llm
# #             )

# #             response = retriever_qa_chain.predict(question)
# #             return Response({'response': response}, status=status.HTTP_200_OK)
# #         except Exception as e:
# #             # Log the error message for debugging purposes
# #             print(f"Error processing PDF chat: {e}")
# #             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# # from django.shortcuts import get_object_or_404
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status
# # from PyPDF2 import PdfReader
# # from langchain_groq import ChatGroq
# # from langchain.text_splitter import RecursiveCharacterTextSplitter
# # from langchain_community.vectorstores import FAISS
# # from langchain.chains import RetrievalQA


# # from django.shortcuts import get_object_or_404
# # from ..models import UploadedPDF
# # from PyPDF2 import PdfReader
# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status
# # from langchain_groq import ChatGroq
# # from langchain.text_splitter import RecursiveCharacterTextSplitter
# # from langchain_community.vectorstores import FAISS
# # from langchain.chains import RetrievalQA
# # from langchain.chains.conversation.memory import ConversationBufferMemory
# # from langchain.chains import ConversationChain

# # # Groq API Key
# # GROQ_API_KEY = "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"

# # # Initialize Groq LLM
# # llm = ChatGroq(
# #     groq_api_key=GROQ_API_KEY,
# #     model_name="Llama3-8b-8192"
# # )

# # def extract_pdf_text(pdf_id):
# #     # Fetch the PDF record from the database
# #     pdf_record = get_object_or_404(UploadedPDF, id=pdf_id)

# #     # Open and read the PDF file
# #     pdf_path = pdf_record.file.path
# #     pdf_reader = PdfReader(pdf_path)
# #     text = ""
    
# #     for page in pdf_reader.pages:
# #         text += page.extract_text() or ""  # Handle cases where extract_text might return None
    
# #     return text

# # def process_pdf_text(pdf_text):
# #     # Split text into chunks
# #     text_splitter = RecursiveCharacterTextSplitter(
# #         chunk_size=1000,  # Set chunk size
# #         chunk_overlap=200,  # Set overlap size
# #         length_function=len
# #     )
# #     text_chunks = text_splitter.split_text(pdf_text)

# #     # Create vector store
# #     vectorstore = FAISS.from_texts(texts=text_chunks)
# #     return vectorstore

# # import logging
# # logger = logging.getLogger(__name__)

# # class PdfAPIView(APIView):
# #     def post(self, request, *args, **kwargs):
# #         logger.info(f"Authenticated user ID: {request.user.id if request.user.is_authenticated else 'Anonymous'}")
# #         if not request.user.is_authenticated:
# #             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
# #         # Handle PDF file upload
# #         pdf_file = request.FILES.get('pdf')
# #         if not pdf_file:
# #             return Response({'error': 'No PDF file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
# #         uploaded_pdf = UploadedPDF(file=pdf_file)
# #         uploaded_pdf.save()
# #         return Response({'pdf_id': uploaded_pdf.id}, status=status.HTTP_201_CREATED)



# # class PdfChat(APIView):
# #     def get(self, request, *args, **kwargs):
# #         if not request.user or not request.user.is_authenticated:
# #             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
# #         pdf_id = request.query_params.get('pdf_id')
# #         question = request.query_params.get('question')
        
# #         if not pdf_id:
# #             return Response({'error': 'No PDF ID provided'}, status=status.HTTP_400_BAD_REQUEST)

# #         if not question:
# #             return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

# #         try:
# #             pdf_text = extract_pdf_text(pdf_id)
# #             vectorstore = process_pdf_text(pdf_text)
# #             retriever = vectorstore.as_retriever()

# #             retriever_qa_chain = RetrievalQA(
# #                 retriever=retriever,
# #                 llm=llm
# #             )

# #             response = retriever_qa_chain.predict(question)
# #             return Response({'response': response}, status=status.HTTP_200_OK)
# #         except Exception as e:
# #             logger.error(f"Error processing PDF chat: {e}")
# #             return Response({'error': 'Internal server error. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)










# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from PyPDF2 import PdfReader
# from langchain_groq import ChatGroq
# from langchain.text_splitter import CharacterTextSplitter
# from langchain_text_splitters import RecursiveCharacterTextSplitter



# # from langchain_ollama.e import OllamaEmbeddings
# from langchain_community.embeddings import OllamaEmbeddings
# from langchain_community.vectorstores import Chroma



# from langchain.llms import Ollama
# # from langchain_ollama.llms import OllamaLLM
# from langchain.vectorstores.chroma import Chroma

# from ..models import UploadedPDF
# import logging

# # Set up logging
# logger = logging.getLogger(__name__)

# # Groq API Key and Model Setup
# GROQ_API_KEY = "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"
# llm = ChatGroq(
#     groq_api_key=GROQ_API_KEY,
#     model_name="Llama3-8b-8192"
# )

# # Function to extract PDF text
# def extract_pdf_text(pdf_id):
#     pdf_record = get_object_or_404(UploadedPDF, id=pdf_id)
#     pdf_path = pdf_record.file.path
#     pdf_reader = PdfReader(pdf_path)
#     text = ""
    
#     for page in pdf_reader.pages:
#         text += page.extract_text() or ""
    
#     return text

# # Function to process the PDF text and create a vector store
# def process_pdf_text(pdf_text):
#     # Split text into chunks
#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=500,  # Adjust chunk size to 500
#         chunk_overlap=0  # No overlap
#     )
    
#     # Create document structure for the splitter
#     data = [{"content": pdf_text}]  # Wrapping PDF text into the expected format
#     text_chunks = text_splitter.split_documents(data)
    
#     # Use OllamaEmbeddings for vector embeddings
#     local_embeddings = OllamaEmbeddings(model="nomic-embed-text")
    
#     # Create Chroma vector store from the chunks
#     vectorstore = Chroma.from_documents(documents=text_chunks, embedding=local_embeddings)
    
#     return vectorstore

# class PdfAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         logger.info(f"Authenticated user ID: {request.user.id if request.user.is_authenticated else 'Anonymous'}")
#         if not request.user.is_authenticated:
#             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
#         # Handle PDF file upload
#         pdf_file = request.FILES.get('pdf')
#         if not pdf_file:
#             return Response({'error': 'No PDF file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
#         uploaded_pdf = UploadedPDF(file=pdf_file)
#         uploaded_pdf.save()
#         return Response({'pdf_id': uploaded_pdf.id}, status=status.HTTP_201_CREATED)


# class PdfChat(APIView):
#     def get(self, request, *args, **kwargs):
#         if not request.user or not request.user.is_authenticated:
#             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
#         pdf_id = request.query_params.get('pdf_id')
#         question = request.query_params.get('question')
        
#         if not pdf_id:
#             return Response({'error': 'No PDF ID provided'}, status=status.HTTP_400_BAD_REQUEST)

#         if not question:
#             return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Extract and process the PDF text
#             pdf_text = extract_pdf_text(pdf_id)
#             vectorstore = process_pdf_text(pdf_text)
            
#             # Perform similarity search
#             docs = vectorstore.similarity_search(question)
            
#             # Generate response using Groq LLM
#             response_message = llm.invoke(
#                 "Simulate a rap battle between Stephen Colbert and John Oliver"
#             )
            
#             return Response({'response': response_message.content}, status=status.HTTP_200_OK)
        
#         except Exception as e:
#             logger.error(f"Error processing PDF chat: {e}")
#             return Response({'error': 'Internal server error. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.conf import settings
# from groq import ChatGroq
from langchain_groq import ChatGroq
# from langchain_together import ChatTogether

from rest_framework import status

# Set up the Groq API key
GROQ_API_KEY = "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"
llm = ChatGroq(groq_api_key=GROQ_API_KEY, model_name="Llama3-8b-8192")

# A view for uploading PDF files
class PdfAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]  # Ensure that only authenticated users can upload PDFs

    def post(self, request, *args, **kwargs):
        try:
            # Get the PDF file from the request
            pdf_file = request.FILES['pdf']
            pdf_path = default_storage.save(f"pdfs/{pdf_file.name}", pdf_file)

            # You can store pdf_path in a database if required for further use or just pass it
            return Response({"message": "PDF uploaded successfully.", "pdf_path": pdf_path}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# A view for handling chat requests based on PDF content


class PdfChat(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Retrieve parameters from the request
        
        pdf_id = request.query_params.get('pdf_id')
        question = request.query_params.get('question')
        

        # Validate parameters
        if not pdf_id or not question:
            return Response({"error": "pdf_id and question are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Construct the file path
            pdf_file_name = f"{pdf_id}.pdf"
            pdf_path = os.path.join(settings.MEDIA_ROOT, 'pdfs', pdf_file_name)

            # Check if the PDF file exists
            if not os.path.exists(pdf_path):
                return Response({"error": f"PDF with id {pdf_id} not found."}, status=status.HTTP_404_NOT_FOUND)

            # Read the PDF content (you may want to extract and process text from the PDF here)
            with open(pdf_path, 'rb') as pdf_file:
                pdf_content = pdf_file.read()  # Replace this with actual PDF text extraction

            # Generate response using Groq's LLM (assuming the PDF content is plain text)
            response = llm.chat(question=question, context=pdf_content.decode('latin-1'))  # Adjust encoding if needed

            return Response({"response": response}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)