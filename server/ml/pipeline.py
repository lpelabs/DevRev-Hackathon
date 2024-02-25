#Take Data
#Generate Embeddings
#Train Model
#Predict
#Save Model

#For new data,
#Take Data
#Generate Embeddings
#Use Prophet to forecast
#Give analytics

from swot_analysis import generateEmbeddings, dataframeEmbeddings
from geographical_analysis import geoDataframeEmbeddings
from prompting import request_chat_gpt_api
import pandas as pd
import os

def runPipeline(source_name):
    """
    This function will run the pipeline depending on the source.
    
    Input:
    source_name - The source from which the data is to be fetched
    
    Output:
    Insights
    """
    
    base_path = os.path.abspath("../data/")
    
    if source_name == "google_play":
        df = pd.read_csv(os.path.join(base_path, "google_play_voc.csv"))
        #For testing purposes, take only 5 rows
        df = df.head()
        googlePlayModel(df)
        
    elif source_name == "twitter":
        return pd.read_csv(os.path.join(base_path, "twitter_data.csv"))
    elif source_name == "reddit":
        return pd.read_csv(os.path.join(base_path, "new_reddit_voc_data.csv"))
    else:
        raise Exception("Invalid source name")
    
def googlePlayModel(raw_data_df):
    """
    This function will train the model based on the review data from Google Play.
    
    Input:
    review_df - A dataframe containing the review data from Google Play
    """
    
    review_df = pd.DataFrame()
    name_df = pd.DataFrame()
    date_df = pd.DataFrame()
    rating_df = pd.DataFrame()
    
    review_df['review'] = raw_data_df['body']
    print(f"Review Data: {review_df.head()}")
    name_df['user'] = raw_data_df['user']
    print(f"Name Data: {name_df.head()}")
    date_df = pd.to_datetime(raw_data_df['created_at'])
    print(f"Date Data: {date_df.head()}")
    rating_df = raw_data_df['rating']
    print(f"Rating Data: {rating_df.head()}")
    
    review_df['tf_embedding'] = review_df['review'].apply(lambda x: generateEmbeddings(x))
    swot_embeddings = dataframeEmbeddings(review_df)
    geographical_embeddings = geoDataframeEmbeddings(name_df)
    
    final_df = pd.concat([swot_embeddings, geographical_embeddings, date_df, rating_df], axis=1)
    final_df.to_csv("final_df.csv")
    
    print(f"Final df is {final_df}")

def trainModel(dataset_df):
    """
    This will train the model based on the given data.
    
    Input:
    dataset_df - A dataframe containing the review data from various sources
    """
    
    