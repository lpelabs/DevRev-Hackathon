from fastapi.middleware.cors import CORSMiddleware
import os
from fastapi import HTTPException, Depends, status, Query, FastAPI
import logging
import requests

from google_play_scraper import Sort, reviews
import praw
import tweepy
import csv
from openpyxl import Workbook
import pandas as pd
import json
import itertools

from enums.gsearch_info import SearchInfo
from bs4 import BeautifulSoup

from helpers.search import google_search, get_playstore_link
from helpers.remove_emoji import remove_emoji
from helpers.use_ai import request_chat_gpt_api
from helpers.prompts import NOISE_PROMPT, SENTIMENT_PROMPT, SWOT_PROMPT

from ml.pipeline import processData

from config.config import SECRETS
import csv
import requests
from bs4 import BeautifulSoup

import dotenv

dotenv.load_dotenv()

consumer_key = SECRETS["consumer_key"]
consumer_secret = SECRETS["consumer_secret"]
access_token = SECRETS["access_token"]
access_token_secret = SECRETS["access_token_secret"]


GITHUB_PAT = os.getenv("GITHUB_PAT")
CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
CLIENT_SECRET = os.getenv("REDDIT_CLIENT_SECRET")
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/playstore_reviews")
def get_play_store_reviews(app_name: str, ratings: int, numReviews: int):
    try:
        print(f"Fetching reviews for app: {app_name}")  # Debugging print statement

        query = f"{app_name} play store android app"
        url = get_playstore_link(query, search_info=SearchInfo.URLS)
        content_after_id = url.split("id=")[1].split("&")[0]

        print(content_after_id)

        google_play_csv_file = f"./data/google_play_{app_name}_voc.csv"

        if os.path.isfile(google_play_csv_file):
            df = pd.read_csv(google_play_csv_file)
            index_len = len(df["index"])
        else:
            index_len = 0

        result, continuation_token = reviews(
            f"{content_after_id}",
            lang="en",  # defaults to 'en'
            sort=Sort.NEWEST,  # defaults to Sort.NEWEST
            count=numReviews,  # defaults to 100
            filter_score_with=ratings,
        )

        play_review = []
        for index, review in enumerate(result):
            play_review.append(
                {
                    "index": index + index_len,
                    "source": "Google Play Ptore",
                    "url": url,
                    "title": "Google Play Review",
                    "body": review["content"],
                    "user": review["userName"],
                    "upvote": review["thumbsUpCount"],
                    "rating": review["score"],
                    "created_at": review["at"],
                }
            )
        print(
            f"Number of reviews fetched: {len(play_review)}"
        )  # Debugging print statement
         # Debugging print statement
        return result
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def get_play_store_reviews_csv(app_name: str, ratings: int, numReviews: int):
    try:
        print(f"Fetching reviews for app: {app_name}")  # Debugging print statement

        query = f"{app_name} play store android app"
        url = get_playstore_link(query, search_info=SearchInfo.URLS)
        content_after_id = url.split("id=")[1].split("&")[0]

        print(content_after_id)

        google_play_csv_file = f"./data/google_play_{app_name}_voc.csv"

        if os.path.isfile(google_play_csv_file):
            df = pd.read_csv(google_play_csv_file)
            index_len = len(df["index"])
        else:
            index_len = 0

        result, continuation_token = reviews(
            f"{content_after_id}",
            lang="en",  # defaults to 'en'
            sort=Sort.NEWEST,  # defaults to Sort.NEWEST
            count=numReviews,  # defaults to 100
            filter_score_with=ratings,
        )

        play_review = []
        for index, review in enumerate(result):
            play_review.append(
                {
                    "index": index + index_len,
                    "source": "Google Play Ptore",
                    "url": url,
                    "title": "Google Play Review",
                    "body": review["content"],
                    "user": review["userName"],
                    "upvote": review["thumbsUpCount"],
                    "rating": review["score"],
                    "created_at": review["at"],
                }
            )
        print(
            f"Number of reviews fetched: {len(play_review)}"
        )  # Debugging print statement
        if any(play_review):  # Check if data exists
            fieldnames = list(play_review[0].keys())

        with open(
            google_play_csv_file, "a", newline="", encoding="utf-8"
        ) as csvfile:  # Open in append mode
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:  # Check if file is empty (write header only once)
                writer.writeheader()
            for issue in play_review:
                writer.writerow(issue)

        print("Reviews successfully written to CSV file.")  # Debugging print statement
        return result
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def get_subreddit(subreddit_name: str):
    """Retrieves review-like posts from Reddit and appends them to a CSV file.

    Returns:
        str: A message indicating the CSV file was updated successfully.
    """
    try:
        reddit_csv_file = f"./data/new_{subreddit_name}_reddit_voc_data.csv"
        client_id = CLIENT_ID  # Replace with your actual client ID
        client_secret = CLIENT_SECRET  # Replace with actual client secret
        user_agent = "web:devrev-forge:v1 (by /u/smooth_profit4543)"  # Replace with your actual user agent

        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent,
        )

        subreddit = reddit.subreddit(
            subreddit_name
        )  # Replace with the desired subreddit
        limit = 20  # Set the desired limit for fetched posts

        if os.path.isfile(reddit_csv_file):
            df = pd.read_csv(reddit_csv_file)
            index_len = len(df["index"])
        else:
            index_len = 0

        redditdata = []
        for index, submission in enumerate(subreddit.top(limit=limit)):
            redditdata.append(
                {
                    "index": index + index_len,
                    "source": f"{subreddit_name}",
                    "url": submission.url,
                    "title": submission.title,
                    "body": remove_emoji(submission.selftext),
                    "created_at": submission.created_utc,
                    "upvote": submission.score,
                }
            )
        print(
            f"Number of reviews fetched: {len(redditdata)}"
        )  # Debugging print statement

        # Fieldnames extraction (adapted from Response B with clarity)
        if any(redditdata):  # Check if data exists
            fieldnames = list(redditdata[0].keys())  # Extract from first item
        else:
            print("No reviews found to extract fieldnames.")
            return "No reviews found to be added to the CSV file."
    except Exception as e:
        print(f"An error occurred: {e}")
        return "An error occurred while fetching reviews from Reddit."

    # CSV handling (adapted from Response A with improvements)
    try:
        with open(
            reddit_csv_file,
            "a",
            newline="",
            encoding="utf-8",
        ) as csvfile:  # Open in append mode
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:  # Check if file is empty (write header only once)
                writer.writeheader()
            for issue in redditdata:
                writer.writerow(issue)

            df = pd.read_csv(reddit_csv_file, encoding="unicode_escape")
            print(df)  # Debugging print statement
            return "Reddit reviews appended to voc_data.csv successfully."
    except FileNotFoundError:
        print("File not found. Creating a new CSV file.")
        with open(
            reddit_csv_file,
            "w",
            newline="",
            encoding="utf-8",
        ) as csvfile:  # Create new file if needed
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for issue in redditdata:
                writer.writerow(issue)

            df = pd.read_csv(
                reddit_csv_file,
                encoding="unicode_escape",
            )
            print(df)  # Debugging print statement
            return "Reddit reviews appended to a new voc_data.csv file."
    except Exception as e:  # Handle other potential errors
        df = pd.read_csv(reddit_csv_file)
        print(f"An error occurred: {e}")  # Debugging print statement
        return "An error occurred while appending reviews to voc_data.csv."


def get_github_issues(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}/issues?state=open"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {GITHUB_PAT}",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    print(f"Sending request to: {url}")  # Debugging statement
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes

        issues = response.json()
        print(f"Received {len(issues)} issues")  # Debugging statement

        csv_file_path = f"./data/{repo}_github_voc_data.csv"
        if os.path.isfile(csv_file_path):
            with open(csv_file_path, "r", encoding="utf-8") as csvfile:
                df = pd.read_csv(csv_file_path)
                index_len = len(df["index"])
        else:
            index_len = 0

        filtered_data = []
        for index, issue in enumerate(issues):
            filtered_data.append(
                {
                    "index": index + index_len,
                    "source": "github",
                    "url": issue["url"],
                    "title": issue["title"],
                    "body": issue["body"],
                    "user_html_url": issue["user"]["html_url"],
                    "created_at": issue["created_at"],
                }
            )

        print(
            f"Filtered data contains {len(filtered_data)} issues"
        )  # Debugging statement

        if filtered_data:
            fieldnames = filtered_data[0].keys()  # Extract keys as field names
        else:
            fieldnames = []

        with open(csv_file_path, "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for issue in filtered_data:
                writer.writerow(issue)

        print(f"Data saved to {csv_file_path}")  # Debugging statement

        return filtered_data
    except requests.exceptions.RequestException as e:
        print(f"Error during request: {e}")
        return None


def get_tweets(twitter_handle: str, issue: str):
    try:
        twitter_csv_file = f"./data/{twitter_handle}_twitter_data.csv"
        url = "https://twitter154.p.rapidapi.com/search/search"

        querystring = {
            "query": f"{twitter_handle} #{issue}",
            "section": "top",
            "min_retweets": "1",
            "min_likes": "1",
            "limit": "20",
            "language": "en",
        }

        headers = {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "twitter154.p.rapidapi.com",
        }

        print(f"Sending request to: {url}")  # Debugging statement
        response = requests.get(url, headers=headers, params=querystring)

        result = response.json()

        print(f"Received {len(result['results'])} tweets")  # Debugging statement

        index_len = 0
        if os.path.isfile(twitter_csv_file):
            df = pd.read_csv(twitter_csv_file)
            index_len = len(df["index"])
        else:
            index_len = 0

        filtered_data = []
        for index, tweet in enumerate(result["results"]):
            filtered_data.append(
                {
                    "index": index + index_len,
                    "source": "twitter",
                    "url": tweet["expanded_url"],
                    "title": "tweet status",
                    "body": tweet["text"],
                    "created_at": tweet["creation_date"],
                    "username": tweet["user"]["username"],
                    "upvote": tweet["favorite_count"],
                }
            )

        print(
            f"Filtered data contains {len(filtered_data)} tweets"
        )  # Debugging statement

        if filtered_data:
            fieldnames = filtered_data[0].keys()  # Extract keys as field names
        else:
            fieldnames = []

        with open(twitter_csv_file, "a", newline="", encoding="utf-8") as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:
                writer.writeheader()
            for tweet in filtered_data:
                writer.writerow(tweet)
        print(f"Data saved to {twitter_csv_file}")  # Debugging statement

        return result["results"]
    except Exception as e:
        print(f"Error during request: {e}")
        return None


def get_news(company_name: str):
    """
    Scrapes news from a given URL and saves it to a CSV file. Currently, the function scrapes headlines and paragraphs from the URL and saves them to a CSV file.
    """

    query = f"{company_name} latest news"
    url = google_search(query, search_info=SearchInfo.URLS)

    print(f"URL for scraping: {url}")  # Debugging statement

    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    news = []
    for headline in soup.find_all("h3"):
        news.append({"Heading": headline.text})

    print(f"Scraped news: {news}")  # Debugging statement
    fieldnames = ["Heading"]
    with open("./data/news.csv", "w", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for item in news:
            writer.writerow(item)

    print("News saved to CSV file.")  # Debugging statement

    return news


def use_ai():
    try:
        review = """google play store,https://play.google.com/store/apps/details?id=in.swiggy.android,Very useful and efficient,"Hey there, glad that we have stood up to your expectations. Thank you for the positive review and the perfect star rating. Keep Swiggying. 🙂",Anita Kuruvilla"""
        score = request_chat_gpt_api(NOISE_PROMPT, review)
        swot = request_chat_gpt_api(SWOT_PROMPT, review)
        sentiment = request_chat_gpt_api(SENTIMENT_PROMPT, review)

        print(score, swot, sentiment)
    except Exception as e:
        print(f"An error occurred: {e}")


@app.get("/")
async def read_root():
    return {"message": "Server is running!"}


@app.get("/generate_csv")
async def generate_csv(
    app_name: str = "swiggy",
    subreddit_name: str = "",
    owner: str = "",
    repo: str = "",
    twitter_handle: str = "swiggy",
    issue: str = "help",
    get_news_for: str = "swiggy",
    open_ai_key: str = "",
):
    try:
        if app_name != "" and app_name != "N/A":
            get_play_store_reviews_csv(app_name, 1, 20)
        if subreddit_name != "" and subreddit_name != "N/A":
            get_subreddit(subreddit_name)
        if owner != "" and repo != "" and owner != "N/A" and repo != "N/A":
            filtered_data = get_github_issues(owner, repo)
        if (
            twitter_handle != ""
            and issue != ""
            and twitter_handle != "N/A"
            and issue != "N/A"
        ):
            results = get_tweets(twitter_handle, issue)
        if get_news_for != "" and get_news_for != "N/A":
            news = get_news(get_news_for)

        # Run the initial data processing pipeline
        if app_name != "" and app_name != "N/A" and open_ai_key != "" and open_ai_key != "N/A":
            processData(
                client_name=app_name,
                subreddit_name=subreddit_name,
                twitter_handle=twitter_handle,
                open_ai_key=open_ai_key,
                TESTING=False,
            )
        else:
            print("Insufficient data to run the pipeline.")

        return {"message": "Insights are being generated!"}
    except Exception as e:
        return {f"An error occurred: {e}"}


@app.get("/get_json")
async def get_insights(client_name: str = "swiggy"):
    client_name = client_name.lower()
    try:
        with open("./output/processed.json", "r") as file:
            data = json.load(file)
            return {"data": data[client_name]}
    except Exception as e:
        return {f"An error occurred: {e}"}
