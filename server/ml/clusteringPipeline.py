import numpy as np 
import pandas as pd
from clustering import find_optimal_clusters, perform_clustering, visualize_clusters_3d
import regex as re
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


#Take final_df.csv here 
def clean(text):
    array_string = text.replace('\r\n', '')
    array_string = array_string.replace('[ ' , '')
    array_string = array_string.replace('] ', '')
    l = array_string.split(' ')
    l = [s.replace(' ', '') for s in l]
    cleaned_data = [re.sub(r'[^eE\d.-]', '', x) for x in l if x]
    float_data = [float(x) for x in cleaned_data]
    numpy_array = np.array(float_data)
    numpy_array.reshape(1, -1)  
    return numpy_array
    

def main(df):
    embeddingColumns = ['sEmbeddings', 'wEmbeddings', 'oEmbeddings', 'tEmbeddings']
    df[embeddingColumns] = df[embeddingColumns].applymap(clean)
    for cols in embeddingColumns:
        visualize_clusters_3d(df[cols].values, perform_clustering(df[cols].values, find_optimal_clusters(df[cols])))
    
    