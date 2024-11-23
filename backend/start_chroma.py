# import chromadb

# # Initialize the Chroma client
# client = chromadb.Client()

# # Create a collection
# collection = client.create_collection(name="my_collection")

# # Add an embedding to the collection (example)
# collection.add(
#     documents=["This is a test document."],
#     metadatas=[{"source": "manual"}],
#     ids=["doc1"]
# )

# print("Document added to Chroma collection.")



import chromadb

# Initialize the Chroma client
client = chromadb.Client()

# Start the Chroma service (make sure it's running on the specified port)
client.start_service(host="localhost", port=11434)

# Create a collection
collection = client.create_collection(name="my_collection")

# Add an embedding to the collection (example)
collection.add(
    documents=["This is a test document."],
    metadatas=[{"source": "manual"}],
    ids=["doc1"]
)

print("Document added to Chroma collection.")
