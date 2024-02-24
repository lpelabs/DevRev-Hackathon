from .constants import CONTINENT_LABEL, COUNTRY_LABEL


def generateEmbeddings(df,on):
    if on == "Continents":
        return df.apply(lambda x: CONTINENT_LABEL[x])
    elif on == "Countries":
        return df.apply(lambda x: COUNTRY_LABEL[x])

def dataframeEmbeddings(df):
    """Create embeddings for the country and continent

    Args:
        df (csv): dataframe
    """
    
    df['continentEmbeddings'] = generateEmbeddings(df['Continents'], "Continents")
    df['countryEmbeddings'] = generateEmbeddings(df['Countries'], "Countries")
    
    return df