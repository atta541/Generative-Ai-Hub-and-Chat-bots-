import json

# Input and output file paths
input_file = r"C:\Users\user\Desktop\Datasets\worldcupt20.jsonl"
output_file = r"C:\Users\user\Desktop\Datasets\formatted_testcup.jsonl"

def restructure_dataset(input_file, output_file):
    try:
        # Read the original dataset
        with open(input_file, 'r', encoding='utf-8') as infile:
            data = json.load(infile)

        formatted_data = []
        messages = []

        # Process each "conversation" in the input dataset
        for i, conversation in enumerate(data.get("messages", [])):
            messages.append(conversation)
            
            # Group each set of 3 messages as a single conversation
            if (i + 1) % 3 == 0:  # After every 3 messages (system, user, assistant)
                formatted_data.append({"messages": messages})
                messages = []  # Reset for the next conversation

        # Write the formatted data to the output file in .jsonl format
        with open(output_file, 'w', encoding='utf-8') as outfile:
            for entry in formatted_data:
                outfile.write(json.dumps(entry) + '\n')

        print(f"Dataset successfully restructured and saved to {output_file}")

    except Exception as e:
        print(f"Error: {e}")

# Call the function
restructure_dataset(input_file, output_file)
