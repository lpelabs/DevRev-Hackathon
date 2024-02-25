from constants import CONTINENT_LABEL, COUNTRY_LABEL
from prompts import CONTINENT_PROMPT, COUNTRY_PROMPT
from prompting import request_chat_gpt_api
import pandas as pd

def countryLabel(country):
    if country in COUNTRY_LABEL:
        return COUNTRY_LABEL[country]
    else:
        return -1

def continentLabel(continent):
    if continent in CONTINENT_LABEL:
        return CONTINENT_LABEL[continent]
    else:
        return -1

def generateEmbeddings(df,on):
    if on == "Continents":
        return df.apply(lambda x: continentLabel(x))
    elif on == "Countries":
        return df.apply(lambda x: countryLabel(x))

def geoDataframeEmbeddings(name_df):
    """Create embeddings for the country and continent

    Args:
        name_df (csv): dataframe with names
    """
    
    name_df['Continents'] = name_df['user'].apply(lambda x: request_chat_gpt_api(CONTINENT_PROMPT,x).split()[1])
    
    df = pd.DataFrame()
    
    df['continentEmbeddings'] = generateEmbeddings(name_df['Continents'], "Continents")
    # df['countryEmbeddings'] = generateEmbeddings(df['Countries'], "Countries")
    
    return df

