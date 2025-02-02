# from django.conf import settings
# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.vectorstores import FAISS
# from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
# from langchain.chains.question_answering import load_qa_chain
# from langchain.prompts import PromptTemplate
# import pandas as pd
# from dotenv import load_dotenv

# import os
# import logging

# from ..models import UploadedCSV

# # Set up logging
# logger = logging.getLogger(__name__)

# # Load environment variables
# load_dotenv()
# api_key = os.getenv("GOOGLE_API_KEY")

# # Configure Google Generative AI
# import google.generativeai as genai
# genai.configure(api_key=api_key)

# # Function to extract text from a CSV
# def get_csv_text(csv_path):
#     df = pd.read_csv(csv_path)
#     text = df.to_string(index=False)
#     return text

# # Function to extract and process CSV text into chunks
# def extract_and_process_csv_text(csv_id):
#     csv_record = get_object_or_404(UploadedCSV, id=csv_id)
#     csv_path = csv_record.file.path
#     csv_text = get_csv_text(csv_path)

#     # Split text into chunks for processing
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=400)
#     chunks = text_splitter.split_text(csv_text)
#     return chunks

# # Function to store text chunks in a vector store
# def get_vector_store(text_chunks):
#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

#     vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
#     vector_store.save_local("faiss_index")
#     return vector_store

# # API view to upload and process CSV
# class CsvAPIView(APIView):
#     def post(self, request, *args, **kwargs):
#         if not request.user.is_authenticated:
#             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#         csv_file = request.FILES.get('csv')
#         if not csv_file:
#             return Response({'error': 'No CSV file provided'}, status=status.HTTP_400_BAD_REQUEST)

#         uploaded_csv = UploadedCSV(file=csv_file, user=request.user)
#         uploaded_csv.save()

#         chunks = extract_and_process_csv_text(uploaded_csv.id)
#         get_vector_store(chunks)

#         return Response({'csv_id': uploaded_csv.id}, status=status.HTTP_201_CREATED)

# # Load FAISS vector store with the deserialization option enabled
# def load_vector_store():
#     embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
#     vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
#     return vector_store

# # API view for chatting with the uploaded CSV
# class CsvChat(APIView):
#     def get(self, request, *args, **kwargs):
#         if not request.user or not request.user.is_authenticated:
#             return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

#         csv_id = request.query_params.get('csv_id')
#         question = request.query_params.get('question')

#         if not csv_id or not question:
#             return Response({'error': 'Both CSV ID and question must be provided'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             csv_record = get_object_or_404(UploadedCSV, id=csv_id, user=request.user)

#             context = extract_and_process_csv_text(csv_id)
#             vector_store = load_vector_store()
#             docs = vector_store.similarity_search(question, k=3)  # Retrieve top 3 similar chunks

#             model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-002" , temperature=0.7)
#             chain = load_qa_chain(model, chain_type="stuff")
#             answer = chain.run(input_documents=docs, question=question)

#             return Response({'response': answer}, status=status.HTTP_200_OK)

#         except Exception as e:
#             logger.error(f"Error during CSV chat: {e}")
#             return Response({'error': 'An error occurred while processing the request.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.vectorstores import FAISS
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
import pandas as pd
from dotenv import load_dotenv
import os
import logging
from ..models import UploadedCSV

# Set up logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Google Generative AI
import google.generativeai as genai
genai.configure(api_key=api_key)

# Global Cache to Avoid Repeated Computations
VECTOR_STORE_CACHE = {}

# Function to extract text from CSV efficiently
def get_csv_text(csv_path):
    try:
        df = pd.read_csv(csv_path)
        return df.to_string(index=False)
    except Exception as e:
        logger.error(f"Error reading CSV file: {e}")
        return None

# Function to process CSV text into chunks with better chunking
def extract_and_process_csv_text(csv_id):
    csv_record = get_object_or_404(UploadedCSV, id=csv_id)
    csv_path = csv_record.file.path
    csv_text = get_csv_text(csv_path)

    if not csv_text:
        raise ValueError("Failed to extract text from CSV")

    # Improved chunking strategy
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=128)
    return text_splitter.split_text(csv_text)

# Function to get or create a vector store (avoiding reloading)
def get_vector_store(csv_id):
    if csv_id in VECTOR_STORE_CACHE:
        return VECTOR_STORE_CACHE[csv_id]

    chunks = extract_and_process_csv_text(csv_id)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)

    # Cache the vector store in memory to avoid unnecessary reloading
    VECTOR_STORE_CACHE[csv_id] = vector_store
    return vector_store

# API to handle CSV Upload and Processing
class CsvAPIView(APIView):
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        csv_file = request.FILES.get('csv')
        if not csv_file:
            return Response({'error': 'No CSV file provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uploaded_csv = UploadedCSV.objects.create(file=csv_file, user=request.user)
            get_vector_store(uploaded_csv.id)  # Precompute vector store
            return Response({'csv_id': uploaded_csv.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error uploading CSV: {e}")
            return Response({'error': 'Failed to process CSV file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API to handle CSV Chat
class CsvChat(APIView):
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        csv_id = request.query_params.get('csv_id')
        question = request.query_params.get('question')

        if not csv_id or not question:
            return Response({'error': 'CSV ID and question are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            csv_record = get_object_or_404(UploadedCSV, id=csv_id, user=request.user)
            vector_store = get_vector_store(csv_id)
            docs = vector_store.similarity_search(question, k=3)

            if not docs:
                return Response({'response': 'No relevant information found in the CSV'}, status=status.HTTP_200_OK)

            model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-002", temperature=0.7)
            chain = load_qa_chain(model, chain_type="stuff")
            answer = chain.run(input_documents=docs, question=question)

            return Response({'response': answer}, status=status.HTTP_200_OK)

        except ValueError as ve:
            logger.error(f"Value error in CSV chat: {ve}")
            return Response({'error': str(ve)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Unexpected error in CSV chat: {e}")
            return Response({'error': 'An error occurred while processing the request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
