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
        {"role": "system", "content": "You are a helpful assistant which will help me in classification of text and help me identify useful text."},
        {
            "role": "user",
            "content": ppl,
        },
    ],
)
    return completion.choices[0].message.content

