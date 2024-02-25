#Clusters for SWOT, automates the elbow process

import pandas as pd
import numpy as np 
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from sklearn.decomposition import PCA

def parser(embedding_string):
    # Convert string to list of floats
    embedding_list = [float(num) for num in embedding_string.strip('[]').split()]

    # Convert list to numpy array and then to NumPy tensor
    embedding_tensor = np.array(embedding_list)
    
    return embedding_tensor

def find_optimal_clusters(embeddings):
    # print(type(embeddings.values))
    # embeddings = eval(embeddings.replace(' ',',').replace('\n',','))
    # embeddings = np.array(embeddings)
    #If taking from final_df.csv
    embeddings = embeddings.values
    embeddings = np.array([parser(embedding) for embedding in embeddings])
    
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
    embeddings = np.array([parser(embedding) for embedding in embeddings])
    kmeans = KMeans(n_clusters=num_clusters, init='k-means++', random_state=42)
    embeddings_reshaped = np.vstack(embeddings)  # Convert the list of embeddings to a 2D array
    clusters = kmeans.fit_predict(embeddings_reshaped)
    return clusters


def visualize_clusters_3d(embeddings, clusters):
    pca = PCA(n_components=3)
    embeddings = np.array([parser(embedding) for embedding in embeddings])
    embeddings_reshaped = np.vstack(embeddings)  # Convert the list of embeddings to a 2D array
    embeddings_3d = pca.fit_transform(embeddings_reshaped)
    
    print(f"Embeddings 3D are {embeddings_3d.shape}")
    print(f"Ereshaped are {embeddings_reshaped.shape}")
    
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    
    # Assign a unique color to each cluster
    num_clusters = len(np.unique(clusters))
    colors = plt.cm.viridis(np.linspace(0, 1, num_clusters))
    
    cluster_dict = {}
    
    for cluster_id, color in zip(range(num_clusters), colors):
        cluster_points = embeddings_3d[clusters == cluster_id]
        cluster_dict[cluster_id] = cluster_points.tolist()
        ax.scatter(cluster_points[:, 0], cluster_points[:, 1], cluster_points[:, 2], c=color, label=f'Cluster {cluster_id}')
    
        print(f"cluster points are {cluster_points} \n and cluster id is {cluster_id}")
    
    print("Cluster dict is")
    print(cluster_dict)
    
    return cluster_dict

