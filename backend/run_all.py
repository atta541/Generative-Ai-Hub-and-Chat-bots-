import subprocess

files = [
    "C:\\Users\\user\\Desktop\\Chatbots\\backend\\api\\research_rabbit\\configuration.py",
    "C:\\Users\\user\\Desktop\\Chatbots\\backend\\api\\research_rabbit\\prompts.py",
    "C:\\Users\\user\\Desktop\\Chatbots\\backend\\api\\research_rabbit\\research_rabbit.py",
    "C:\\Users\\user\\Desktop\\Chatbots\\backend\\api\\research_rabbit\\state.py",
    "C:\\Users\\user\\Desktop\\Chatbots\\backend\\api\\research_rabbit\\utils.py"
]

processes = []

for file in files:
    process = subprocess.Popen(['python', file])
    processes.append(process)

# Wait for all processes to complete
for process in processes:
    process.wait()
