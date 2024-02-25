#Clusters for SWOT, automates the elbow process

import pandas as pd
import numpy as np 
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from sklearn.decomposition import PCA


def find_optimal_clusters(embeddings):
    distortions = []
    max_clusters = min(len(embeddings), 15)  
    
    for i in range(1, max_clusters + 1):
        kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
        embeddings_reshaped = np.vstack(embeddings)  
        kmeans.fit(embeddings_reshaped)
        distortions.append(kmeans.inertia_)
    
    distortions_diff = np.diff(distortions, 2)
    

    optimal_num_clusters = np.argmax(distortions_diff) + 2  
    
    elbow = 'NO'
    if elbow == 'YES': 
        plt.plot(range(1, max_clusters + 1), distortions, marker='o')
        plt.xlabel('Number of clusters')
        plt.ylabel('Distortion')
        plt.title('Elbow Method')
        plt.show()
    return optimal_num_clusters

def perform_clustering(embeddings, num_clusters):
    kmeans = KMeans(n_clusters=num_clusters, init='k-means++', random_state=42)
    embeddings_reshaped = np.vstack(embeddings)  # Convert the list of embeddings to a 2D array
    clusters = kmeans.fit_predict(embeddings_reshaped)
    return clusters


def visualize_clusters_3d(embeddings, clusters):
    pca = PCA(n_components=3)
    embeddings_reshaped = np.vstack(embeddings)  # Convert the list of embeddings to a 2D array
    embeddings_3d = pca.fit_transform(embeddings_reshaped)
    
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    
    # Assign a unique color to each cluster
    num_clusters = len(np.unique(clusters))
    colors = plt.cm.viridis(np.linspace(0, 1, num_clusters))
    
    for cluster_id, color in zip(range(num_clusters), colors):
        cluster_points = embeddings_3d[clusters == cluster_id]
        ax.scatter(cluster_points[:, 0], cluster_points[:, 1], cluster_points[:, 2], c=color, label=f'Cluster {cluster_id}')
    
    ax.set_title('Clustering Results (3D)')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.set_zlabel('z')
    ax.legend()
    plt.show()

