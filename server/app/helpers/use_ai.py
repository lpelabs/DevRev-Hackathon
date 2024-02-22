import os
import openai
import dotenv
dotenv.load_dotenv()

def request_chat_gpt_api(prompt, review):

    openai.api_key = os.environ['OPENAI_API_KEY']
    ppl = prompt + review

    completion = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {
            "role": "user",
            "content": ppl,
        },
    ],
)
    return completion.choices[0].message.content

