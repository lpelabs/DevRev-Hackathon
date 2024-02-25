"""
Assume a dataframe with the following columns : 

Strengths | Weaknesses | Opportunities | Threats 

"""

import pandas as pd
import numpy as np 
import torch 
import torch.nn as nn 
from prompting import request_chat_gpt_api
from prompts import SWOT_PROMPT,NOISE_PROMPT,SENTIMENT_PROMPT, WEAKNESS_PROMPT, THREATS_PROMPT
from sentence_transformers import SentenceTransformer

def generateEmbeddings(body):
    """Generate sentence embeddings for the purpose of clustering

    Args:
        body (string): Text present in the dataframe
    """
    model = SentenceTransformer("all-MiniLM-L6-v2")
    return model.encode(body)

#This will create embeddings for the SWOT columns

def swotDataframeEmbeddings(reviews_df):
    reviews_df['swot_analysis'] = reviews_df['review'].apply(lambda x: request_chat_gpt_api(SWOT_PROMPT,x))
    
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

def usefulDataframeEmbeddings(reviews_df):
    reviews_df['usefulness'] = reviews_df['review'].apply(lambda x: int(request_chat_gpt_api(NOISE_PROMPT,x).split()[1]))
    return reviews_df

def sentimentDataframeEmbeddings(reviews_df):
    reviews_df['sentiment'] = reviews_df['review'].apply(lambda x: int(request_chat_gpt_api(SENTIMENT_PROMPT,x).split()[1]))
    return reviews_df

def getWeakness(reviews_df,count=None):
    reviews_list = reviews_df['review'].tolist()
    reviews_string = ' '.join(reviews_list)
    if count is None:
        return request_chat_gpt_api(WEAKNESS_PROMPT, reviews_string)
    else:
        return request_chat_gpt_api(WEAKNESS_PROMPT+ f"\n\n I need you to give me {count} suggestions", reviews_string).split('\n')

def getThreats(reviews_df,count=None):
    reviews_list = reviews_df['review'].tolist()
    reviews_string = ' '.join(reviews_list)
    if count is None:
        return request_chat_gpt_api(THREATS_PROMPT, reviews_string)
    else:
        return request_chat_gpt_api(THREATS_PROMPT+ f"\n\n I need you to give me {count} suggestions", reviews_string).split('\n')


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