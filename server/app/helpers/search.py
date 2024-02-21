from googlesearch import search
from enums.gsearch_info import SearchInfo

def google_search(query, search_info):
    # Perform the Google search
    results = search(query, num_results=10, advanced=True)
    
    # Extract requested information from search results
    if search_info == SearchInfo.URLS:
        info_list = [result.url for result in results]
    elif search_info == SearchInfo.TITLES:
        info_list = [result.title for result in results]
    elif search_info == SearchInfo.SNIPPETS:
        info_list = [result.description for result in results]
    
    return info_list

