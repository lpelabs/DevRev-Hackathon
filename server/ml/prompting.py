import os
import openai
import dotenv
dotenv.load_dotenv()

def request_chat_gpt_api(prompt, review):
    # print(f"The prompt is {prompt} and review is {review}")
    if not isinstance(review,str):
        review = ""
    openai.api_key = os.environ['OPENAI_API_KEY']
    ppl = prompt + '\n\n' + review

    completion = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {
            "role": "user",
            "content": ppl,
        },
    ],
)
    
    print(f"Review: {review} and Response: {completion.choices[0].message.content}")
    return completion.choices[0].message.content
