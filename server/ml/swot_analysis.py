"""
Assume a dataframe with the following columns : 

Strengths | Weaknesses | Opportunities | Threats 

"""

import pandas as pd
import numpy as np 

from .prompting import request_chat_gpt_api
from .prompts import SWOT_PROMPT,NOISE_PROMPT,SENTIMENT_PROMPT, WEAKNESS_PROMPT, THREATS_PROMPT
from sentence_transformers import SentenceTransformer   

def generateEmbeddings(body):
    """Generate sentence embeddings for the purpose of clustering

    Args:
        body (string): Text present in the dataframe
    """
    model = SentenceTransformer("all-MiniLM-L6-v2")
    return model.encode(body)

#This will create embeddings for the SWOT columns

def swotDataframeEmbeddings(reviews_df, key):
    reviews_df['swot_analysis'] = reviews_df['review'].apply(lambda x: request_chat_gpt_api(SWOT_PROMPT,x, key))
    
    reviews_df['Strengths'] = [x.split('\n')[0] for x in reviews_df['swot_analysis']]
    reviews_df['Weaknesses'] = [x.split('\n')[1] for x in reviews_df['swot_analysis']]
    reviews_df['Opportunities'] = [x.split('\n')[2] for x in reviews_df['swot_analysis']]
    reviews_df['Threats'] = [x.split('\n')[3] for x in reviews_df['swot_analysis']]
    
    print(f"SWOT Analysis: {reviews_df['swot_analysis']}")
    print(f"Strengths: {reviews_df['Strengths']}")
    print(f"Weaknesses: {reviews_df['Weaknesses']}")
    print(f"Opportunities: {reviews_df['Opportunities']}")
    print(f"Threats: {reviews_df['Threats']}")
    
    return reviews_df

def getUsefulnessFromResponse(response):
    if not response.lower().startswith("useful"):
        return 0
    if response.split()[1].isalpha():
        return 0
    num = response.split()[1].replace('.',' ')
    num = int(eval(num))
    if isinstance(num,int):
        return num
    else:
        print(f"The unparsed response is {response}")
        return 0

def usefulDataframeEmbeddings(reviews_df, key):
    reviews_df['usefulness'] = reviews_df['review'].apply(lambda x: getUsefulnessFromResponse(request_chat_gpt_api(NOISE_PROMPT,x, key)))
    return reviews_df

def sentimentDataframeEmbeddings(reviews_df, key):
    reviews_df['sentiment'] = reviews_df['review'].apply(lambda x: int(request_chat_gpt_api(SENTIMENT_PROMPT,x, key).split()[1]))
    return reviews_df

def getWeakness(reviews_df, count, key):
    count = None
    reviews_list = reviews_df['review'].tolist()
    reviews_string = ' '.join(reviews_list)
    if count is None:
        return request_chat_gpt_api(WEAKNESS_PROMPT, reviews_string, key)
    else:
        return request_chat_gpt_api(WEAKNESS_PROMPT+ f"\n\n I need you to give me {count} suggestions", reviews_string, key).split('\n')

def getThreats(reviews_df,count, key):
    count = None
    reviews_list = reviews_df['review'].tolist()
    reviews_string = ' '.join(reviews_list)
    if count is None:
        return request_chat_gpt_api(THREATS_PROMPT, reviews_string, key)
    else:
        return request_chat_gpt_api(THREATS_PROMPT+ f"\n\n I need you to give me {count} suggestions", reviews_string, key).split('\n')


def dataframeEmbeddings(df):
    """Create embeddings for the SWOT, and call the columns sEmbeddings, wEmbeddings, oEmbeddings, tEmbeddings

    Args:
        df (csv): dataframe
    """
    
    df = swotDataframeEmbeddings(df)
    
    print(f"SWOT Dataframe: {df}")
    
    return_df = pd.DataFrame()
    
    return_df['sEmbeddings'] = df['Strengths'].apply(lambda x: generateEmbeddings(x))
    return_df['wEmbeddings'] = df['Weaknesses'].apply(lambda x: generateEmbeddings(x))
    return_df['oEmbeddings'] = df['Opportunities'].apply(lambda x: generateEmbeddings(x))
    return_df['tEmbeddings'] = df['Threats'].apply(lambda x: generateEmbeddings(x))
    
    print(return_df)
    
    return return_df