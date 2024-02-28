import numpy as np 
import pandas as pd
from .clustering import find_optimal_clusters, perform_clustering, visualize_clusters_3d
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
    

def clusteringProcess(final_df):
    embeddingColumns = ['sEmbeddings', 'wEmbeddings', 'oEmbeddings', 'tEmbeddings']
    # final_df[embeddingColumns] = final_df[embeddingColumns].applymap(clean)
    swotClusterDict = {}
    optimalClusterDict = {}
    clusterCentroidDict = {}
    for cols in embeddingColumns:
        print(cols)
        optimal_clusters = find_optimal_clusters(final_df[cols])
        optimalClusterDict[cols[0]] = optimal_clusters
        clusters, cluster_centroid = perform_clustering(final_df[cols].values, optimal_clusters)
        clusterCentroidDict[cols[0]] = cluster_centroid 
        swotClusterDict[cols[0]] = visualize_clusters_3d(final_df[cols].values, clusters)
        
    
    return optimalClusterDict,swotClusterDict, clusterCentroidDict
    