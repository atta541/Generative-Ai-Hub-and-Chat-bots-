from tavily import TavilyClient

tavily = TavilyClient(api_key="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")

# response = tavily.search(query="What is the job market outlook in 2024?")
response = tavily.search(query="What is the job market outlook in 2024?", search_depth="advanced")

for obj in response['results']:
    print(obj['url'])
    print(obj['content'])
    print()