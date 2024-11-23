from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from PyPDF2 import PdfReader
from dotenv import load_dotenv
import os
import logging

from ..models import UploadedPDF

# Set up logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Configure Google Generative AI
import google.generativeai as genai
genai.configure(api_key=api_key)

# Function to extract text from a PDF
def get_pdf_text(pdf_path):
    text = ""
    pdf_reader = PdfReader(pdf_path)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

# Function to extract and process PDF text into chunks
def extract_and_process_pdf_text(pdf_id):
    # Load the PDF from the database
    pdf_record = get_object_or_404(UploadedPDF, id=pdf_id)
    pdf_path = pdf_record.file.path

    # Extract all text from the PDF
    pdf_text = get_pdf_text(pdf_path)

    # Split text into chunks for processing
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=800)
    chunks = text_splitter.split_text(pdf_text)
    return chunks

# Function to store text chunks in a vector store
def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")
    return vector_store

# API view to upload and process PDF
class PdfAPIView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info(f"Authenticated user ID: {request.user.id if request.user.is_authenticated else 'Anonymous'}")
        if not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        pdf_file = request.FILES.get('pdf')
        if not pdf_file:
            return Response({'error': 'No PDF file provided'}, status=status.HTTP_400_BAD_REQUEST)

        uploaded_pdf = UploadedPDF(file=pdf_file)
        uploaded_pdf.save()

        # Extract, chunk, and store text from the PDF
        chunks = extract_and_process_pdf_text(uploaded_pdf.id)
        get_vector_store(chunks)

        return Response({'pdf_id': uploaded_pdf.id}, status=status.HTTP_201_CREATED)

from langchain.vectorstores import FAISS

# Load FAISS vector store with the deserialization option enabled
def load_vector_store():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    return vector_store


class PdfChat(APIView):
    def get(self, request, *args, **kwargs):
        if not request.user or not request.user.is_authenticated:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        pdf_id = request.query_params.get('pdf_id')
        question = request.query_params.get('question')

        if not pdf_id:
            return Response({'error': 'No PDF ID provided'}, status=status.HTTP_400_BAD_REQUEST)
        if not question:
            return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Extract and process text from the PDF
            context = extract_and_process_pdf_text(pdf_id)

            # Load the vector store safely
            vector_store = load_vector_store()
            docs = vector_store.similarity_search(question, k=3)  # Retrieve top 3 similar chunks

           

            prompt_template = """
            Using the provided PDF content, answer the user's question with specific details from the document wherever possible. If the answer is not found in the PDF context, answer based on general knowledge, but clearly indicate that the answer is not directly from the document.

            **Context from PDF:**\n{context}\n
            **User Question:** {question}\n

            **Answer (provide detailed, relevant information; specify if based on general knowledge if PDF content is insufficient):**
            """



            model = ChatGoogleGenerativeAI(model="gemini-1.5-pro-002", temperature=0.7)  # Increased temperature
            prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
# Use 'stuff' chain for flexibility
            chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
            
            # Generate the response
            response = chain.invoke({"input_documents": docs, "question": question})
            return Response({'response': response['output_text']}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error processing PDF chat: {e}")
            return Response({'error': 'Internal server error. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





