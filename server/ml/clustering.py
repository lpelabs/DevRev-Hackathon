#Clusters for SWOT, automates the elbow process

import pandas as pd
import numpy as np 
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D


def find_optimal_clusters(embeddings):
    """
    Finds the optimal number of clusters using the Elbow Method.
    
    Parameters:
    - embeddings: numpy array containing embeddings
    
    Returns:
    - optimal_n_clusters: optimal number of clusters
    """
    distortions = []
    max_clusters = 21 
    for i in range(1, max_clusters + 1):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
        kmeans.fit(embeddings)
        distortions.append(kmeans.inertia_)
    distortions_diff = np.diff(distortions, 2)
    optimal_n_clusters = np.argmax(distortions_diff) + 2

    return optimal_n_clusters

def cluster_and_visualize(embeddings, optimal_n_clusters):
    """
    Clusters the embeddings and visualizes them in a 3D plot.
    
    Parameters:
    - embeddings: numpy array containing embeddings
    - optimal_n_clusters: optimal number of clusters
    """
    kmeans = KMeans(n_clusters=optimal_n_clusters, init='k-means++', random_state=42)
    cluster_labels = kmeans.fit_predict(embeddings)


    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    for cluster_label in np.unique(cluster_labels):
        cluster_embeddings = embeddings[cluster_labels == cluster_label]
        ax.scatter(cluster_embeddings[:, 0], cluster_embeddings[:, 1], cluster_embeddings[:, 2], label=f'Cluster {cluster_label}')

    ax.set_xlabel('Dimension x')
    ax.set_ylabel('Dimension y')
    ax.set_zlabel('Dimension z')
    ax.set_title('3D Projection of Clustered Embeddings')
    plt.legend()
    plt.show()

def cluster_embeddings_and_visualize(df, column_name):
    """
    Clusters embeddings from the specified column in the DataFrame
    and visualizes them in a 3D plot.
    
    Parameters:
    - df: DataFrame containing the embeddings
    - column_name: name of the column containing embeddings
    """
    embeddings = np.array(df[column_name].to_list())
    optimal_n_clusters = find_optimal_clusters(embeddings)
    cluster_and_visualize(embeddings, optimal_n_clusters)