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

from .swot_analysis import getWeakness, getThreats, usefulDataframeEmbeddings, dataframeEmbeddings, sentimentDataframeEmbeddings, generateEmbeddings
from .geographical_analysis import geoDataframeEmbeddings, getContinentSentimentDict
from .prompting import request_chat_gpt_api
from .clusteringPipeline import clusteringProcess
import json
import pandas as pd
import os

def processData(client_name, subreddit_name, twitter_handle, TESTING=False):
    client_name = client_name.lower()
    try:
        previous_data_dict = {}#One level up
        processed_data_dict = {}
        
        save_path = os.path.abspath("./output/")
        
        with open(os.path.join(save_path,"processed.json"), "a+") as f:
            f.seek(0)
            try:
                previous_data_dict = json.load(f)
            except:
                previous_data_dict = {}
        
        for source in ["reddit", "google_play", "twitter"]:
            print(f"Running pipeline for {source}")
            processed_data_dict[source] = runPipeline(source, subreddit_name, twitter_handle, client_name, TESTING=TESTING)
            
        previous_data_dict[client_name] = processed_data_dict
            
        with open(os.path.join(save_path,"processed.json"), "w") as f:
            json.dump(previous_data_dict, f)
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}

def runPipeline(source_name, subreddit_name, twitter_handle, client_name, TESTING=False):
    """
    This function will run the pipeline depending on the source.
    
    Input:
    source_name - The source from which the data is to be fetched
    
    Output:
    Insights
    """
    try:
        base_path = os.path.abspath("./data/")
        save_path = os.path.abspath("./output/")
        
        if source_name == "google_play":
            google_play_csv_file = f"google_play_{client_name}_voc.csv"
            try:
                df = pd.read_csv(os.path.join(base_path, google_play_csv_file))
            except Exception as e:
                print(f"Error: {e}")
                return {str(e)}
                
            #For testing purposes, take only 5 rows
            if TESTING:
                df = df.head()
            
            # with open(os.path.join(save_path,source_name+".json"), "w") as f:
            analytics = googlePlayModel(df)
                # json.dump(analytics, f)
            
            return analytics
            
        elif source_name == "twitter":

            if twitter_handle == "" or twitter_handle is None:
                return {"error": "Twitter handle is empty"}
            else:
                try:
                    df = pd.read_csv(os.path.join(base_path, f"{twitter_handle}_twitter_data.csv"))
                except Exception as e:
                    print(f"Error: {e}")
                    return {str(e)}
                #For testing purposes, take only 5 rows
                if TESTING:
                    df = df.head()
                
                # with open(os.path.join(save_path,source_name+".json"), "w") as f:
                analytics = twitterModel(df)
                # json.dump(analytics, f)
                
                return analytics
                
        elif source_name == "reddit":
            if subreddit_name == "" or subreddit_name is None:
                return {"error": "Subreddit name is empty"}
            else:
                try:
                    df = pd.read_csv(os.path.join(base_path, f"new_{subreddit_name}_reddit_voc_data.csv"), encoding='latin1').dropna()
                except Exception as e:
                    print(f"Error: {e}")
                    return {str(e)}
                #For testing purposes, take only 5 rows
                if TESTING:
                    df = df.head()
                
                # with open(os.path.join(save_path,source_name+".json"), "w") as f:
                analytics = redditModel(df)
                # json.dump(analytics, f)
                
                return analytics
        else:
            raise Exception("Invalid source name")
        
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}

def redditModel(raw_data_df):
    """
    This function will train the model based on the review data from Reddit.
    
    Input:
    review_df - A dataframe containing the review data from Reddit
    """
    try:
        USEFULNESS_THRESHOLD = 2
        usefulness_df = pd.DataFrame()
        usefulness_df['review'] = raw_data_df['body']
        usefulness_df = usefulDataframeEmbeddings(usefulness_df)
        print(f"Usefulness df is {usefulness_df}")
        
        raw_data_df = raw_data_df[usefulness_df['usefulness'] > USEFULNESS_THRESHOLD]
        
        print(raw_data_df.head())
        
        review_df = pd.DataFrame()
        # name_df = pd.DataFrame()
        date_df = pd.DataFrame()    
        # rating_df = pd.DataFrame()
        sentiment_df = pd.DataFrame()
        
        review_df['review'] = raw_data_df['body']
        print(f"Review Data: {review_df.head()}")
        # name_df['user'] = raw_data_df['username']
        # print(f"Name Data: {name_df.head()}")
        date_df = pd.to_datetime(raw_data_df['created_at'])
        print(f"Date Data: {date_df.head()}")
        # rating_df = raw_data_df['rating']
        # print(f"Rating Data: {rating_df.head()}")
        sentiment_df['review'] = raw_data_df['body']
        sentiment_df = sentimentDataframeEmbeddings(sentiment_df)
        print(f"Sentiment Data: {sentiment_df.head()}")
        
        review_df['tf_embedding'] = review_df['review'].apply(lambda x: generateEmbeddings(x))
        swot_embeddings = dataframeEmbeddings(review_df)
        # geographical_embeddings = geoDataframeEmbeddings(name_df)
        
        final_df = pd.concat([swot_embeddings, sentiment_df, date_df], axis=1)
        final_df.to_csv("final_reddit_df.csv")
        
        final_df = pd.read_csv("final_reddit_df.csv")
        
        #Cluster based on SWOT - query LLM for those many number of clusters
        optimal_cluster_dict, swot_cluster_dict, centroid_dict = clusteringProcess(final_df)
        print(f"Swot cluster dict is {swot_cluster_dict}")
        print(f"Optimal cluster dict is {optimal_cluster_dict}")
        print(f"Centroid dict is {centroid_dict}")
        
        #Cluster based on Geographical Data - send dataframe with continent and review
        # geo_cluster_dict = final_df['continentEmbeddings'].value_counts().to_dict()
        # print(f"Geo cluster dict is {geo_cluster_dict}")
        
        # #For each Continent - sentiment timeline
        # continent_sentiment_dict = getContinentSentimentDict(final_df)
        # print(f"Continent sentiment dict is {continent_sentiment_dict}")

        #Work on weaknesses prompt
        no_w_clusters = optimal_cluster_dict['w']
        work_on_weakness = getWeakness(final_df, no_w_clusters)
        print(f"Work on weakness is {work_on_weakness}")
        
        #Work on threats prompt
        no_t_clusters = optimal_cluster_dict['t']
        work_on_threats = getThreats(final_df, no_t_clusters)
        print(f"Work on threats is {work_on_threats}")
        
        print(f"Final df is {final_df}")

        final_data_dict = {
            "swot_cluster_dict": swot_cluster_dict,
            # "geo_cluster_dict": geo_cluster_dict,
            # "continent_sentiment_dict": continent_sentiment_dict,
            "work_on_weakness": work_on_weakness,
            "work_on_threats": work_on_threats, 
            "centroid_dict" : centroid_dict
        }
        
        print(f"Final data dict is {final_data_dict}")
        
        return final_data_dict
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}

def twitterModel(raw_data_df):
    """
    This function will train the model based on the review data from Twitter.
    
    Input:
    review_df - A dataframe containing the review data from Twitter
    """
    try:
        USEFULNESS_THRESHOLD = 2
        usefulness_df = pd.DataFrame()
        usefulness_df['review'] = raw_data_df['body']
        usefulness_df = usefulDataframeEmbeddings(usefulness_df)
        print(f"Usefulness df is {usefulness_df}")
        
        raw_data_df = raw_data_df[usefulness_df['usefulness'] > USEFULNESS_THRESHOLD]
        
        print(raw_data_df.head())
        
        review_df = pd.DataFrame()
        name_df = pd.DataFrame()
        date_df = pd.DataFrame()    
        rating_df = pd.DataFrame()
        sentiment_df = pd.DataFrame()
        
        review_df['review'] = raw_data_df['body']
        print(f"Review Data: {review_df.head()}")
        name_df['user'] = raw_data_df['username']
        print(f"Name Data: {name_df.head()}")
        date_df = pd.to_datetime(raw_data_df['created_at'])
        print(f"Date Data: {date_df.head()}")
        # rating_df = raw_data_df['rating']
        # print(f"Rating Data: {rating_df.head()}")
        sentiment_df['review'] = raw_data_df['body']
        sentiment_df = sentimentDataframeEmbeddings(sentiment_df)
        print(f"Sentiment Data: {sentiment_df.head()}")
        
        review_df['tf_embedding'] = review_df['review'].apply(lambda x: generateEmbeddings(x))
        swot_embeddings = dataframeEmbeddings(review_df)
        geographical_embeddings = geoDataframeEmbeddings(name_df)
        
        final_df = pd.concat([swot_embeddings, geographical_embeddings, sentiment_df, date_df], axis=1)
        final_df.to_csv("final_twitter_df.csv")
        
        final_df = pd.read_csv("final_twitter_df.csv")
        
        #Cluster based on SWOT - query LLM for those many number of clusters
        optimal_cluster_dict, swot_cluster_dict, centroid_dict = clusteringProcess(final_df)
        print(f"Swot cluster dict is {swot_cluster_dict}")
        print(f"Optimal cluster dict is {optimal_cluster_dict}")
        
        #Cluster based on Geographical Data - send dataframe with continent and review
        geo_cluster_dict = final_df['continentEmbeddings'].value_counts().to_dict()
        print(f"Geo cluster dict is {geo_cluster_dict}")
        
        #For each Continent - sentiment timeline
        continent_sentiment_dict = getContinentSentimentDict(final_df)
        print(f"Continent sentiment dict is {continent_sentiment_dict}")

        #Work on weaknesses prompt
        no_w_clusters = optimal_cluster_dict['w']
        work_on_weakness = getWeakness(final_df, no_w_clusters)
        print(f"Work on weakness is {work_on_weakness}")
        
        #Work on threats prompt
        no_t_clusters = optimal_cluster_dict['t']
        work_on_threats = getThreats(final_df, no_t_clusters)
        print(f"Work on threats is {work_on_threats}")
        
        print(f"Final df is {final_df}")

        final_data_dict = {
            "swot_cluster_dict": swot_cluster_dict,
            "geo_cluster_dict": geo_cluster_dict,
            "continent_sentiment_dict": continent_sentiment_dict,
            "work_on_weakness": work_on_weakness,
            "work_on_threats": work_on_threats, 
            "centroid_dict" : centroid_dict
        }
        
        print(f"Final data dict is {final_data_dict}")
        
        return final_data_dict
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}
    
def googlePlayModel(raw_data_df):
    """
    This function will train the model based on the review data from Google Play.
    
    Input:
    review_df - A dataframe containing the review data from Google Play
    """
    try:

        USEFULNESS_THRESHOLD = 2
        usefulness_df = pd.DataFrame()
        usefulness_df['review'] = raw_data_df['body']
        usefulness_df = usefulDataframeEmbeddings(usefulness_df)
        print(f"Usefulness df is {usefulness_df}")
        
        raw_data_df = raw_data_df[usefulness_df['usefulness'] > USEFULNESS_THRESHOLD]
        
        print(raw_data_df.head())
        
        review_df = pd.DataFrame()
        name_df = pd.DataFrame()
        date_df = pd.DataFrame()    
        rating_df = pd.DataFrame()
        sentiment_df = pd.DataFrame()
        
        review_df['review'] = raw_data_df['body']
        print(f"Review Data: {review_df.head()}")
        name_df['user'] = raw_data_df['user']
        print(f"Name Data: {name_df.head()}")
        date_df = pd.to_datetime(raw_data_df['created_at'])
        print(f"Date Data: {date_df.head()}")
        rating_df = raw_data_df['rating']
        print(f"Rating Data: {rating_df.head()}")
        sentiment_df['review'] = raw_data_df['body']
        sentiment_df = sentimentDataframeEmbeddings(sentiment_df)
        print(f"Sentiment Data: {sentiment_df.head()}")
        
        review_df['tf_embedding'] = review_df['review'].apply(lambda x: generateEmbeddings(x))
        swot_embeddings = dataframeEmbeddings(review_df)
        geographical_embeddings = geoDataframeEmbeddings(name_df)
        
        final_df = pd.concat([swot_embeddings, geographical_embeddings, sentiment_df, date_df, rating_df], axis=1)
        final_df.to_csv("final_google_play_df.csv")
        
        final_df = pd.read_csv("final_google_play_df.csv")
        
        #Cluster based on SWOT - query LLM for those many number of clusters
        optimal_cluster_dict, swot_cluster_dict, centroid_dict = clusteringProcess(final_df)
        print(f"Swot cluster dict is {swot_cluster_dict}")
        print(f"Optimal cluster dict is {optimal_cluster_dict}")
        print(f"Centroid dict is {centroid_dict}")
        
        #Cluster based on Geographical Data - send dataframe with continent and review
        geo_cluster_dict = final_df['continentEmbeddings'].value_counts().to_dict()
        print(f"Geo cluster dict is {geo_cluster_dict}")
        
        #For each Continent - sentiment timeline
        continent_sentiment_dict = getContinentSentimentDict(final_df)
        print(f"Continent sentiment dict is {continent_sentiment_dict}")

        #Work on weaknesses prompt
        no_w_clusters = optimal_cluster_dict['w']
        work_on_weakness = getWeakness(final_df, no_w_clusters)
        print(f"Work on weakness is {work_on_weakness}")
        
        #Work on threats prompt
        no_t_clusters = optimal_cluster_dict['t']
        work_on_threats = getThreats(final_df, no_t_clusters)
        print(f"Work on threats is {work_on_threats}")
        
        print(f"Final df is {final_df}")

        final_data_dict = {
            "swot_cluster_dict": swot_cluster_dict,
            "geo_cluster_dict": geo_cluster_dict,
            "continent_sentiment_dict": continent_sentiment_dict,
            "work_on_weakness": work_on_weakness,
            "work_on_threats": work_on_threats, 
            "centroid_dict" : centroid_dict
        }
        
        print(f"Final data dict is {final_data_dict}")
        
        return final_data_dict
    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}