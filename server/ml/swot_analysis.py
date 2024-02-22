"""
Assume a dataframe with the following columns : 

Strengths | Weaknesses | Opportunities | Threats 

"""

import pandas as pd
import numpy as np 
import torch 
import torch.nn as nn 
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")

def generateEmbeddings(body):
    """Generate sentence embeddings for the purpose of clustering

    Args:
        body (string): Text present in the dataframe
    """
    return model.encode(body)

#This will create embeddings for the SWOT columns

def dataframeEmbeddings(df):
    """Create embeddings for the SWOT, and call the columns sEmbeddings, wEmbeddings, oEmbeddings, tEmbeddings

    Args:
        df (csv): dataframe
    """
    df['sEmbeddings'] = generateEmbeddings(df['Strengths'])
    df['wEmbeddings'] = generateEmbeddings(df['Weaknesses'])
    df['oEmbeddings'] = generateEmbeddings(df['Opportunities'])
    df['tEmbeddings'] = generateEmbeddings(df['Threats'])
    return df